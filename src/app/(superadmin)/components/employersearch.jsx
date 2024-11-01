"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmployerJobTable = ({ employerJobsWithCounts }) => {
  const [filter, setFilter] = useState("");
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showMostRecent, setShowMostRecent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  
  // Reference to the table for printing
  const tableRef = useRef(null);

  const data = useMemo(
    () =>
      employerJobsWithCounts.flatMap((employer) =>
        employer.jobs.map((job) => {
          const postedDate = new Date(job.postedDate);
          return {
            employerId: employer.employerId,
            employerName: employer.employerName,
            jobTitle: job.jobTitle,
            appliedCount: job.appliedCount,
            shortlistedCount: job.shortlistedCount,
            rejectedCount: job.rejectedCount,
            postedDate:
              postedDate instanceof Date && !isNaN(postedDate)
                ? postedDate
                : null,
          };
        })
      ),
    [employerJobsWithCounts]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesName = item.employerName
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchesShortlisted = showShortlisted
        ? item.shortlistedCount > 0
        : true;
      const matchesRejected = showRejected
        ? item.rejectedCount > 0
        : true;
      const matchesRecent = showMostRecent
        ? item.postedDate &&
          item.postedDate >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        : true;
      return (
        matchesName &&
        matchesShortlisted &&
        matchesRejected &&
        matchesRecent
      );
    });
  }, [data, filter, showShortlisted, showRejected, showMostRecent]);

  const columns = [
    { accessorKey: "employerName", header: "Employer Name" },
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "appliedCount", header: "Applied Candidates" },
    { accessorKey: "shortlistedCount", header: "Shortlisted" },
    { accessorKey: "rejectedCount", header: "Rejected" },
    {
      accessorKey: "postedDate",
      header: "Posted Date",
      cell: (info) =>
        info.getValue()
          ? info.getValue().toLocaleDateString()
          : "Invalid Date",
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter: filter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        updater instanceof Function
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML; // Get table content
    const printWindow = window.open("", "_blank"); // Open new window

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Employer Job Table</h1>
          <div>${printContent}</div> 
        </body>
      </html>
    `);
    printWindow.document.close(); // Close the document
    printWindow.print(); // Trigger print dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-10 md:mt-8 mb-4 mx-auto w-full md:p-8">
      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by Employer Name..."
          className="p-2 border rounded-full shadow-lg w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Checkboxes */}
      <div className="mb-4 flex justify-center space-x-4 p-2 rounded-xl">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showShortlisted}
            onChange={(e) => setShowShortlisted(e.target.checked)}
            className="mr-2 h-4 w-4"
          />
          Show Shortlisted Candidates
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showRejected}
            onChange={(e) => setShowRejected(e.target.checked)}
            className="mr-2 h-4 w-4"
          />
          Show Rejected Candidates
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showMostRecent}
            onChange={(e) => setShowMostRecent(e.target.checked)}
            className="mr-2 h-4 w-4"
          />
          Show Most Recent Jobs
        </label>
      </div>

      {/* Print Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
        >
          Print
        </button>
      </div>

      {/* Table Container */}
      <div ref={tableRef} className="overflow-x-auto w-[370px] container mx-auto rounded-xl md:w-full">
        <Table className="min-w-full overflow-x-auto border border-gray-300">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-blue-500 hover:bg-blue-500 text-white"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-b border-gray-300 p-2 text-left font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center border-2 p-4">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`hover:bg-gray-100 transition duration-200 ease-in-out ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-b border-r border-gray-300 p-2"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setPageSize(newSize);
              setPageIndex(0);
              table.setPageSize(newSize);
            }}
            className="border rounded p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              table.previousPage();
              setPageIndex((prev) => Math.max(prev - 1, 0));
            }}
            disabled={!table.getCanPreviousPage()}
            className={`px-4 py-2 border rounded transition-colors duration-200 ${
              table.getCanPreviousPage()
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            onClick={() => {
              table.nextPage();
              setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1));
            }}
            disabled={!table.getCanNextPage()}
            className={`px-4 py-2 border rounded transition-colors duration-200 ${
              table.getCanNextPage()
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobTable;
