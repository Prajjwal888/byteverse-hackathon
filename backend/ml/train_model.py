import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Step 3: Encode food type
food_type_encoding = {
    "cooked": 0,
    "fresh": 1,
    "dry": 2,
    "frozen": 3,
    "bakery": 4
}

# Step 4: Generate realistic training data
np.random.seed(42)

data = []

food_types = list(food_type_encoding.keys())

for _ in range(500):  # 500 samples
    food_type = np.random.choice(food_types)
    quantity = np.random.uniform(0.5, 20)  # in kg
    hours_left = np.random.uniform(1, 72)  # expiry in 1 to 72 hours

    # Rough logic to generate urgency
    base = 100 * (1 / (hours_left + 1))
    type_weight = {
        "cooked": 1.0,
        "fresh": 0.7,
        "dry": 0.3,
        "frozen": 0.5,
        "bakery": 0.8
    }[food_type]

    urgency_score = (type_weight * base) + (0.3 * quantity)
    urgency_score = np.clip(urgency_score, 0, 100)

    data.append([food_type_encoding[food_type], quantity, hours_left, urgency_score])

# Step 5: Prepare DataFrame
df = pd.DataFrame(data, columns=["food_type", "quantity", "hours_left", "urgency_score"])
X = df[["food_type", "quantity", "hours_left"]]
y = df["urgency_score"]

# Step 6: Train the model
model = RandomForestRegressor(n_estimators=150, max_depth=10, random_state=42)
model.fit(X, y)

# Step 7: Save model
joblib.dump(model, "urgency_model.pkl")
print("✅ Model trained and saved as urgency_model.pkl")