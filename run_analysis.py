"""
End-to-End Customer Shopping Behavior Analytics Pipeline
Runs Data Cleaning, Feature Engineering, SQLite/DuckDB Loading, and SQL Analysis.
"""

import os
import pandas as pd
import duckdb
import sqlite3

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_csv = os.path.join(base_dir, "customer_shopping_behavior.csv")
    cleaned_csv = os.path.join(base_dir, "customer_cleaned.csv")
    sqlite_db = os.path.join(base_dir, "customer_behavior.db")
    duck_db = os.path.join(base_dir, "customer_behavior.duckdb")
    excel_out = os.path.join(base_dir, "sql_analysis_results.xlsx")
    report_md = os.path.join(base_dir, "SQL_ANALYSIS_REPORT.md")

    print("=" * 60)
    print(" 🚀 Customer Behavior Data Analysis Pipeline")
    print("=" * 60)

    # 1. Load Data
    print("\n[1/4] Reading raw dataset...")
    df = pd.read_csv(input_csv)
    print(f"  • Successfully read {len(df):,} records.")

    # 2. Data Cleaning & Feature Engineering
    print("\n[2/4] Applying Data Cleaning & Transformations...")
    # Impute missing Review Rating with median of each category
    if df['Review Rating'].isnull().sum() > 0:
        df['Review Rating'] = df.groupby('Category')['Review Rating'].transform(lambda x: x.fillna(x.median()))
    
    # Standardize column headers to snake_case
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    df = df.rename(columns={'purchase_amount_(usd)': 'purchase_amount'})

    # Quartile-based Age Group categorization
    labels = ['Young Adult', 'Adult', 'Middle-aged', 'Senior']
    df['age_group'] = pd.qcut(df['age'], q=4, labels=labels)

    # Frequency mapping to days
    frequency_mapping = {
        'Fortnightly': 14,
        'Weekly': 7,
        'Monthly': 30,
        'Quarterly': 90,
        'Bi-Weekly': 14,
        'Annually': 365,
        'Every 3 Months': 90
    }
    df['purchase_frequency_days'] = df['frequency_of_purchases'].map(frequency_mapping)

    # Drop redundant column
    if 'promo_code_used' in df.columns:
        df = df.drop(columns=['promo_code_used'])

    # Save cleaned CSV
    df.to_csv(cleaned_csv, index=False)
    print(f"  • Cleaned dataset saved to: {os.path.basename(cleaned_csv)}")

    # 3. Database Ingestion
    print("\n[3/4] Ingesting into SQLite and DuckDB databases...")
    conn = sqlite3.connect(sqlite_db)
    df.to_sql("customer", conn, if_exists="replace", index=False)
    conn.close()
    print(f"  • SQLite database updated: {os.path.basename(sqlite_db)} (table: customer)")

    con_duck = duckdb.connect(duck_db)
    con_duck.execute("CREATE OR REPLACE TABLE customer AS SELECT * FROM df")
    print(f"  • DuckDB database updated: {os.path.basename(duck_db)} (table: customer)")

    # 4. Execute 10 SQL Queries
    print("\n[4/4] Executing SQL Business Queries...")
    queries = {
        "Q1_Male_vs_Female_Revenue": """
            SELECT gender, ROUND(SUM(purchase_amount), 2) AS revenue
            FROM customer
            GROUP BY gender;
        """,
        "Q2_Discount_Above_Avg_Spend": """
            SELECT customer_id, purchase_amount 
            FROM customer 
            WHERE discount_applied = 'Yes' 
              AND purchase_amount >= (SELECT AVG(purchase_amount) FROM customer);
        """,
        "Q3_Top5_Highest_Rated_Products": """
            SELECT item_purchased, ROUND(AVG(CAST(review_rating AS DOUBLE)), 2) AS "Average Product Rating"
            FROM customer
            GROUP BY item_purchased
            ORDER BY AVG(CAST(review_rating AS DOUBLE)) DESC
            LIMIT 5;
        """,
        "Q4_Standard_vs_Express_Shipping": """
            SELECT shipping_type, 
                   ROUND(AVG(purchase_amount), 2) AS avg_purchase_amount
            FROM customer
            WHERE shipping_type IN ('Standard', 'Express')
            GROUP BY shipping_type;
        """,
        "Q5_Subscribers_vs_NonSubscribers": """
            SELECT subscription_status,
                   COUNT(customer_id) AS total_customers,
                   ROUND(AVG(purchase_amount), 2) AS avg_spend,
                   ROUND(SUM(purchase_amount), 2) AS total_revenue
            FROM customer
            GROUP BY subscription_status
            ORDER BY total_revenue DESC, avg_spend DESC;
        """,
        "Q6_Top5_Discount_Rate_Products": """
            SELECT item_purchased,
                   ROUND(100.0 * SUM(CASE WHEN discount_applied = 'Yes' THEN 1 ELSE 0 END) / COUNT(*), 2) AS discount_rate
            FROM customer
            GROUP BY item_purchased
            ORDER BY discount_rate DESC
            LIMIT 5;
        """,
        "Q7_Customer_Segmentation": """
            WITH customer_type AS (
                SELECT customer_id, previous_purchases,
                       CASE 
                           WHEN previous_purchases = 1 THEN 'New'
                           WHEN previous_purchases BETWEEN 2 AND 10 THEN 'Returning'
                           ELSE 'Loyal'
                       END AS customer_segment
                FROM customer
            )
            SELECT customer_segment, COUNT(*) AS "Number of Customers" 
            FROM customer_type 
            GROUP BY customer_segment
            ORDER BY "Number of Customers" DESC;
        """,
        "Q8_Top3_Products_Per_Category": """
            WITH item_counts AS (
                SELECT category,
                       item_purchased,
                       COUNT(customer_id) AS total_orders,
                       ROW_NUMBER() OVER (PARTITION BY category ORDER BY COUNT(customer_id) DESC) AS item_rank
                FROM customer
                GROUP BY category, item_purchased
            )
            SELECT item_rank, category, item_purchased, total_orders
            FROM item_counts
            WHERE item_rank <= 3
            ORDER BY category, item_rank;
        """,
        "Q9_Repeat_Buyers_Subscription": """
            SELECT subscription_status,
                   COUNT(customer_id) AS repeat_buyers
            FROM customer
            WHERE previous_purchases > 5
            GROUP BY subscription_status;
        """,
        "Q10_Age_Group_Revenue": """
            SELECT 
                age_group,
                ROUND(SUM(purchase_amount), 2) AS total_revenue
            FROM customer
            GROUP BY age_group
            ORDER BY total_revenue DESC;
        """
    }

    results = {}
    with pd.ExcelWriter(excel_out, engine='openpyxl') as writer:
        for q_name, query in queries.items():
            res_df = con_duck.execute(query).df()
            results[q_name] = res_df
            sheet_title = q_name[:31]
            res_df.to_excel(writer, sheet_name=sheet_title, index=False)
            print(f"  ✓ {q_name} -> {len(res_df)} rows")

    with open(report_md, "w", encoding="utf-8") as f:
        f.write("# 📊 Customer Behavior Data Analysis — SQL Insights Report\n\n")
        f.write("Generated from dataset `customer_shopping_behavior.csv` via automated analytics pipeline.\n\n")
        for q_name, q_df in results.items():
            f.write(f"### {q_name.replace('_', ' ')}\n\n")
            f.write(f"```sql\n{queries[q_name].strip()}\n```\n\n")
            f.write(q_df.to_markdown(index=False))
            f.write("\n\n---\n\n")

    con_duck.close()
    print("\n🎉 Pipeline Execution Completed Successfully!")
    print(f"  • Cleaned Dataset: {cleaned_csv}")
    print(f"  • Database: {sqlite_db}")
    print(f"  • Excel Results: {excel_out}")
    print(f"  • Markdown Report: {report_md}")

if __name__ == "__main__":
    main()
