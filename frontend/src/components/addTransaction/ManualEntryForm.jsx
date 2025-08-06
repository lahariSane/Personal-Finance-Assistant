import React from "react";
import TransactionTabNavigation from "./TransactionTabNavigation";
import TransactionFormFields from "./TransactionFormFields";
import TransactionFormActions from "./TransactionFormActions";
import SuccessMessage from "./SuccessMessage";
import ErrorAlert from "../ErrorAlert";

const ManualEntryForm = ({
  activeTab,
  handleTabChange,
  success,
  error,
  resetMessages,
  handleSubmit,
  formData,
  handleInputChange,
  loading,
  resetForm,
  setEntryMode,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Manual Entry</h2>
        <p className="text-gray-600">Add individual transactions manually</p>
      </div>

      <TransactionTabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {success && <SuccessMessage message={success} />}
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <ErrorAlert error={error} onClose={resetMessages} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <TransactionFormFields
          formData={formData}
          activeTab={activeTab}
          onChange={handleInputChange}
        />
        <TransactionFormActions
          activeTab={activeTab}
          loading={loading}
          onReset={resetForm}
          onSubmit={handleSubmit}
        />
      </form>

      <div className="text-center pb-4">
        <button
          onClick={() => setEntryMode("none")}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Entry Mode Selection
        </button>
      </div>
    </div>
  );
};

export default ManualEntryForm;
