from flask import Flask, request, jsonify
from datetime import datetime
from geopy.distance import geodesic
import numpy as np
import joblib
import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# MongoDB setup
MONGODB_URL = os.getenv("MONGODB_URL")
if not MONGODB_URL:
    raise ValueError("MONGODB_URL not found in .env")

client = MongoClient(MONGODB_URL)
db = client[os.getenv("MONGO_DB_NAME", "test")]
receivers_collection = db["receivers"]

# Encoding for food type
food_type_encoding = {
    "cooked": 0,
    "fresh": 1,
    "dry": 2
}

# Load urgency model
model_path = "urgency_model.pkl"
if not os.path.exists(model_path):
    raise FileNotFoundError("❌ Trained model file 'urgency_model.pkl' not found.")

model = joblib.load(model_path)

# Get NGO list from MongoDB
def get_ngos_from_db():
    ngos = []
    for ngo in receivers_collection.find():
        try:
            lat = float(ngo["location"].get("lattitude", 0))
            lon = float(ngo["location"].get("longitude", 0))
            if lat and lon:
                ngos.append({
                    "id": str(ngo["_id"]),
                    "name": ngo["name"],
                    "location": (lat, lon),
                    "active_load": ngo.get("active_load", 0)
                })
        except Exception as e:
            print(f"Skipping NGO due to error: {e}")
            continue
    return ngos

# Predict urgency score using model
def predict_urgency(data):
    try:
        expiry_time = datetime.fromisoformat(data["expiry_time"])
        now = datetime.utcnow()
        hours_left = max((expiry_time - now).total_seconds() / 3600.0, 0.1)

        food_type = data["food_type"].lower()
        if food_type not in food_type_encoding:
            raise ValueError(f"Invalid food type: '{food_type}'")

        food_type_val = food_type_encoding[food_type]
        quantity = float(data["quantity"])

        features = np.array([[food_type_val, quantity, hours_left]])
        predicted_score = model.predict(features)[0]

        return round(min(predicted_score, 100), 2)
    except Exception as e:
        raise ValueError(f"Urgency prediction failed: {e}")

def match_ngos(donor_location, urgency_score):
    ngos = get_ngos_from_db()
    matches = []
    for ngo in ngos:
        distance_km = geodesic(donor_location, ngo["location"]).km
        if distance_km <= 20:
            match_score = (100 / (distance_km + 1)) + urgency_score - (10 * ngo["active_load"])
            matches.append({
                "id": ngo["id"],
                "name": ngo["name"],
                "distance_km": round(distance_km, 2),
                "match_score": round(match_score, 2)
            })
    return sorted(matches, key=lambda x: x["match_score"], reverse=True)
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "API is running! Use /predict-urgency (POST) to get predictions."
    })
@app.route("/predict-urgency", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        donor_location = (
            float(data["location"]["lat"]),
            float(data["location"]["lon"])
        )

        urgency = predict_urgency(data)
        ngo_matches = match_ngos(donor_location, urgency)

        return jsonify({
            "urgency_score": urgency,
            "matched_ngos": ngo_matches
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400
@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
