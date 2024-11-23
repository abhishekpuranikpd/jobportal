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
import { Card } from "@/components/ui/card"; // Assuming you have a Card component for count display

const JobseekerTable = ({ userdata }) => {
  const [filter, setFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);

  // Reference to the table for printing
  const tableRef = useRef(null);

  // Format userdata into a table-friendly format
  const data = useMemo(() => {
    return userdata.map((jobseeker) => ({
      id: jobseeker.id,
      fullName: jobseeker.fullName,
      email: jobseeker.email,
      phone: jobseeker.phone,

      skills: jobseeker.skills ? jobseeker.skills.join(", ") : "", // Check if skills exists

      location: jobseeker.location || "Not Provided",
      availability: jobseeker.availability ? "Available" : "Not Available",
      createdAt: new Date(jobseeker.createdAt),
    }));
  }, [userdata]);

  // Filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesName = item.fullName.toLowerCase().includes(filter.toLowerCase());
      const matchesEmail = item.email.toLowerCase().includes(emailFilter.toLowerCase());
      const matchesLocation = item.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesAvailability = item.availability.toLowerCase().includes(availabilityFilter.toLowerCase());

      return matchesName && matchesEmail && matchesLocation && matchesAvailability;
    });
  }, [data, filter, emailFilter, locationFilter, availabilityFilter]);

  // Columns definition
  const columns = [
    { accessorKey: "fullName", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "availability", header: "Availability" },
    {
      accessorKey: "createdAt",
      header: "Account Created",
      cell: (info) => info.getValue().toLocaleDateString(),
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

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle Print functionality
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
          <h1>Jobseeker Table</h1>
          <div>${printContent}</div> 
        </body>
      </html>
    `);
    printWindow.document.close(); // Close the document
    printWindow.print(); // Trigger print dialog
  };

  // Jobseekers count (filtered)
  const jobseekerCount = filteredData.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-10 md:mt-8 mb-4 mx-auto w-full md:p-4">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap justify-between gap-4">
  <input
    type="text"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    placeholder="Search by Full Name..."
    className="p-2 border rounded-full shadow-lg w-full sm:w-auto md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
  <input
    type="text"
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
    placeholder="Filter by Location..."
    className="p-2 border rounded-full shadow-lg w-full sm:w-auto md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
  <input
    type="text"
    value={availabilityFilter}
    onChange={(e) => setAvailabilityFilter(e.target.value)}
    placeholder="Filter by Availability..."
    className="p-2 border rounded-full shadow-lg w-full sm:w-auto md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Print Button */}
<div className="mb-4 flex justify-between items-center space-x-2 w-full">
  {/* Jobseekers Count */}
  <div className="flex-1">
    <Card className="p-2 bg-blue-100 text-blue-800">
      <h3 className="text-sm font-semibold">Jobseekers Count - {jobseekerCount}</h3>
    </Card>
  </div>
  
  {/* Print Button */}
  <div>
    <button
      onClick={handlePrint}
      className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
    >
      Print
    </button>
  </div>
</div>


      {/* Table Container */}
      <div
        ref={tableRef}
        className="overflow-x-auto w-[370px] container mx-auto rounded-xl md:w-full"
      >
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
              setPageIndex((prev) =>
                Math.min(prev + 1, table.getPageCount() - 1)
              );
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

export default JobseekerTable;
