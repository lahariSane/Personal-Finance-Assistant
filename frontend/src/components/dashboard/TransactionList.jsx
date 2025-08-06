import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionList = ({ transactions }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-2 w-full md:w-1/2 flex flex-col justify-between">
      <h3 className="font-bold text-lg mb-2">Recent Transactions</h3>

      <div className="space-y-2 flex-grow">
        {transactions.map(
          (tx, index) =>
            index < 2 && (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-semibold">{tx.description}</p>
                  <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                </div>
                <p
                  className={`font-medium ${
                    tx.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.amount > 0 ? "+" : "-"}₹{Math.abs(tx.amount)}
                </p>
              </div>
            )
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/transactions")}
          className="text-blue-600 font-medium hover:underline"
        >
          View All →
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
