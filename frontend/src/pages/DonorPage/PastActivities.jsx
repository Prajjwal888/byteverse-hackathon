import React from 'react';

const mockDonations = [
  {
    id: 1,
    date: '2024-03-15',
    amount: 100,
    status: 'Completed',
    campaign: 'Education Fund',
  },
  {
    id: 2,
    date: '2024-02-28',
    amount: 50,
    status: 'Completed',
    campaign: 'Healthcare Initiative',
  },
  {
    id: 3,
    date: '2024-02-10',
    amount: 75,
    status: 'Completed',
    campaign: 'Emergency Relief',
  },
];

const PastActivities = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-green-900 mb-8">Past Donations</h2>
      <div className="overflow-hidden rounded-xl border-2 border-green-100">
        <table className="min-w-full divide-y divide-green-100">
          <thead className="bg-green-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-100">
            {mockDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">
                  ${donation.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800">
                  {donation.campaign}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastActivities;