import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2">
      <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button
          onClick={() => navigate('/add-transaction')}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 rounded font-medium"
        >
          ➕ Add New Transaction
        </button>
        <button
          onClick={() => navigate('/analytics')}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 rounded font-medium"
        >
          📊 View Analytics
        </button>
        <button
          onClick={() => navigate('/transactions')}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 rounded font-medium"
        >
          📁 View Transactions
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
