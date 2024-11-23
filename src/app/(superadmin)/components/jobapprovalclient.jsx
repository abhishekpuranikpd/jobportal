"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Printer } from "lucide-react";

const JobApprovalStatusClient = ({ jobsdata }) => {
  const [jobList, setJobList] = useState(jobsdata);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const tableRef = useRef(null); // Reference for print functionality

  // Memoized filtered data
  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.approvalStatus === statusFilter;
      return matchesTitle && matchesStatus;
    });
  }, [jobList, filter, statusFilter]);

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 12px; font-family: Arial, sans-serif; }
            th { background-color: #f4f6f8; color: #333; font-weight: 600; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            tr:hover { background-color: #f1f1f1; }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; font-family: Arial, sans-serif;">Job Approval Status</h1>
          <div>${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mt-8 mb-4 mx-auto w-full p-6">
      {/* Header and Search */}{" "}
      {/* <div>
        <p className="text-xl"> Total{jobList.length} Jobs</p>
      </div> */}
      <div className="flex flex-wrap gap-6 items-center mb-6">
        {/* Search Input */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by Job Title..."
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="PENDING">Pending</option>
          </select>
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
      {/* Jobs Table */}
      <div
        ref={tableRef}
        className="overflow-x-auto w-full rounded-xl border border-gray-300 shadow-lg"
      >
        <Table className="min-w-full table-auto border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700">
              <TableHead className="p-4 text-left">Job Title</TableHead>
              <TableHead className="p-4 text-left">Company</TableHead>
              <TableHead className="p-4 text-left">Posted Date</TableHead>
              <TableHead className="p-4 text-left">Status</TableHead>
              <TableHead className="p-4 text-left">Salary</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center p-6 text-gray-500"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <TableCell className="p-4">
                    <Link
                      href={`/profile/jobsdata/${job.id}/`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {job.title}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4">{job.employer?.name}</TableCell>
                  <TableCell className="p-4">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="p-4">{job.approvalStatus}</TableCell>
                  <TableCell className="p-4">
                    {job.salaryMin && job.salaryMax
                      ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
                      : job.salaryNegotiable
                      ? "Negotiable"
                      : "Not disclosed"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobApprovalStatusClient;
