"""
Customer Machine Learning Propensity Modeling Module
Builds predictive models for Subscription Propensity and High-Spender Classification.
Exports ROC-AUC curves, Feature Importance, and customer-level propensity scores.
"""

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import sqlite3
import duckdb

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score, roc_curve, accuracy_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

def run_ml_pipeline():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    rfm_csv = os.path.join(base_dir, "rfm_customer_segments.csv")
    charts_dir = os.path.join(base_dir, "charts")
    sqlite_db = os.path.join(base_dir, "customer_behavior.db")
    duck_db = os.path.join(base_dir, "customer_behavior.duckdb")
    os.makedirs(charts_dir, exist_ok=True)

    print("=" * 60)
    print(" [*] Customer Propensity Machine Learning Engine")
    print("=" * 60)

    df = pd.read_csv(rfm_csv)
    print(f"Loaded {len(df):,} customer records.")

    # Target 1: Subscription Propensity (Binary)
    y_sub = (df['subscription_status'] == 'Yes').astype(int)

    # Target 2: High Spender (> $75)
    y_spend = (df['purchase_amount'] >= 75).astype(int)

    # Feature selection
    categorical_cols = ['gender', 'category', 'shipping_type', 'discount_applied', 'payment_method', 'rfm_segment']
    numerical_cols = ['age', 'purchase_amount', 'review_rating', 'previous_purchases', 'purchase_frequency_days']

    # Preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numerical_cols),
            ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_cols)
        ]
    )

    X_features = df[numerical_cols + categorical_cols]
    X_transformed = preprocessor.fit_transform(X_features)
    
    # Get feature names after one-hot encoding
    cat_names = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_cols).tolist()
    all_feature_names = numerical_cols + cat_names

    X_train, X_test, y_train, y_test = train_test_split(X_transformed, y_sub, test_size=0.25, random_state=42, stratify=y_sub)

    # 1. Random Forest Classifier
    rf = RandomForestClassifier(n_estimators=150, max_depth=8, random_state=42)
    rf.fit(X_train, y_train)

    # 2. Logistic Regression
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)

    # Evaluate
    y_pred_rf = rf.predict(X_test)
    y_prob_rf = rf.predict_proba(X_test)[:, 1]

    y_pred_lr = lr.predict(X_test)
    y_prob_lr = lr.predict_proba(X_test)[:, 1]

    auc_rf = roc_auc_score(y_test, y_prob_rf)
    auc_lr = roc_auc_score(y_test, y_prob_lr)
    acc_rf = accuracy_score(y_test, y_pred_rf)

    print(f"\nModel Performance (Subscription Propensity):")
    print(f" - Random Forest Accuracy: {acc_rf*100:.2f}% | ROC-AUC: {auc_rf:.3f}")
    print(f" - Logistic Regression ROC-AUC: {auc_lr:.3f}")

    # Generate customer-level propensity scores
    full_probs_rf = rf.predict_proba(X_transformed)[:, 1]
    df['subscription_propensity_score'] = np.round(full_probs_rf * 100, 2)
    df['propensity_tier'] = pd.cut(
        df['subscription_propensity_score'],
        bins=[0, 25, 50, 75, 100],
        labels=['Low (0-25%)', 'Medium (25-50%)', 'High (50-75%)', 'Very High (75-100%)']
    )

    # Save to CSV
    output_csv = os.path.join(base_dir, "customer_propensity_scores.csv")
    df.to_csv(output_csv, index=False)
    print(f"\nSaved propensity dataset: {os.path.basename(output_csv)}")

    # Update Databases
    conn_sq = sqlite3.connect(sqlite_db)
    df.to_sql("customer_propensity", conn_sq, if_exists="replace", index=False)
    conn_sq.close()

    con_duck = duckdb.connect(duck_db)
    con_duck.execute("CREATE OR REPLACE TABLE customer_propensity AS SELECT * FROM df")
    con_duck.close()
    print("Updated SQLite & DuckDB tables: `customer_propensity`")

    # 3. Chart: Feature Importance
    importances = rf.feature_importances_
    feat_df = pd.DataFrame({'feature': all_feature_names, 'importance': importances})
    feat_df = feat_df.sort_values(by='importance', ascending=False).head(10)

    # Prettify feature names
    feat_df['feature_clean'] = feat_df['feature'].str.replace('_', ' ').str.title()

    plt.figure(figsize=(9, 5))
    sns.set_theme(style="whitegrid")
    bars = plt.barh(feat_df['feature_clean'][::-1], feat_df['importance'][::-1], color='#3b82f6', height=0.6)
    plt.title("Top 10 Feature Importances Driving Subscription Propensity", fontsize=13, fontweight='bold', pad=15)
    plt.xlabel("Relative Importance Score", fontsize=11)
    for bar in bars:
        w = bar.get_width()
        plt.text(w + 0.002, bar.get_y() + bar.get_height()/2.0, f"{w*100:.1f}%", va='center', fontweight='bold', fontsize=9.5)
    plt.tight_layout()
    feat_chart = os.path.join(charts_dir, "07_ml_feature_importance.png")
    plt.savefig(feat_chart, dpi=200)
    plt.close()
    print(f"Saved feature importance chart: {os.path.basename(feat_chart)}")

    # 4. Chart: ROC-AUC Comparison
    fpr_rf, tpr_rf, _ = roc_curve(y_test, y_prob_rf)
    fpr_lr, tpr_lr, _ = roc_curve(y_test, y_prob_lr)

    plt.figure(figsize=(7, 5))
    plt.plot(fpr_rf, tpr_rf, color='#10b981', lw=2.5, label=f'Random Forest (AUC = {auc_rf:.3f})')
    plt.plot(fpr_lr, tpr_lr, color='#6366f1', lw=2, linestyle='--', label=f'Logistic Regression (AUC = {auc_lr:.3f})')
    plt.plot([0, 1], [0, 1], color='#94a3b8', lw=1.5, linestyle=':')
    plt.xlabel('False Positive Rate', fontsize=11)
    plt.ylabel('True Positive Rate (Recall)', fontsize=11)
    plt.title('Subscription Propensity: ROC-AUC Curves', fontsize=13, fontweight='bold', pad=15)
    plt.legend(loc='lower right', frameon=True)
    plt.tight_layout()
    roc_chart = os.path.join(charts_dir, "08_subscription_propensity_roc.png")
    plt.savefig(roc_chart, dpi=200)
    plt.close()
    print(f"Saved ROC curve chart: {os.path.basename(roc_chart)}")

    print("\n[OK] ML Propensity Modeling Pipeline Completed Successfully!")

if __name__ == "__main__":
    run_ml_pipeline()
