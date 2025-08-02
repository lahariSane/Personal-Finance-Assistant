"use client";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import ReceiptUpload from "../components/addTransaction/ReceiptUpload";
import ManualEntryForm from "../components/addTransaction/ManualEntryForm";
import {
  validateTransactionForm,
  formatTransactionData,
  getInitialFormData,
} from "../utils/transactionValidation";

const AddTransaction = () => {
  const [entryMode, setEntryMode] = useState("none"); // NEW
  const [activeTab, setActiveTab] = useState("expense");
  const [formData, setFormData] = useState(getInitialFormData());

  const { user } = useAuthStore();

  const {
    extractFromReceipt,
    bulkUpload,
    resetMessages,
    error,
    success,
    loading,
    extractedTransactions,
    receiptUploading,
    showExtractedData,
    clearExtractedTransactions,
    setExtractedTransactions,
  } = useTransactionStore();

  const handleFileUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        useTransactionStore.setState({
          error: "Please upload a valid PDF or image file.",
        });
        return;
      }

      extractFromReceipt(file, user._id);
      resetMessages();
    },
    [extractFromReceipt]
  );

  const handleChange = useCallback(
    (idx, key, valueOrTxn) => {
      const updated = [...extractedTransactions];
      if (key === null) {
        // New transaction being added
        updated.push(valueOrTxn);
      } else {
        updated[idx][key] = valueOrTxn;
      }
      setExtractedTransactions(updated);
    },
    [extractedTransactions, setExtractedTransactions]
  );

  const handleConfirm = useCallback(
    async (finalTxns) => {
      await bulkUpload(finalTxns);
      resetMessages();
      clearExtractedTransactions();
    },
    [bulkUpload, resetMessages, clearExtractedTransactions]
);


  const handleCancel = useCallback(() => {
    resetMessages();
    clearExtractedTransactions();
  }, [resetMessages, clearExtractedTransactions]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      setFormData((prev) => ({ ...prev, category: "" }));
      resetMessages();
    },
    [resetMessages]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await bulkUpload();
      resetMessages();
    },
    [bulkUpload, resetMessages]
  );

  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    resetMessages();
  }, [resetMessages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Add Transaction
            </h1>
            <Link to="/transactions" className="text-blue-600 hover:underline">
              View Transactions
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Entry Mode Selection */}
        {entryMode === "none" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Choose Entry Mode
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setEntryMode("receipt")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload Receipt
              </button>
              <button
                onClick={() => setEntryMode("manual")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Manual Entry
              </button>
            </div>
          </div>
        )}

        {/* PDF Upload UI */}
        {entryMode === "receipt" && (
          <>
            <ReceiptUpload
              handleFileUpload={handleFileUpload}
              extractedTransactions={extractedTransactions}
              showExtractedData={showExtractedData}
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
              handleChange={handleChange}
              receiptUploading={receiptUploading}
              setEntryMode={setEntryMode}
              error={error}
              success={success}
            />
          </>
        )}

        {/* Manual Transaction Form */}
        {entryMode === "manual" && (
          <ManualEntryForm
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            success={success}
            error={error}
            resetMessages={resetMessages}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            loading={loading}
            resetForm={resetForm}
            setEntryMode={setEntryMode}
          />
        )}
      </main>
    </div>
  );
};

export default AddTransaction;
