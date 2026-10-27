# 📈 Executive Strategy & Business Intelligence Report
**Retail Customer Shopping Behavior & Predictive Lifetime Value**  
*Authored by: Rudra Pal | Senior Data Analyst & Analytics Engineer*

---

## 🎯 1. Executive Summary

This comprehensive analysis investigates **3,900 retail transactions** representing **$233,081 in gross revenue**. By combining **Exploratory Data Analysis (Python)**, **Database Architecture (SQLite & DuckDB)**, **SQL Analytics (10 Complex Business Queries)**, **Advanced RFM Customer Segmentation**, and **Predictive Machine Learning Propensity Modeling (Random Forest & Logistic Regression)**, this study uncovers high-impact growth levers to optimize pricing, prevent margin leakage, and accelerate subscription adoption.

### 🔑 Key Performance Indicators (KPIs)
- **Gross Revenue**: $233,081
- **Customer Base**: 3,900 unique verified shoppers
- **Average Order Value (AOV)**: $59.76 *(range: $20 – $100)*
- **Subscription Penetration**: 27.0% *(1,053 subscribers vs 2,847 non-subscribers)*
- **Customer Satisfaction**: 3.75 / 5.0 *(Gloves top-rated at 3.86; Handbag lowest at 3.74)*

---

## 👥 2. Advanced RFM Customer Segmentation

Instead of basic counts, an industry-standard **Recency, Frequency, and Monetary (RFM)** model was engineered to categorize the 3,900 customers into 8 strategic cohorts:

| Cohort | Customers | Avg Spend ($) | Total Revenue ($) | Avg Previous Purchases | Sub. Rate (%) | Strategic Action |
|---|---|---|---|---|---|---|
| **Loyal Customers** | 1,169 | $54.48 | $63,691 | 34.2 | 35.6% | Retain with tiered VIP perks & early access |
| **At Risk (High Value)** | 565 | $76.33 | $43,126 | 35.9 | 18.9% | **Urgent win-back campaigns** (high historical spend, falling cadence) |
| **Potential Loyalists** | 625 | $59.24 | $37,027 | 10.3 | 25.1% | Loyalty program onboarding & cross-category discounts |
| **About to Sleep** | 376 | $76.41 | $28,731 | 10.5 | 17.6% | Seasonal re-engagement notifications |
| **Champions** | 237 | $84.85 | $20,109 | 40.5 | 28.7% | Brand ambassador programs & exclusive perks |
| **Promising New Spenders** | 195 | $76.05 | $14,829 | 10.7 | 40.5% | Fast-track subscription upsell (highest organic sub rate) |
| **Need Attention** | 369 | $34.70 | $12,804 | 34.8 | 19.0% | Bundle deals to lift low basket size |
| **Hibernating / Lost** | 364 | $35.07 | $12,764 | 10.2 | 24.7% | Low-cost automated email reactivation |

---

## 🤖 3. Predictive Machine Learning Propensity Engine

To transition from descriptive analytics to predictive intelligence, a Machine Learning classifier was developed to compute each customer's **Subscription Propensity Probability (0–100%)**:

### Model Evaluation
- **Random Forest Classifier**:
  - **Accuracy**: 84.82%
  - **ROC-AUC**: **0.929**
- **Logistic Regression**:
  - **ROC-AUC**: **0.932**

### Top 5 Predictive Drivers (Feature Importance)
1. **RFM Segment Tier** (28.4% influence)
2. **Purchase Frequency Cadence (Days)** (21.7% influence)
3. **Previous Purchase Volume** (18.2% influence)
4. **Order Spend Amount** (14.5% influence)
5. **Product Category Affinity** (11.1% influence)

Individual scores are exported in `customer_propensity_scores.csv` and ingested into `customer_behavior.db`.

---

## 💡 4. Strategic Business Playbook & Revenue Recommendations

### 📌 Recommendation 1: Tap the $150K+ Subscription Conversion Opportunity
- **The Finding**: 2,518 repeat buyers (>5 previous orders) are currently non-subscribers, generating $150,000+ in ad-hoc purchases.
- **Action**: Target the top 30% of this cohort using their high propensity scores (>60%) with a "Free Express Shipping on Subscription" perk.
- **Impact**: Converting just 20% (500 users) at an estimated $25/mo membership yields **+$150,000 Annual Recurring Revenue (ARR)**.

### 📌 Recommendation 2: Plug Margin Leakage on Discounts
- **The Finding**: 839 customers qualified for discounts despite spending higher than the store average ($59.76).
- **Action**: Introduce a minimum cart threshold (e.g., minimum $75 cart size to activate 15% discount) to stop discounting customers who would have purchased at full price.
- **Impact**: Conserves an estimated **$12,000 – $18,000 annually** in gross margin.

### 📌 Recommendation 3: Re-engage 565 "At Risk" High Spenders
- **The Finding**: 565 customers have high lifetime volume (avg 35.9 orders and $76.33 spend) but are slipping in visit cadence.
- **Action**: Set up automated behavioral trigger emails (after 45 days of inactivity) offering a limited-time 20% comeback voucher on their favorite product category.

### 📌 Recommendation 4: Monetize Express Shipping
- **The Finding**: Customers choosing Express Shipping spend higher on average ($60.48) than Standard Shipping ($58.46).
- **Action**: Feature Express Shipping as a complimentary upgrade on carts over $80, driving higher cart sizes (AOV expansion).

---

## 🛠️ 5. Technology Stack & Deliverables

- **Languages & Frameworks**: Python 3.12, Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn
- **Databases**: SQLite3 (`customer_behavior.db`), DuckDB (`customer_behavior.duckdb`)
- **Query Language**: SQL (Window Functions, CTEs, Aggregations, Numerical Casts)
- **Interactive UI**: Glassmorphic HTML5/CSS3 Dashboard with Chart.js (`dashboard/index.html`)
- **Business Intelligence**: Power BI Desktop Dashboard (`customer_behavior_dashboard.pbix`)
- **Version Control**: Git (Conventional Commits)
