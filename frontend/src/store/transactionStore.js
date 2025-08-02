import { create } from "zustand";
import axios from "../utils/axios";

const useTransactionStore = create((set, get) => ({
  loading: false,
  error: "",
  success: "",
  receiptUploading: false,
  extractedTransactions: [],
  showExtractedData: false,
  transactions: [],
  selectedTransactions: [],
  deleteLoading: false,

  // set extracted transactions
  setExtractedTransactions: (transactions) =>
    set({ extractedTransactions: transactions, showExtractedData: true }),

  // Fetch transactions for a user, with optional date filtering
  fetchUserTransactions: async (userId, start, end) => {
    set({ loading: true, error: "" });
    try {
      const params = {
        limit: 1000,
        sortBy: "date",
        sortOrder: "desc",
      };
      if (start) params.start = start;
      if (end) params.end = end;
      const response = await axios.get(`/api/transactions/user/${userId}`, {
        params,
      });
      if (response.data.success) {
        set({ transactions: response.data.data });
      } else {
        set({ error: "Failed to fetch transactions" });
      }
    } catch (error) {
      set({ error: "Failed to load transaction data" });
    } finally {
      set({ loading: false });
    }
  },

  updateTransaction: async (updatedTxn) => {
    try {
      const response = await axios.put(
        `/api/transactions/${updatedTxn.id}`,
        updatedTxn
      );
      const index = get().transactions.findIndex(
        (t) => t._id === updatedTxn._id
      );
      if (index !== -1) {
        const updatedList = [...get().transactions];
        updatedList[index] = response.data;
        set({ transactions: updatedList });
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  },

  // Delete transactions
  deleteTransactions: async (transactionIds) => {
    set({ deleteLoading: true, error: "" });
    try {
      const deletePromises = transactionIds.map(async (id) => {
        try {
          await axios.delete(`/api/transactions/${id}`);
          return { success: true, id };
        } catch (error) {
          return { success: false, id, error };
        }
      });

      const results = await Promise.all(deletePromises);
      const successfulDeletes = results
        .filter((r) => r.success)
        .map((r) => r.id);
      const failedDeletes = results.filter((r) => !r.success);

      if (failedDeletes.length > 0) {
        set({
          error: `Failed to delete ${failedDeletes.length} transaction(s)`,
        });
      }

      // Remove successfully deleted transactions from local state
      if (successfulDeletes.length > 0) {
        set((state) => ({
          transactions: state.transactions.filter(
            (t) => !successfulDeletes.includes(t._id)
          ),
          selectedTransactions: [],
        }));
      }

      return {
        successCount: successfulDeletes.length,
        failedCount: failedDeletes.length,
      };
    } catch (error) {
      set({ error: "Failed to delete transactions" });
      return { successCount: 0, failedCount: transactionIds.length };
    } finally {
      set({ deleteLoading: false });
    }
  },

  clearExtractedTransactions: () =>
    set({
      extractedTransactions: [],
      showExtractedData: false,
      success: "",
      error: "",
    }),

  selectTransaction : (transactionId) =>
    set((state) => ({
      selectedTransactions: state.selectedTransactions.includes(transactionId)
        ? state.selectedTransactions.filter((id) => id !== transactionId)
        : [...state.selectedTransactions, transactionId],
    })),

  selectAllTransactions: (transactionIds) => {
    set((state) => ({
      selectedTransactions:
        state.selectedTransactions.length === transactionIds.length
          ? []
          : transactionIds,
    }));
  },

  clearSelection: () => set({ selectedTransactions: [] }),

  // Extract transactions from PDF or image files
  extractFromReceipt: async (file, userId) => {
    if (
      !file ||
      !file.type ||
      !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
    ) {
      set({ error: "Please select a valid image or PDF file" });
      return;
    }
    set({ receiptUploading: true, error: "", success: "" });
    try {
      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("userId", userId);
      const response = await axios.post("/api/receipt/upload", formData, {
        timeout: 30000,
      });
      console.log("Receipt upload response:", response.data);
      if (response.status === 200) {
        const data = response.data.extractedData;
        const transactions = Array.isArray(data) ? data : [data];
        set({
          extractedTransactions: transactions,
          showExtractedData: true,
          success: "Receipt processed successfully!",
        });
      } else {
        set({ error: response.data.message || "Failed to parse receipt" });
      }
      return response.data.extractedTransactions || [];
    } catch (error) {
      if (error.response?.status === 413) {
        set({
          error: "File too large. Please upload a file smaller than 10MB.",
        });
      } else if (error.response?.data?.message) {
        set({ error: error.response.data.message });
      } else if (error.code === "ECONNABORTED") {
        set({ error: "Upload timeout. Please try with a smaller file." });
      } else {
        set({ error: "Failed to upload and parse receipt. Please try again." });
      }
    } finally {
      set({ receiptUploading: false });
    }
  },

  // Bulk upload extracted transactions
  bulkUpload: async () => {
    const { extractedTransactions } = get();
    if (extractedTransactions.length === 0) return;
    set({ loading: true, error: "", success: "" });
    try {
      const batchSize = 10;
      let successCount = 0;
      for (let i = 0; i < extractedTransactions.length; i += batchSize) {
        const batch = extractedTransactions.slice(i, i + batchSize);
        const promises = batch.map((transaction) =>
          axios.post("/api/transactions", transaction)
        );
        const results = await Promise.allSettled(promises);
        successCount += results.filter(
          (result) => result.status === "fulfilled"
        ).length;
      }
      set({
        success: `Successfully uploaded ${successCount} out of ${extractedTransactions.length} transactions!`,
        extractedTransactions: [],
        showExtractedData: false,
      });
      return successCount;
    } catch (error) {
      set({ error: "Failed to upload some transactions. Please try again." });
    } finally {
      set({ loading: false });
    }
  },

  // Reset extracted data
  resetExtracted: () =>
    set({
      extractedTransactions: [],
      showExtractedData: false,
      success: "",
      error: "",
    }),
  // Reset all messages
  resetMessages: () => set({ error: "", success: "" }),
}));

export default useTransactionStore;
