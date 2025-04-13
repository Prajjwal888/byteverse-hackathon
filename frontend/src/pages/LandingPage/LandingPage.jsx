import React from "react";
import {
  Heart,
  Bell,
  ArrowRight,
  Users,
  Clock,
  Leaf,
  Shirt,
  Gift,
  BookOpen,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReceiverDonorSlider from "../../Slider";
import { motion } from "framer-motion";
import keenSlider from "keen-slider";
function LandingPage() {
  const navigate = useNavigate();

  const donorLogin = (e) => {
    e.preventDefault();
    navigate(`/donorLogin`);
  };

  const receiverLogin = (e) => {
    e.preventDefault();
    navigate(`/receiverLogin`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Share What You Have
              <br />
              With Those in Need
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Connect with NGOs to donate food, clothing, books, and more. Make
              a difference in your community today.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors flex items-center gap-2 hover:cursor-pointer "
                onClick={(e) => receiverLogin(e)}
              >
                Register as NGO <ArrowRight size={20} />
              </button>
              <button
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors hover:cursor-pointer"
                onClick={(e) => donorLogin(e)}
              >
                I Want to Donate
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
              <p className="text-gray-600">
                Receive instant notifications when donations become available in
                your area.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Accept donations and arrange pickup within minutes through our
                platform.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
              <p className="text-gray-600">
                Distribute items to those in need and help build a stronger
                community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Items Donated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Active NGOs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                1,000+
              </div>
              <div className="text-gray-600">Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
  <motion.h2
    className="text-4xl font-extrabold text-gray-800 mb-6"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    Our Work For People
  </motion.h2>

  <ReceiverDonorSlider />
</div>
      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://th.bing.com/th/id/OIP.DYdTlkkKprqHmhwONNoqcgHaEq?w=267&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                alt="Donation center"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Real-time Notifications
                    </h3>
                    <p className="text-gray-600">
                      Get instant alerts when donations become available in your
                      area.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Easy Coordination
                    </h3>
                    <p className="text-gray-600">
                      Seamless communication between donors and NGOs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Multiple Categories
                    </h3>
                    <p className="text-gray-600">
                      Donate various items from food to clothing and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our network of NGOs and help us create a world where everyone
            has access to basic necessities.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-8 h-8" />
              <span className="text-xl font-bold">FoodShare</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-400">
                About
              </a>
              <a href="#" className="hover:text-green-400">
                Contact
              </a>
              <a href="#" className="hover:text-green-400">
                Privacy
              </a>
              <a href="#" className="hover:text-green-400">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
