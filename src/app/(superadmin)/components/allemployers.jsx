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
} from "@/components/ui/table"; // Adjust the import based on your project setup
import { Card } from "@/components/ui/card"; // Assuming Shadcn Card is available here

const EmployerTable = ({ userdata }) => {
  const [filter, setFilter] = useState(""); // Search filter for company name
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter
  const [industryFilter, setIndustryFilter] = useState(""); // Industry filter
  const [mostRecent, setMostRecent] = useState(false); // Most recent filter
  const [loading, setLoading] = useState(true); // Loading state
  const [pageSize, setPageSize] = useState(5); // Page size
  const [pageIndex, setPageIndex] = useState(0); // Page index
  const [sortOrder, setSortOrder] = useState("desc"); // Sort order: 'desc' for newest to oldest, 'asc' for oldest to newest

  const tableRef = useRef(null);

  // Format userdata into a table-friendly format
  const data = useMemo(() => {
    return userdata.map((employer) => ({
      id: employer.id,
      name: employer.name,
      email: employer.email,
      phoneNumber: employer.phoneNumber || "Not Provided",
      companyWebsite: employer.companyWebsite || "Not Provided",
      industry: employer.industry || "Not Provided",
      companySize: employer.companySize || "Not Provided",
      createdAt: new Date(employer.createdAt),
      category: employer.category || "Not Provided", // Assuming employer has a category field
    }));
  }, [userdata]);

  // Filter data based on search, category, industry, and most recent
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = categoryFilter
        ? item.category.toLowerCase() === categoryFilter.toLowerCase()
        : true;
      const matchesIndustry = industryFilter
        ? item.industry.toLowerCase().includes(industryFilter.toLowerCase())
        : true;
      const matchesMostRecent = mostRecent
        ? item.createdAt >= new Date(new Date().setMonth(new Date().getMonth() - 1)) // Filter for the last month
        : true;
      return matchesName && matchesCategory && matchesIndustry && matchesMostRecent;
    });
  }, [data, filter, categoryFilter, industryFilter, mostRecent]);

  // Sorting logic to reverse or show most recent
  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.createdAt - a.createdAt; // Most recent first
      }
      return a.createdAt - b.createdAt; // Oldest first
    });
  }, [filteredData, sortOrder]);

  const columns = [
    { accessorKey: "name", header: "Company Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phoneNumber", header: "Phone Number" },
    { accessorKey: "companyWebsite", header: "Website" },
    { accessorKey: "industry", header: "Industry" },
    { accessorKey: "companySize", header: "Company Size" },
    {
      accessorKey: "createdAt",
      header: "Account Created",
      cell: (info) => info.getValue().toLocaleDateString(),
    },
    { accessorKey: "category", header: "Category" },
  ];

  const table = useReactTable({
    data: sortedData, // Use sorted data for table rendering
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
          <h1>Employer Table</h1>
          <div>${printContent}</div> 
        </body>
      </html>
    `);
    printWindow.document.close(); // Close the document
    printWindow.print(); // Trigger print dialog
  };

  // Count of employers received today
  const todayReceivedCount = useMemo(() => {
    const today = new Date();
    return userdata.filter((employer) => {
      const createdAt = new Date(employer.createdAt);
      return (
        createdAt.getDate() === today.getDate() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    }).length;
  }, [userdata]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-10 md:mt-12 mb-4 mx-auto w-full md:p-8">
      {/* Display the count of employers received today */}
      <div className="mb-4 flex flex-wrap gap-4 justify-between">
        <Card className="w-full md:w-1/3 p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">Today Received</h3>
          <p className="text-xl">{todayReceivedCount} Employers</p>
        </Card>
      </div>

      {/* Filters Container - Stack filters on smaller screens */}
      <div className="mb-4 flex flex-wrap gap-4 justify-between">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by Company Name..."
            className="p-2 border rounded-full shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Industry Filter */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            placeholder="Filter by Industry"
            className="p-2 border rounded-full shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort Order Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-full shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest to Oldest</option>
            <option value="asc">Oldest to Newest</option>
          </select>
        </div>

        {/* Most Recent Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="mr-2">Most Recent</label>
          <input
            type="checkbox"
            checked={mostRecent}
            onChange={() => setMostRecent(!mostRecent)}
            className="focus:ring-blue-500"
          />
        </div>
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

      {/* Table Container - Make it scrollable on small screens */}
      <div
        ref={tableRef}
        className="overflow-x-auto w-full rounded-xl"
      >
        <Table className="min-w-full table-auto border border-gray-300">
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center border-2 p-4"
                >
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-between items-center mt-4">
        <div className="flex items-center gap-4">
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
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} Rows
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            First
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>

          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerTable;
