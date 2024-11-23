"use client";

import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";
import Link from "next/link";

const EmployerStatusClient = ({ employerdata }) => {
  const [filter, setFilter] = useState("");
  const tableRef = useRef(null); // Reference for print functionality

  // Filtered employer data based on search filter (search by employer name)
  const filteredEmployers = employerdata.filter((employer) =>
    employer.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Employer</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 12px; font-family: Arial, sans-serif; }
            th { background-color: #f4f6f8; color: #333; font-weight: 600; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            tr:hover { background-color: #f1f1f1; }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; font-family: Arial, sans-serif;">Employer Information</h1>
          <div>${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mt-8 mb-4 mx-auto w-full p-6">
      {/* Header and Search */}
      <div className="flex flex-wrap gap-6 items-center mb-6">
        {/* Search Input */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by Employer Name..."
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Print Button */}
        <div className="w-full md:w-auto flex-shrink-0 flex justify-end mt-6 md:mt-0">
          <button
            onClick={handlePrint}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            <Printer className="mr-2" /> Print
          </button>
        </div>
      </div>

      {/* Employer Details Table */}
      <div
  ref={tableRef}
  className="overflow-x-auto md:w-full w-[400px]  rounded-xl border border-gray-300 shadow-lg"
>
  <Table className="min-w-full table-auto border-collapse">
    <TableHeader>
      <TableRow className="bg-gray-200 text-gray-700">
        {/* Employer details header */}
        <TableHead className="p-4 text-left text-xs sm:text-sm">Employer Name</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Email</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Phone Number</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Company Website</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Industry</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Company Size</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">About Company</TableHead>
        <TableHead className="p-4 text-left text-xs sm:text-sm">Approval Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {filteredEmployers.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center p-6 text-gray-500">
            No employers found.
          </TableCell>
        </TableRow>
      ) : (
        filteredEmployers.map((employer) => (
          <TableRow key={employer.id} className="hover:bg-gray-100 transition duration-200">
            <TableCell className="p-4 text-xs sm:text-sm"> <Link href={`/profile/employerslist/${employer.id}/`}>{employer.name}</Link></TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.email}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.phoneNumber || "Not provided"}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.companyWebsite || "Not provided"}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.industry || "Not provided"}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.companySize || "Not provided"}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.aboutcompany || "Not provided"}</TableCell>
            <TableCell className="p-4 text-xs sm:text-sm">{employer.approvalStatus || "Pending"}</TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>

    </div>
  );
};

export default EmployerStatusClient;
