import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Trophy,
  Clock,
} from "lucide-react";

// Components
const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "requests", label: "Requests", icon: ClipboardList },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "history", label: "Pickup History", icon: Clock },
  ];

  return (
    <div
      className={`bg-green-700 text-white h-screen fixed left-0 transition-all duration-300 ${
        isOpen ? "w-1/8" : "w-20"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute right-4 top-4 p-2 hover:bg-green-600 rounded-full"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="pt-16 px-4">
        <h2 className={`text-2xl font-bold mb-8 ${!isOpen && "hidden"}`}>
          FoodShare
        </h2>
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-lg mb-2 transition-colors
                  ${
                    activeTab === item.id
                      ? "bg-green-600"
                      : "hover:bg-green-600"
                  }`}
              >
                <Icon size={24} />
                <span className={!isOpen ? "hidden" : ""}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// Content Components
// const Dashboard = () => (
//   <div className="grid grid-cols-2 gap-6">
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
//       <p className="text-4xl font-bold text-green-600">₹1,234,567</p>
//     </div>
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-2">Total Donors</h3>
//       <p className="text-4xl font-bold text-green-600">1,234</p>
//     </div>
//   </div>
// );

const Dashboard = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [profile, setProfile] = useState({ name: "", email: "" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored here
        const reqRes = await axios.get(
          "https://food-share-zv84.onrender.com/api/receiver/total-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const donorRes = await axios.get(
          "https://food-share-zv84.onrender.com/api/receiver/total-donors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // const profileRes = await axios.get('https://food-share-zv84.onrender.com/api/receiver/profile', {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });

        setTotalRequests(reqRes.data.totalRequests);
        setTotalDonors(donorRes.data.totalDonors);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
        <p className="text-4xl font-bold text-green-600">{totalRequests}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Total Donors</h3>
        <p className="text-4xl font-bold text-green-600">{totalDonors} </p>
      </div>
    </div>
  );
};

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://food-share-zv84.onrender.com/api/receiver/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://food-share-zv84.onrender.com/api/receiver/accept-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistically update the UI by removing the accepted request
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading requests...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Recent Donation Requests</h3>
        <p className="text-gray-600 mb-4">Total Requests: {requests.length}</p>

        {requests.length === 0 ? (
          <p className="text-gray-500">No requests available.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req, index) => (
              <div key={req._id || index} className="border-b pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <img
                      src={`https://picsum.photos/100?random=${index + 1}`}
                      className="w-20 h-20 rounded-lg object-cover"
                      alt="Food donation"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">
                        {req.donor?.name || `Donor ${index + 1}`}
                      </h4>
                      <div className="space-y-1 mt-1">
                        <p className="text-gray-600">
                          <span className="font-semibold">Food Type: </span>
                          {req.foodType || "Cooked Meals"}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Servings: </span>
                          {req.approxPeople}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Expiry: </span>
                          {req.expiryTime} Hours
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Address: </span>
                          {req.location.address || "123 Main St, City, State"}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Rating: </span>⭐{" "}
                          {req.rating || "4.0"}/5
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-2"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// const Achievements = () => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-xl font-semibold mb-4">NGO Achievements</h3>
//     <div className="space-y-6">
//       <div className="border-l-4 border-green-600 pl-4">
//         <h4 className="font-semibold">100,000 Meals Served</h4>
//         <p className="text-gray-600">Reached milestone in December 2023</p>
//       </div>
//       <div className="border-l-4 border-green-600 pl-4">
//         <h4 className="font-semibold">Community Impact Award</h4>
//         <p className="text-gray-600">Received in October 2023</p>
//       </div>
//       <div className="border-l-4 border-green-600 pl-4">
//         <h4 className="font-semibold">Zero Food Waste Initiative</h4>
//         <p className="text-gray-600">Successfully implemented in 50 locations</p>
//       </div>
//     </div>
//   </div>
// );

const Achievements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState([
    {
      title: "100,000 Meals Served",
      description: "Reached milestone in December 2023",
    },
    {
      title: "Community Impact Award",
      description: "Received in October 2023",
    },
    {
      title: "Zero Food Waste Initiative",
      description: "Successfully implemented in 50 locations",
    },
  ]);

  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
  });

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({ title: "", description: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">NGO Achievements</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Achievement
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="border-l-4 border-green-600 pl-4 flex items-start gap-3"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {achievement.title}
              </h4>
              <p className="text-gray-600 mt-1">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Achievement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAchievement}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PickupHistory = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickupHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored here
        const response = await axios.get(
          "https://food-share-zv84.onrender.com/api/receiver/pickup-history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPickups(response.data.pickups);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pickup history:", err);
        if (err.response) {
          console.error("Server responded with:", err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
        setLoading(false);
      }
    };

    fetchPickupHistory();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Pickup History</h3>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : pickups.length === 0 ? (
        <p className="text-gray-600">No pickups found.</p>
      ) : (
        <div className="space-y-4">
          {pickups.map((pickup, index) => (
            <div
              key={pickup._id || index}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h4 className="font-semibold">Pickup #{index + 1}</h4>
                <p className="text-gray-600">
                  From: {pickup?.donor?.name || "Donor"}
                </p>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {new Date(
                    pickup.createdAt || pickup?.request?.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {pickup?.request?.approxPeople || "?"} meals
                </p>
                <p className="text-green-600 capitalize">{pickup.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function ReceiverDashbaord() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "requests":
        return <Requests />;
      case "achievements":
        return <Achievements />;
      case "history":
        return <PickupHistory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-1/4" : "ml-16"
        } p-8`}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default ReceiverDashbaord;
