import React, { useState } from 'react';
import { Menu, X, DollarSign, History, UserCog, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import DonorPage from './DonorPage';
import PastActivities from './PastActivities';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
function AllShow() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('donate');
  const navigate=useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: 'donate', label: 'Donate', icon: DollarSign },
    { id: 'activities', label: 'Past Activities', icon: History },
    { id: 'profile', label: 'Profile', icon: UserCog },
  ];

  const handleLogout = () => {
    if(localStorage.getItem('token')) localStorage.removeItem('token');
    navigate('/');
    console.log('User logged out');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'donate':
        return <DonorPage />;
      case 'activities':
        return <PastActivities />;
      case 'profile':
        return <Profile />;
      default:
        return <DonorPage />;
    }
  };

  return (
    <div className="flex h-screen bg-green-900/5">
      <Sidebar 
        isOpen={isOpen} 
        menuItems={menuItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-green-900 text-white shadow-lg">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="text-white hover:text-green-200 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold">Food Share Donor Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-700 rounded-md transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-green-900/5 to-green-900/10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AllShow;
