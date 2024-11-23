"use client"; // Add this line to indicate that this component should be rendered on the client side

import React, { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditAdminClient from "@/app/auth/components/editadmins"; // Assuming this component is used for editing
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import RegisterComponent from "@/app/auth/components/compo";

const SubadminTable = ({ subadminData }) => {
  const [filter, setFilter] = useState(""); // Search filter for name/email
  const [loading, setLoading] = useState(true); // Loading state
  const [pageSize, setPageSize] = useState(5); // Page size
  const [pageIndex, setPageIndex] = useState(0); // Page index

  // Format subadminData into a table-friendly format
  const data = useMemo(() => {
    return subadminData.map((subadmin) => ({
      id: subadmin.id,
      name: subadmin.name || "Not Provided",
      email: subadmin.email,
      role: subadmin.role,
      permissions: subadmin.permissions.join(", "), // Convert permissions array to string
      createdAt: new Date(subadmin.createdAt),
    }));
  }, [subadminData]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(filter.toLowerCase());
      const matchesEmail = item.email.toLowerCase().includes(filter.toLowerCase());
      return matchesName || matchesEmail;
    });
  }, [data, filter]);

  // Set up columns for the table
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "permissions", header: "Permissions" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => info.getValue().toLocaleDateString(),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          // Extract the admin/subadmin's ID from the row
          const adminId = row.original.id;
      
          return (
            <Dialog>
              <DialogTrigger>
                <button className="px-4 py-1 bg-blue-500 text-white shadow-lg rounded-full">
                  Edit
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    {/* Pass the admin ID to the EditAdminClient component */}
                    <EditAdminClient adminId={adminId} data={subadminData} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        },
      }
      
    ],
    []
  );

  // Pagination and sorting setup
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter: filter,
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      const newState =
        updater instanceof Function
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
  });

  // Simulate loading state (e.g., fetching data)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  // Return a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-12 mb-4 mx-auto w-full px-4">
      {/* Filters */}
      <div className="mb-4 container mx-auto flex flex-col sm:flex-row gap-4 justify-between">
        {/* Search Input */}
        <Input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by Name or Email..."
          className="p-2 border rounded-xl shadow-lg w-full sm:w-64 focus:outline-none"
        />    <Dialog>
        <DialogTrigger>
        <span className="flex items-center px-4 py-1 bg-blue-500 text-white shadow-lg rounded-full">
          <PlusCircle size={24} />  
          <span>Add Admin</span>
        </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              {/* Pass the admin ID to the EditAdminClient component */}
<RegisterComponent/>            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
       
  
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full rounded-xl">
        <Table className="min-w-full table-auto border border-gray-300">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-blue-500 text-white">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-2 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2 border-b border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <select
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            setPageIndex(0);
            table.setPageSize(newSize);
          }}
          className="p-2 border rounded w-full sm:w-auto"
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size} Rows
            </option>
          ))}
        </select>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="w-full sm:w-auto"
          >
            First
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="w-full sm:w-auto"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubadminTable;
