"""
Advanced RFM (Recency, Frequency, Monetary) Customer Segmentation Module
Calculates granular RFM scores, segment categorizations, and stores in SQLite & DuckDB.
"""

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import sqlite3
import duckdb

def run_rfm_segmentation():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cleaned_csv = os.path.join(base_dir, "customer_cleaned.csv")
    sqlite_db = os.path.join(base_dir, "customer_behavior.db")
    duck_db = os.path.join(base_dir, "customer_behavior.duckdb")
    charts_dir = os.path.join(base_dir, "charts")
    os.makedirs(charts_dir, exist_ok=True)

    print("=" * 60)
    print(" [*] Advanced RFM Segmentation Engine")
    print("=" * 60)

    df = pd.read_csv(cleaned_csv)
    print(f"Loaded {len(df):,} customer records.")

    # 1. Metric definitions
    # Recency proxy: Lower purchase_frequency_days means more recent/frequent buying cadence
    # Frequency: previous_purchases
    # Monetary: purchase_amount
    
    # 2. RFM Quintile Scoring (1 to 5)
    # R_Score: Lower days = Higher Score (more recent cadence)
    df['r_score'] = pd.qcut(df['purchase_frequency_days'].rank(method='first'), q=5, labels=[5, 4, 3, 2, 1]).astype(int)
    
    # F_Score: Higher previous purchases = Higher Score
    df['f_score'] = pd.qcut(df['previous_purchases'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
    
    # M_Score: Higher purchase amount = Higher Score
    df['m_score'] = pd.qcut(df['purchase_amount'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)

    df['rfm_score'] = df['r_score'].astype(str) + df['f_score'].astype(str) + df['m_score'].astype(str)
    df['rfm_aggregate'] = (df['r_score'] + df['f_score'] + df['m_score']) / 3.0

    # 3. Industry-Standard Segment Mapping
    def assign_rfm_segment(row):
        r, f, m = row['r_score'], row['f_score'], row['m_score']
        avg_fm = (f + m) / 2.0
        
        if r >= 4 and f >= 4 and m >= 4:
            return 'Champions'
        elif r >= 3 and f >= 3:
            return 'Loyal Customers'
        elif r >= 4 and f <= 2:
            return 'Potential Loyalists'
        elif r >= 3 and f <= 2 and m >= 3:
            return 'Promising New Spenders'
        elif r <= 2 and f >= 3 and m >= 3:
            return 'At Risk (High Value Inactive)'
        elif r <= 2 and f >= 3:
            return 'Need Attention'
        elif r <= 2 and f <= 2 and m >= 3:
            return 'About to Sleep'
        else:
            return 'Hibernating / Lost'

    df['rfm_segment'] = df.apply(assign_rfm_segment, axis=1)

    # Segment summary
    seg_summary = df.groupby('rfm_segment').agg(
        customer_count=('customer_id', 'count'),
        avg_spend=('purchase_amount', 'mean'),
        total_revenue=('purchase_amount', 'sum'),
        avg_previous_purchases=('previous_purchases', 'mean'),
        subscription_rate=('subscription_status', lambda x: (x == 'Yes').mean() * 100)
    ).reset_index().sort_values(by='total_revenue', ascending=False)

    print("\n--- RFM Segment Summary ---")
    print(seg_summary.to_string(index=False))

    # Save to CSV
    rfm_csv = os.path.join(base_dir, "rfm_customer_segments.csv")
    df.to_csv(rfm_csv, index=False)
    print(f"\nSaved RFM dataset: {os.path.basename(rfm_csv)}")

    # Update Databases
    conn_sq = sqlite3.connect(sqlite_db)
    df.to_sql("rfm_customers", conn_sq, if_exists="replace", index=False)
    seg_summary.to_sql("rfm_segment_summary", conn_sq, if_exists="replace", index=False)
    conn_sq.close()

    con_duck = duckdb.connect(duck_db)
    con_duck.execute("CREATE OR REPLACE TABLE rfm_customers AS SELECT * FROM df")
    con_duck.execute("CREATE OR REPLACE TABLE rfm_segment_summary AS SELECT * FROM seg_summary")
    con_duck.close()
    print("Updated SQLite & DuckDB tables: `rfm_customers` and `rfm_segment_summary`")

    # 4. Generate Visual Chart
    plt.figure(figsize=(10, 5.5))
    palette = sns.color_palette("Spectral", len(seg_summary))
    bars = plt.barh(seg_summary['rfm_segment'][::-1], seg_summary['total_revenue'][::-1], color=palette, height=0.6)
    
    plt.title("Total Revenue by Advanced RFM Customer Segment", fontsize=14, fontweight='bold', pad=15)
    plt.xlabel("Total Revenue Generated (USD)", fontsize=11)
    
    for bar in bars:
        w = bar.get_width()
        plt.text(w + 1000, bar.get_y() + bar.get_height()/2.0, f"${w:,.0f}", va='center', fontweight='bold', fontsize=10)
        
    plt.tight_layout()
    chart_path = os.path.join(charts_dir, "06_rfm_customer_segments.png")
    plt.savefig(chart_path, dpi=200)
    plt.close()
    print(f"Saved RFM visualization: {os.path.basename(chart_path)}")

if __name__ == "__main__":
    run_rfm_segmentation()
