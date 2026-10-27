"""
Generate Data Visualizations for Customer Shopping Behavior Analysis
"""

import os
import matplotlib.pyplot as plt
import seaborn as sns
import duckdb

def generate_charts():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    charts_dir = os.path.join(base_dir, "charts")
    os.makedirs(charts_dir, exist_ok=True)
    
    duck_db = os.path.join(base_dir, "customer_behavior.duckdb")
    con = duckdb.connect(duck_db)
    
    # Modern styling
    sns.set_theme(style="whitegrid", palette="muted")
    plt.rcParams.update({'font.sans-serif': 'Segoe UI', 'font.size': 11})

    # 1. Male vs Female Revenue
    df_gender = con.execute("""
        SELECT gender, ROUND(SUM(purchase_amount), 2) AS revenue
        FROM customer GROUP BY gender
    """).df()
    
    plt.figure(figsize=(7, 4.5))
    bars = plt.bar(df_gender['gender'], df_gender['revenue'], color=['#3b82f6', '#ec4899'], width=0.5)
    plt.title("Total Revenue Generated: Male vs Female Customers", fontsize=13, fontweight='bold', pad=15)
    plt.ylabel("Revenue (USD)", fontsize=11)
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, yval + 2000, f"${yval:,.0f}", ha='center', va='bottom', fontweight='bold')
    plt.tight_layout()
    plt.savefig(os.path.join(charts_dir, "01_revenue_by_gender.png"), dpi=200)
    plt.close()

    # 2. Customer Segmentation Donut Chart
    df_seg = con.execute("""
        WITH customer_type AS (
            SELECT customer_id, previous_purchases,
                   CASE 
                       WHEN previous_purchases = 1 THEN 'New'
                       WHEN previous_purchases BETWEEN 2 AND 10 THEN 'Returning'
                       ELSE 'Loyal'
                   END AS customer_segment
            FROM customer
        )
        SELECT customer_segment, COUNT(*) AS count
        FROM customer_type GROUP BY customer_segment
        ORDER BY count DESC
    """).df()

    plt.figure(figsize=(6, 6))
    colors = ['#10b981', '#f59e0b', '#6366f1']
    plt.pie(df_seg['count'], labels=df_seg['customer_segment'], autopct='%1.1f%%', startangle=140, colors=colors,
            wedgeprops=dict(width=0.4, edgecolor='w', linewidth=2), textprops={'fontsize': 11, 'fontweight': 'bold'})
    plt.title("Customer Distribution by Segment\n(Loyal >10, Returning 2-10, New = 1)", fontsize=13, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(charts_dir, "02_customer_segments.png"), dpi=200)
    plt.close()

    # 3. Top 5 Highest Rated Products
    df_rating = con.execute("""
        SELECT item_purchased, ROUND(AVG(CAST(review_rating AS DOUBLE)), 2) AS avg_rating
        FROM customer
        GROUP BY item_purchased
        ORDER BY avg_rating DESC
        LIMIT 5;
    """).df()

    plt.figure(figsize=(8, 4.5))
    bars = plt.barh(df_rating['item_purchased'][::-1], df_rating['avg_rating'][::-1], color='#8b5cf6', height=0.55)
    plt.title("Top 5 Products with Highest Average Review Rating", fontsize=13, fontweight='bold', pad=15)
    plt.xlabel("Average Review Rating (Out of 5.0)", fontsize=11)
    plt.xlim(0, 5)
    for bar in bars:
        w = bar.get_width()
        plt.text(w + 0.08, bar.get_y() + bar.get_height()/2.0, f"⭐ {w:.2f}", va='center', fontweight='bold')
    plt.tight_layout()
    plt.savefig(os.path.join(charts_dir, "03_top5_highest_rated_products.png"), dpi=200)
    plt.close()

    # 4. Revenue Contribution by Age Group
    df_age = con.execute("""
        SELECT age_group, ROUND(SUM(purchase_amount), 2) AS total_revenue
        FROM customer
        GROUP BY age_group
        ORDER BY total_revenue DESC;
    """).df()

    plt.figure(figsize=(7.5, 4.5))
    bars = plt.bar(df_age['age_group'], df_age['total_revenue'], color='#06b6d4', width=0.5)
    plt.title("Revenue Contribution by Age Group", fontsize=13, fontweight='bold', pad=15)
    plt.ylabel("Revenue (USD)", fontsize=11)
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, yval + 800, f"${yval:,.0f}", ha='center', va='bottom', fontweight='bold')
    plt.tight_layout()
    plt.savefig(os.path.join(charts_dir, "04_revenue_by_age_group.png"), dpi=200)
    plt.close()

    # 5. Subscribers vs Non-Subscribers Spend & Customer Count
    df_sub = con.execute("""
        SELECT subscription_status,
               COUNT(customer_id) AS total_customers,
               ROUND(SUM(purchase_amount), 2) AS total_revenue
        FROM customer
        GROUP BY subscription_status;
    """).df()

    fig, ax1 = plt.subplots(figsize=(7, 4.5))
    color = '#64748b'
    ax1.set_xlabel('Subscription Status', fontweight='bold', fontsize=11)
    ax1.set_ylabel('Customer Count', color=color, fontweight='bold')
    bars1 = ax1.bar(df_sub['subscription_status'], df_sub['total_customers'], color='#94a3b8', width=0.4, alpha=0.85)
    ax1.tick_params(axis='y', labelcolor=color)

    ax2 = ax1.twinx()
    color2 = '#0284c7'
    ax2.set_ylabel('Total Revenue ($)', color=color2, fontweight='bold')
    points = ax2.plot(df_sub['subscription_status'], df_sub['total_revenue'], color=color2, marker='o', linewidth=2.5, markersize=8)
    ax2.tick_params(axis='y', labelcolor=color2)

    for i, row in df_sub.iterrows():
        ax1.text(i, row['total_customers'] / 2, f"{row['total_customers']:,} users", ha='center', va='center', color='black', fontweight='bold')
        ax2.text(i, row['total_revenue'] + 5000, f"${row['total_revenue']:,.0f}", ha='center', color=color2, fontweight='bold')

    plt.title("Subscribers vs Non-Subscribers: Users & Revenue", fontsize=13, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(charts_dir, "05_subscribers_analysis.png"), dpi=200)
    plt.close()

    con.close()
    print(f"Generated 5 charts in: {charts_dir}")

if __name__ == "__main__":
    generate_charts()
