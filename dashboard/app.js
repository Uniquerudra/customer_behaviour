// Retail Customer Shopping Behavior Dashboard Logic
const DASHBOARD_DATA = {
  "total_revenue": 233081,
  "total_customers": 3900,
  "avg_spend": 59.76,
  "subscribers": 1053,
  "sub_rate": 27.0,
  "avg_rating": 3.75,
  "categories": {
    "Accessories": 74200,
    "Clothing": 104264,
    "Footwear": 36093,
    "Outerwear": 18524
  },
  "rfm_segments": {
    "Loyal Customers": 1169,
    "Potential Loyalists": 625,
    "At Risk (High Value Inactive)": 565,
    "About to Sleep": 376,
    "Need Attention": 369,
    "Hibernating / Lost": 364,
    "Champions": 237,
    "Promising New Spenders": 195
  },
  "gender_revenue": {
    "Female": 75191,
    "Male": 157890
  },
  "age_revenue": {
    "Adult": 55978,
    "Middle-aged": 59197,
    "Senior": 55763,
    "Young Adult": 62143
  },
  "top_products": {
    "Gloves": 3.86,
    "Sandals": 3.84,
    "Boots": 3.82,
    "Hat": 3.8,
    "Handbag": 3.78
  },
  "customers_sample": [
    {
      "customer_id": 1,
      "age": 55,
      "gender": "Male",
      "item_purchased": "Blouse",
      "category": "Clothing",
      "purchase_amount": 53,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 56.07
    },
    {
      "customer_id": 2,
      "age": 19,
      "gender": "Male",
      "item_purchased": "Sweater",
      "category": "Clothing",
      "purchase_amount": 64,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 56.56
    },
    {
      "customer_id": 3,
      "age": 50,
      "gender": "Male",
      "item_purchased": "Jeans",
      "category": "Clothing",
      "purchase_amount": 73,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 64.11
    },
    {
      "customer_id": 4,
      "age": 21,
      "gender": "Male",
      "item_purchased": "Sandals",
      "category": "Footwear",
      "purchase_amount": 90,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 63.57
    },
    {
      "customer_id": 5,
      "age": 45,
      "gender": "Male",
      "item_purchased": "Blouse",
      "category": "Clothing",
      "purchase_amount": 49,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 70.28
    },
    {
      "customer_id": 6,
      "age": 46,
      "gender": "Male",
      "item_purchased": "Sneakers",
      "category": "Footwear",
      "purchase_amount": 20,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 59.67
    },
    {
      "customer_id": 7,
      "age": 63,
      "gender": "Male",
      "item_purchased": "Shirt",
      "category": "Clothing",
      "purchase_amount": 85,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 80.26
    },
    {
      "customer_id": 8,
      "age": 27,
      "gender": "Male",
      "item_purchased": "Shorts",
      "category": "Clothing",
      "purchase_amount": 34,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 57.8
    },
    {
      "customer_id": 9,
      "age": 26,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 97,
      "subscription_status": "Yes",
      "rfm_segment": "About to Sleep",
      "subscription_propensity_score": 69.87
    },
    {
      "customer_id": 10,
      "age": 57,
      "gender": "Male",
      "item_purchased": "Handbag",
      "category": "Accessories",
      "purchase_amount": 31,
      "subscription_status": "Yes",
      "rfm_segment": "Hibernating / Lost",
      "subscription_propensity_score": 51.84
    },
    {
      "customer_id": 11,
      "age": 53,
      "gender": "Male",
      "item_purchased": "Shoes",
      "category": "Footwear",
      "purchase_amount": 34,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 67.96
    },
    {
      "customer_id": 12,
      "age": 30,
      "gender": "Male",
      "item_purchased": "Shorts",
      "category": "Clothing",
      "purchase_amount": 68,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 52.79
    },
    {
      "customer_id": 13,
      "age": 61,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 72,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 62.38
    },
    {
      "customer_id": 14,
      "age": 65,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 51,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 69.84
    },
    {
      "customer_id": 15,
      "age": 64,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 53,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 68.77
    },
    {
      "customer_id": 16,
      "age": 64,
      "gender": "Male",
      "item_purchased": "Skirt",
      "category": "Clothing",
      "purchase_amount": 81,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 59.37
    },
    {
      "customer_id": 17,
      "age": 25,
      "gender": "Male",
      "item_purchased": "Sunglasses",
      "category": "Accessories",
      "purchase_amount": 36,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 58.6
    },
    {
      "customer_id": 18,
      "age": 53,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 38,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 80.8
    },
    {
      "customer_id": 19,
      "age": 52,
      "gender": "Male",
      "item_purchased": "Sweater",
      "category": "Clothing",
      "purchase_amount": 48,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 61.21
    },
    {
      "customer_id": 20,
      "age": 66,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 90,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 58.35
    },
    {
      "customer_id": 21,
      "age": 21,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 51,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 77.46
    },
    {
      "customer_id": 22,
      "age": 31,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 62,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 75.16
    },
    {
      "customer_id": 23,
      "age": 56,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 37,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 61.91
    },
    {
      "customer_id": 24,
      "age": 31,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 88,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 66.59
    },
    {
      "customer_id": 25,
      "age": 18,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 22,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 57.36
    },
    {
      "customer_id": 26,
      "age": 18,
      "gender": "Male",
      "item_purchased": "Hoodie",
      "category": "Clothing",
      "purchase_amount": 25,
      "subscription_status": "Yes",
      "rfm_segment": "Hibernating / Lost",
      "subscription_propensity_score": 68.57
    },
    {
      "customer_id": 27,
      "age": 38,
      "gender": "Male",
      "item_purchased": "Jewelry",
      "category": "Accessories",
      "purchase_amount": 20,
      "subscription_status": "Yes",
      "rfm_segment": "Hibernating / Lost",
      "subscription_propensity_score": 61.66
    },
    {
      "customer_id": 28,
      "age": 56,
      "gender": "Male",
      "item_purchased": "Shorts",
      "category": "Clothing",
      "purchase_amount": 56,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 72.39
    },
    {
      "customer_id": 29,
      "age": 54,
      "gender": "Male",
      "item_purchased": "Handbag",
      "category": "Accessories",
      "purchase_amount": 94,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 78.68
    },
    {
      "customer_id": 30,
      "age": 31,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 48,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 60.12
    },
    {
      "customer_id": 31,
      "age": 57,
      "gender": "Male",
      "item_purchased": "Jewelry",
      "category": "Accessories",
      "purchase_amount": 31,
      "subscription_status": "Yes",
      "rfm_segment": "Hibernating / Lost",
      "subscription_propensity_score": 56.02
    },
    {
      "customer_id": 32,
      "age": 33,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 79,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 65.16
    },
    {
      "customer_id": 33,
      "age": 36,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 67,
      "subscription_status": "Yes",
      "rfm_segment": "At Risk (High Value Inactive)",
      "subscription_propensity_score": 61.25
    },
    {
      "customer_id": 34,
      "age": 54,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 38,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 80.48
    },
    {
      "customer_id": 35,
      "age": 36,
      "gender": "Male",
      "item_purchased": "T-shirt",
      "category": "Clothing",
      "purchase_amount": 91,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 78.7
    },
    {
      "customer_id": 36,
      "age": 54,
      "gender": "Male",
      "item_purchased": "Blouse",
      "category": "Clothing",
      "purchase_amount": 33,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 61.56
    },
    {
      "customer_id": 37,
      "age": 35,
      "gender": "Male",
      "item_purchased": "T-shirt",
      "category": "Clothing",
      "purchase_amount": 69,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 63.81
    },
    {
      "customer_id": 38,
      "age": 35,
      "gender": "Male",
      "item_purchased": "Jeans",
      "category": "Clothing",
      "purchase_amount": 45,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 61.61
    },
    {
      "customer_id": 39,
      "age": 29,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 37,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 77.66
    },
    {
      "customer_id": 40,
      "age": 70,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 60,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 52.24
    },
    {
      "customer_id": 41,
      "age": 69,
      "gender": "Male",
      "item_purchased": "Handbag",
      "category": "Accessories",
      "purchase_amount": 76,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 72.29
    },
    {
      "customer_id": 42,
      "age": 67,
      "gender": "Male",
      "item_purchased": "Scarf",
      "category": "Accessories",
      "purchase_amount": 39,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 53.94
    },
    {
      "customer_id": 43,
      "age": 20,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 100,
      "subscription_status": "Yes",
      "rfm_segment": "About to Sleep",
      "subscription_propensity_score": 63.05
    },
    {
      "customer_id": 44,
      "age": 25,
      "gender": "Male",
      "item_purchased": "Scarf",
      "category": "Accessories",
      "purchase_amount": 69,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 54.89
    },
    {
      "customer_id": 45,
      "age": 39,
      "gender": "Male",
      "item_purchased": "Hat",
      "category": "Accessories",
      "purchase_amount": 53,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 69.76
    },
    {
      "customer_id": 46,
      "age": 50,
      "gender": "Male",
      "item_purchased": "Socks",
      "category": "Clothing",
      "purchase_amount": 21,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 62.29
    },
    {
      "customer_id": 47,
      "age": 57,
      "gender": "Male",
      "item_purchased": "Shirt",
      "category": "Clothing",
      "purchase_amount": 43,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 76.16
    },
    {
      "customer_id": 48,
      "age": 55,
      "gender": "Male",
      "item_purchased": "Jewelry",
      "category": "Accessories",
      "purchase_amount": 54,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 66.91
    },
    {
      "customer_id": 49,
      "age": 42,
      "gender": "Male",
      "item_purchased": "Shirt",
      "category": "Clothing",
      "purchase_amount": 55,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 61.15
    },
    {
      "customer_id": 50,
      "age": 68,
      "gender": "Male",
      "item_purchased": "Hoodie",
      "category": "Clothing",
      "purchase_amount": 30,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 64.57
    },
    {
      "customer_id": 51,
      "age": 49,
      "gender": "Male",
      "item_purchased": "Blouse",
      "category": "Clothing",
      "purchase_amount": 28,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 68.57
    },
    {
      "customer_id": 52,
      "age": 59,
      "gender": "Male",
      "item_purchased": "Skirt",
      "category": "Clothing",
      "purchase_amount": 59,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 76.29
    },
    {
      "customer_id": 53,
      "age": 42,
      "gender": "Male",
      "item_purchased": "T-shirt",
      "category": "Clothing",
      "purchase_amount": 20,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 66.89
    },
    {
      "customer_id": 54,
      "age": 29,
      "gender": "Male",
      "item_purchased": "Skirt",
      "category": "Clothing",
      "purchase_amount": 24,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 59.57
    },
    {
      "customer_id": 55,
      "age": 47,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 94,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 66.48
    },
    {
      "customer_id": 56,
      "age": 40,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 28,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 57.91
    },
    {
      "customer_id": 57,
      "age": 41,
      "gender": "Male",
      "item_purchased": "Backpack",
      "category": "Accessories",
      "purchase_amount": 73,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 64.75
    },
    {
      "customer_id": 58,
      "age": 21,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 64,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 57.3
    },
    {
      "customer_id": 59,
      "age": 69,
      "gender": "Male",
      "item_purchased": "Hoodie",
      "category": "Clothing",
      "purchase_amount": 54,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 66.47
    },
    {
      "customer_id": 60,
      "age": 63,
      "gender": "Male",
      "item_purchased": "Belt",
      "category": "Accessories",
      "purchase_amount": 79,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 59.57
    },
    {
      "customer_id": 61,
      "age": 50,
      "gender": "Male",
      "item_purchased": "Sweater",
      "category": "Clothing",
      "purchase_amount": 37,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 60.77
    },
    {
      "customer_id": 62,
      "age": 55,
      "gender": "Male",
      "item_purchased": "Scarf",
      "category": "Accessories",
      "purchase_amount": 68,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 75.25
    },
    {
      "customer_id": 63,
      "age": 30,
      "gender": "Male",
      "item_purchased": "Sneakers",
      "category": "Footwear",
      "purchase_amount": 21,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 62.26
    },
    {
      "customer_id": 64,
      "age": 33,
      "gender": "Male",
      "item_purchased": "Sunglasses",
      "category": "Accessories",
      "purchase_amount": 79,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 59.23
    },
    {
      "customer_id": 65,
      "age": 65,
      "gender": "Male",
      "item_purchased": "Boots",
      "category": "Footwear",
      "purchase_amount": 83,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 60.23
    },
    {
      "customer_id": 66,
      "age": 65,
      "gender": "Male",
      "item_purchased": "Backpack",
      "category": "Accessories",
      "purchase_amount": 36,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 79.07
    },
    {
      "customer_id": 67,
      "age": 31,
      "gender": "Male",
      "item_purchased": "Blouse",
      "category": "Clothing",
      "purchase_amount": 94,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 65.24
    },
    {
      "customer_id": 68,
      "age": 45,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 33,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 67.12
    },
    {
      "customer_id": 69,
      "age": 57,
      "gender": "Male",
      "item_purchased": "Handbag",
      "category": "Accessories",
      "purchase_amount": 46,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 71.2
    },
    {
      "customer_id": 70,
      "age": 48,
      "gender": "Male",
      "item_purchased": "Belt",
      "category": "Accessories",
      "purchase_amount": 70,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 55.96
    },
    {
      "customer_id": 71,
      "age": 22,
      "gender": "Male",
      "item_purchased": "Belt",
      "category": "Accessories",
      "purchase_amount": 29,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 80.48
    },
    {
      "customer_id": 72,
      "age": 36,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 48,
      "subscription_status": "Yes",
      "rfm_segment": "Need Attention",
      "subscription_propensity_score": 65.39
    },
    {
      "customer_id": 73,
      "age": 18,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 26,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 66.92
    },
    {
      "customer_id": 74,
      "age": 48,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 85,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 60.57
    },
    {
      "customer_id": 75,
      "age": 49,
      "gender": "Male",
      "item_purchased": "Gloves",
      "category": "Accessories",
      "purchase_amount": 58,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 56.65
    },
    {
      "customer_id": 76,
      "age": 64,
      "gender": "Male",
      "item_purchased": "Scarf",
      "category": "Accessories",
      "purchase_amount": 85,
      "subscription_status": "Yes",
      "rfm_segment": "At Risk (High Value Inactive)",
      "subscription_propensity_score": 61.55
    },
    {
      "customer_id": 77,
      "age": 50,
      "gender": "Male",
      "item_purchased": "Hat",
      "category": "Accessories",
      "purchase_amount": 43,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 66.61
    },
    {
      "customer_id": 78,
      "age": 22,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 53,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 57.92
    },
    {
      "customer_id": 79,
      "age": 50,
      "gender": "Male",
      "item_purchased": "Skirt",
      "category": "Clothing",
      "purchase_amount": 91,
      "subscription_status": "Yes",
      "rfm_segment": "Champions",
      "subscription_propensity_score": 63.03
    },
    {
      "customer_id": 80,
      "age": 38,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 96,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 76.48
    },
    {
      "customer_id": 81,
      "age": 19,
      "gender": "Male",
      "item_purchased": "Sandals",
      "category": "Footwear",
      "purchase_amount": 72,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 78.63
    },
    {
      "customer_id": 82,
      "age": 67,
      "gender": "Male",
      "item_purchased": "Shoes",
      "category": "Footwear",
      "purchase_amount": 96,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 75.9
    },
    {
      "customer_id": 83,
      "age": 19,
      "gender": "Male",
      "item_purchased": "Pants",
      "category": "Clothing",
      "purchase_amount": 28,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 70.29
    },
    {
      "customer_id": 84,
      "age": 36,
      "gender": "Male",
      "item_purchased": "Dress",
      "category": "Clothing",
      "purchase_amount": 40,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 63.44
    },
    {
      "customer_id": 85,
      "age": 52,
      "gender": "Male",
      "item_purchased": "Coat",
      "category": "Outerwear",
      "purchase_amount": 32,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 77.81
    },
    {
      "customer_id": 86,
      "age": 53,
      "gender": "Male",
      "item_purchased": "Sunglasses",
      "category": "Accessories",
      "purchase_amount": 95,
      "subscription_status": "Yes",
      "rfm_segment": "Potential Loyalists",
      "subscription_propensity_score": 53.13
    },
    {
      "customer_id": 87,
      "age": 24,
      "gender": "Male",
      "item_purchased": "Hoodie",
      "category": "Clothing",
      "purchase_amount": 41,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 63.17
    },
    {
      "customer_id": 88,
      "age": 52,
      "gender": "Male",
      "item_purchased": "Shoes",
      "category": "Footwear",
      "purchase_amount": 53,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 69.1
    },
    {
      "customer_id": 89,
      "age": 33,
      "gender": "Male",
      "item_purchased": "T-shirt",
      "category": "Clothing",
      "purchase_amount": 47,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 63.15
    },
    {
      "customer_id": 90,
      "age": 47,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 83,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 72.54
    },
    {
      "customer_id": 91,
      "age": 25,
      "gender": "Male",
      "item_purchased": "Hat",
      "category": "Accessories",
      "purchase_amount": 48,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 64.8
    },
    {
      "customer_id": 92,
      "age": 44,
      "gender": "Male",
      "item_purchased": "Scarf",
      "category": "Accessories",
      "purchase_amount": 99,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 77.24
    },
    {
      "customer_id": 93,
      "age": 61,
      "gender": "Male",
      "item_purchased": "Jacket",
      "category": "Outerwear",
      "purchase_amount": 87,
      "subscription_status": "Yes",
      "rfm_segment": "Promising New Spenders",
      "subscription_propensity_score": 69.83
    },
    {
      "customer_id": 94,
      "age": 37,
      "gender": "Male",
      "item_purchased": "Sweater",
      "category": "Clothing",
      "purchase_amount": 62,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 63.3
    },
    {
      "customer_id": 95,
      "age": 58,
      "gender": "Male",
      "item_purchased": "Skirt",
      "category": "Clothing",
      "purchase_amount": 76,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 67.49
    },
    {
      "customer_id": 96,
      "age": 37,
      "gender": "Male",
      "item_purchased": "Sneakers",
      "category": "Footwear",
      "purchase_amount": 100,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 69.09
    },
    {
      "customer_id": 97,
      "age": 32,
      "gender": "Male",
      "item_purchased": "Gloves",
      "category": "Accessories",
      "purchase_amount": 73,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 75.52
    },
    {
      "customer_id": 98,
      "age": 21,
      "gender": "Male",
      "item_purchased": "Shoes",
      "category": "Footwear",
      "purchase_amount": 92,
      "subscription_status": "Yes",
      "rfm_segment": "At Risk (High Value Inactive)",
      "subscription_propensity_score": 61.46
    },
    {
      "customer_id": 99,
      "age": 20,
      "gender": "Male",
      "item_purchased": "Jeans",
      "category": "Clothing",
      "purchase_amount": 67,
      "subscription_status": "Yes",
      "rfm_segment": "About to Sleep",
      "subscription_propensity_score": 63.5
    },
    {
      "customer_id": 100,
      "age": 26,
      "gender": "Male",
      "item_purchased": "Hoodie",
      "category": "Clothing",
      "purchase_amount": 40,
      "subscription_status": "Yes",
      "rfm_segment": "Loyal Customers",
      "subscription_propensity_score": 79.29
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initKPIs(DASHBOARD_DATA);
  initCharts(DASHBOARD_DATA);
  initTable(DASHBOARD_DATA.customers_sample);
});

function initKPIs(data) {
  document.getElementById('kpi-revenue').innerText = '$' + Number(data.total_revenue).toLocaleString();
  document.getElementById('kpi-customers').innerText = Number(data.total_customers).toLocaleString();
  document.getElementById('kpi-aov').innerText = '$' + data.avg_spend.toFixed(2);
  document.getElementById('kpi-sub-rate').innerText = data.sub_rate + '%';
  document.getElementById('kpi-rating').innerText = data.avg_rating + ' / 5.0';
}

function initCharts(data) {
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.font.family = 'Plus Jakarta Sans, sans-serif';

  // 1. Revenue by Category
  const catLabels = Object.keys(data.categories);
  const catVals = Object.values(data.categories);
  new Chart(document.getElementById('categoryChart'), {
    type: 'bar',
    data: {
      labels: catLabels,
      datasets: [{
        label: 'Revenue ($)',
        data: catVals,
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // 2. RFM Segments
  const rfmLabels = Object.keys(data.rfm_segments);
  const rfmVals = Object.values(data.rfm_segments);
  new Chart(document.getElementById('rfmChart'), {
    type: 'doughnut',
    data: {
      labels: rfmLabels,
      datasets: [{
        data: rfmVals,
        backgroundColor: ['#10b981', '#3b82f6', '#f43f5e', '#f59e0b', '#8b5cf6', '#64748b', '#06b6d4', '#ec4899'],
        borderColor: '#111827',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 12, font: { size: 10 } } }
      }
    }
  });

  // 3. Gender Revenue
  const genLabels = Object.keys(data.gender_revenue);
  const genVals = Object.values(data.gender_revenue);
  new Chart(document.getElementById('genderChart'), {
    type: 'pie',
    data: {
      labels: genLabels,
      datasets: [{
        data: genVals,
        backgroundColor: ['#ec4899', '#3b82f6'],
        borderColor: '#111827',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 14 } }
      }
    }
  });

  // 4. Age Revenue
  const ageLabels = Object.keys(data.age_revenue);
  const ageVals = Object.values(data.age_revenue);
  new Chart(document.getElementById('ageChart'), {
    type: 'bar',
    data: {
      labels: ageLabels,
      datasets: [{
        label: 'Revenue ($)',
        data: ageVals,
        backgroundColor: '#06b6d4',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function initTable(customers) {
  const tableBody = document.getElementById('tableBody');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  function renderRows(filteredList) {
    tableBody.innerHTML = '';
    filteredList.forEach(c => {
      const tr = document.createElement('tr');
      const isSub = c.subscription_status === 'Yes';
      const subChip = isSub ? '<span class="chip-sub yes">Subscriber</span>' : '<span class="chip-sub no">Standard</span>';
      const propensityColor = c.subscription_propensity_score >= 60 ? '#34d399' : (c.subscription_propensity_score >= 35 ? '#38bdf8' : '#94a3b8');

      tr.innerHTML = `
        <td><strong>#` + c.customer_id + `</strong></td>
        <td>` + c.age + ` yrs / ` + c.gender + `</td>
        <td>` + c.category + `</td>
        <td>` + c.item_purchased + `</td>
        <td><strong>$` + c.purchase_amount + `</strong></td>
        <td>` + subChip + `</td>
        <td><span class="segment-badge">` + c.rfm_segment + `</span></td>
        <td><span style="color: ` + propensityColor + `; font-weight: 700;">` + c.subscription_propensity_score + `%</span></td>
      `;
      tableBody.appendChild(tr);
    });
  }

  renderRows(customers);

  function filterData() {
    const search = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;

    const filtered = customers.filter(c => {
      const matchSearch = String(c.customer_id).includes(search) || 
                          c.item_purchased.toLowerCase().includes(search) ||
                          c.rfm_segment.toLowerCase().includes(search);
      const matchCat = (cat === 'All') || (c.category === cat);
      return matchSearch && matchCat;
    });
    renderRows(filtered);
  }

  searchInput.addEventListener('input', filterData);
  categoryFilter.addEventListener('change', filterData);
}
