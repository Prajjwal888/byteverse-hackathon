import { useEffect, useState } from "react";
import { HandHeart, CalendarDays, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function PastActivities() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://food-share-zv84.onrender.com/api/donor/donor-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorRequests();
  }, []);
  console.log(donations);
  const totalPeopleHelped = donations.reduce(
    (sum, d) => sum + d.approxPeople,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2">
          <HandHeart className="text-pink-500 w-12 h-12" />
          <h1 className="text-4xl font-extrabold text-gray-900">Yayy!!</h1>
        </div>
        <p className="text-lg text-gray-700 mt-4">
          Till date, you have helped over{" "}
          <span className="text-green-600 font-bold text-3xl">
            {totalPeopleHelped}
          </span>{" "}
          people!
        </p>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
            Keep up the amazing work!
          </span>
        </motion.div>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : donations.length === 0 ? (
        <div className="text-center text-gray-500">
          No past donations found.
        </div>
      ) : (
        <div className="grid gap-6">
          {donations.map((donation, index) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {donation.status || "Awaiting Pickup"}
                </h2>
              </div>

              <div className="flex items-center text-gray-500 gap-2 text-sm">
                <CalendarDays className="w-4 h-4" />
                {new Date(donation.createdAt).toLocaleDateString()}
              </div>

              <div className="flex items-center text-gray-500 gap-2 text-sm">
                <Users className="w-4 h-4" />
                Helped approx.{" "}
                <span className="text-primary font-medium">
                  {donation.approxPeople}
                </span>{" "}
                people
              </div>

              <div className="flex items-center text-gray-500 gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Pickup Location:{" "}
                <span className="text-primary font-medium">
                  {donation.location?.address}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
