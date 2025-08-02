"use client"

import React from "react";

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }) => {
  if (totalPages <= 1) return null

  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
          {totalItems} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum

            if (totalPages <= 5) {
              // If total pages is 5 or less, show all pages
              pageNum = i + 1
            } else {
              // For more than 5 pages, show 5 pages around current page
              const startPage = Math.max(1, currentPage - 2)
              const endPage = Math.min(totalPages, startPage + 4)
              const adjustedStartPage = Math.max(1, endPage - 4)
              pageNum = adjustedStartPage + i
            }

            // Ensure we don't exceed total pages
            if (pageNum > totalPages) return null

            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            )
          }).filter(Boolean)}

          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
