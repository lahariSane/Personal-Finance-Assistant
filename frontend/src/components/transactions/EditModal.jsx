import React, { useState, useEffect, useRef } from "react";
import {
  expenseCategories,
  incomeCategories,
  paymentMethods,
} from "../../constants/transaction";

const EditModal = ({ isOpen, onClose, onSave, transaction }) => {
  const modalRef = useRef();
  const firstInputRef = useRef();

  const [formData, setFormData] = useState({
    id: transaction ? transaction._id : null,
    description: "",
    amount: "",
    category: "",
    type: "expense",
    paymentMethod: "",
    notes: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction._id,
        description: transaction.description || "",
        amount: transaction.amount || "",
        category: transaction.category || "",
        type: transaction.type || "expense",
        paymentMethod: transaction.paymentMethod || "",
        notes: transaction.notes || "",
        date: transaction.date?.slice(0, 10) || "",
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset category if type changes
    if (name === "type") {
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const categoryOptions =
    formData.type === "income" ? incomeCategories : expenseCategories;

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-2">
          ✏️ Edit Transaction
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description*</label>
            <input
              ref={firstInputRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Groceries, Rent..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)*</label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date*</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional notes..."
              rows="3"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
