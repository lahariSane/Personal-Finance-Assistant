"use client";

import React, { useState, useEffect, useMemo } from "react";
import useTransactionStore from "../store/transactionStore";
import Filters from "../components/transactions/Filters";
import TransactionTable from "../components/transactions/TransactionTable";
import Pagination from "../components/transactions/Pagination";
import EditModal from "../components/transactions/EditModal";
import DeleteModal from "../components/transactions/DeleteModal";
import ErrorAlert from "../components/ErrorAlert";
import useAuthStore from "../store/authStore";

const Transactions = () => {
  const { user, loading: userLoading, fetchCurrentUser } = useAuthStore();
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    type: "",
    paymentMethod: "",
    sort: "",
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    transactions,
    loading,
    error,
    selectedTransactions,
    deleteLoading,
    fetchUserTransactions,
    updateTransaction,
    deleteTransactions,
    selectTransaction,
    selectAllTransactions,
    resetMessages,
  } = useTransactionStore();

  const itemsPerPage = 10;

  // Fetch current user
  useEffect(() => {
    if (!user) {
      fetchCurrentUser().catch((err) =>
        console.error("Failed to fetch user:", err)
      );
    }
  }, [user, fetchCurrentUser]);

  useEffect(() => {
    if (filters.sort === "asc" || filters.sort === "desc") {
      setSortOrder(filters.sort);
    }
  }, [filters.sort]);

  // Fetch transactions when user or filters change
  useEffect(() => {
    const loadTransactions = async () => {
      if (user?._id || user?.id) {
        const userId = user._id || user.id;
        await fetchUserTransactions(userId);
      }
    };
    loadTransactions();
  }, [user, fetchUserTransactions]);

  // Reset pagination on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      category: "",
      type: "",
      paymentMethod: "",
      sortOptions: "",
    });
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      // You might want to call a store update function here
      await updateTransaction(updatedTransaction);
      await fetchUserTransactions(user._id || user.id); // Refresh
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update transaction:", err);
    }
  };

  const handleDeleteTransactions = async () => {
    try {
      const result = await deleteTransactions(selectedTransactions);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete transactions:", error);
    }
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((txn) => {
        const txnDate = new Date(txn.date);
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;

        const matchesDate =
          (!from || txnDate >= from) && (!to || txnDate <= to);
        const matchesCategory =
          !filters.category || txn.category === filters.category;
        const matchesType = !filters.type || txn.type === filters.type;
        const matchesPaymentMethod =
          !filters.paymentMethod || txn.paymentMethod === filters.paymentMethod;
        // Sorting is handled after filtering, not as a filter condition
        return (
          matchesDate && matchesCategory && matchesType && matchesPaymentMethod
        );
      })
      .sort((a, b) => {
        console.log(a.date, b.date, filters.sort);
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (filters.sort === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
        return 0;
      });
  }, [transactions, filters]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Get all categories and payment methods from transactions
  const categories = useMemo(() => {
    const unique = new Set();
    transactions.forEach((t) => t.category && unique.add(t.category));
    return Array.from(unique);
  }, [transactions]);

  const paymentMethods = useMemo(() => {
    const unique = new Set();
    transactions.forEach((t) => t.paymentMethod && unique.add(t.paymentMethod));
    return Array.from(unique);
  }, [transactions]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to view your transactions.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              All Transactions
            </h1>
            <p className="text-gray-600 mt-2">
              Showing {filteredTransactions.length} transaction(s)
            </p>
          </div>
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          filteredCount={filteredTransactions.length}
          categories={categories}
          paymentMethods={paymentMethods}
          sortOptions={["asc", "desc"]}
        />

        {/* Error Message */}
        <ErrorAlert error={error} onClose={resetMessages} />

        {/* Table */}
        <TransactionTable
          transactions={filteredTransactions}
          loading={loading}
          selectedTransactions={selectedTransactions}
          onSelectTransaction={selectTransaction}
          onSelectAll={selectAllTransactions}
          onEditTransaction={(transaction) => {
            setEditTransaction(transaction);
            setShowEditModal(true);
          }}
          onDeleteSelected={() => setShowDeleteModal(true)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalTransactions={filteredTransactions.length}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTransactions.length}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Edit Transaction Modal */}
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        transaction={editTransaction}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTransactions}
        selectedCount={selectedTransactions.length}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default Transactions;
