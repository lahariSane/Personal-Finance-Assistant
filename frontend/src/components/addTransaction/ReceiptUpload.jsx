import React, { useState, useEffect, useMemo } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReceiptUpload = ({
  handleFileUpload,
  extractedTransactions,
  showExtractedData,
  handleConfirm,
  handleCancel,
  receiptUploading,
  setEntryMode,
  error,
  success,
}) => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState(""); // success | error | warning
  const [newTxn, setNewTxn] = useState({
    date: "",
    description: "",
    amount: "",
    type: "expense",
  });

  const [localTransactions, setLocalTransactions] = useState([])
  const [showNoDataSnackbar, setShowNoDataSnackbar] = useState(false);

  

  useEffect(() => {
    if (
      !receiptUploading &&
      showExtractedData &&
      localTransactions.length === 0
    ) {
      setShowNoDataSnackbar(true);
    }
  }, [receiptUploading, showExtractedData, localTransactions]);

  // Only initialize once when extractedTransactions first appear
  useEffect(() => {
    if (showExtractedData && extractedTransactions?.length > 0) {
      setLocalTransactions([...extractedTransactions]);
    }
  }, [showExtractedData]);

  useEffect(() => {
    let timeout;
    if (success || error) {
      setSnackbarMessage(success || error);
      setSnackbarType(success ? "success" : "error");
      timeout = setTimeout(() => setSnackbarMessage(""), 3000);
    }
    return () => clearTimeout(timeout);
  }, [success, error]);

  const handleLocalChange = (idx, key, value) => {
    const updated = [...localTransactions];
    updated[idx][key] = value;
    setLocalTransactions(updated);
  };

  const handleAddNewTransaction = () => {
    if (
      !newTxn.date ||
      !newTxn.description.trim() ||
      !newTxn.amount ||
      isNaN(parseFloat(newTxn.amount))
    ) {
      setSnackbarMessage("Please fill all fields correctly to add.");
      setSnackbarType("warning");
      return;
    }

    setLocalTransactions((prev) => [...prev, newTxn]);
    setNewTxn({ date: "", description: "", amount: "", type: "expense" });
    setSnackbarMessage("New transaction added.");
    setSnackbarType("success");
  };

  const onConfirmUpload = () => {
    const errors = {};

    localTransactions.forEach((txn, idx) => {
      const txnErrors = {};
      if (!txn?.date) txnErrors.date = true;
      if (!txn?.description?.trim()) txnErrors.description = true;
      if (!txn?.amount || isNaN(parseFloat(txn.amount)))
        txnErrors.amount = true;
      if (!txn?.type) txnErrors.type = true;

      if (Object.keys(txnErrors).length > 0) {
        errors[idx] = txnErrors;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSnackbarMessage("Please fill all required fields before uploading.");
      setSnackbarType("warning");
      return;
    }

    setFieldErrors({});
    handleConfirm(localTransactions);
  };

  // Filter out any null/undefined or incomplete transactions
  const validTransactions = useMemo(() => {
    return localTransactions.filter(
      (txn) => txn && txn.date && txn.description && txn.amount
    );
  }, [localTransactions]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-xl shadow-md border border-gray-200 relative">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Receipt Upload
      </h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50 text-center">
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="receiptUploadInput"
        />
        <label
          htmlFor="receiptUploadInput"
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Click to upload your receipt
        </label>

        {receiptUploading && (
          <p className="text-gray-500 mt-2 text-sm">
            Uploading & Processing...
          </p>
        )}
      </div>

      {/* Snackbar */}
      {snackbarMessage && (
        <div
          className={`mt-4 px-4 py-2 rounded text-white text-sm w-full text-center ${
            snackbarType === "success"
              ? "bg-green-500"
              : snackbarType === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {snackbarMessage}
        </div>
      )}

      {/* Review/Edit UI */}
      {!receiptUploading &&
        showExtractedData &&
        validTransactions.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-300">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Review & Edit Transactions
            </h3>

            {validTransactions.map((txn, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    value={txn.date?.substring(0, 10) || ""}
                    onChange={(e) =>
                      handleLocalChange(idx, "date", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <input
                    type="text"
                    value={txn.description || ""}
                    onChange={(e) =>
                      handleLocalChange(idx, "description", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={txn.amount || ""}
                    onChange={(e) =>
                      handleLocalChange(idx, "amount", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Type
                  </label>
                  <select
                    value={txn.type || "expense"}
                    onChange={(e) =>
                      handleLocalChange(idx, "type", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>
            ))}

            <div className="text-right space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmUpload}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Confirm & Upload All
              </button>
            </div>
          </div>
        )}

      <div className="mt-6 text-center">
        <button
          onClick={() => setEntryMode("none")}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Entry Mode Selection
        </button>
      </div>
      <Snackbar
        open={showNoDataSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowNoDataSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" onClose={() => setShowNoDataSnackbar(false)}>
          No transactions found
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReceiptUpload;
