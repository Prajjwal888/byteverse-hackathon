import React, { useState } from "react";
import axios from "axios";
const DonorPage = () => {
  const [formData, setFormData] = useState({
    foodType: "cooked",
    people: "",
    location: "",
    expiry: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const payload = {
        foodType: formData.foodType,
        approxPeople: formData.people,
        location: formData.location,
        expiryTime: formData.expiry,
        imageUrl: formData.image || " ",
      };

      const res = await axios.post(
        "https://food-share-zv84.onrender.com/api/donor/donor-request",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Donation submitted:", res.data);
      alert("Donation request created successfully!");
      setFormData({
        foodType: "Cooked",
        people: "",
        location: "",
        expiry: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation request. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-green-900 mb-8">Donate Food</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Food Type */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Food Type
          </label>
          <select
            value={formData.foodType}
            onChange={(e) =>
              setFormData({ ...formData, foodType: e.target.value })
            }
            className="w-full rounded-lg border-2 border-green-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="cooked">Cooked</option>
            <option value="dry">Dry</option>
            <option value="fresh">Fresh</option>
          </select>
        </div>

        {/* Approx People to Serve */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Approx. People to be Served
          </label>
          <input
            type="number"
            value={formData.people}
            onChange={(e) =>
              setFormData({ ...formData, people: e.target.value })
            }
            className="w-full rounded-lg border-2 border-green-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="e.g. 50"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full rounded-lg border-2 border-green-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter pickup/drop location"
            required
          />
        </div>

        {/* Expiry Time */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Expiry Time (Approx)
          </label>
          <input
            type="datetime-local"
            value={formData.expiry}
            onChange={(e) =>
              setFormData({ ...formData, expiry: e.target.value })
            }
            className="w-full rounded-lg border-2 border-green-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            required
          />
        </div>

        {/* Optional Image */}
        <div>
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="w-full rounded-lg border-2 border-green-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-800 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default DonorPage;
