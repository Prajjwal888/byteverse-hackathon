import React from 'react';

const Sidebar = ({ isOpen, menuItems, activeTab, setActiveTab }) => {
  return (
    <aside 
      className={`bg-green-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-100 mb-8">Donor Portal</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'text-green-100 hover:bg-green-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;