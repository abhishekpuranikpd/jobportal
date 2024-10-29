"use client";
import React, { useState, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ApplicantsListClient = ({ applicantsData }) => {
  const pageSize = 10;
  const router = useRouter();
  const [applicants, setApplicants] = useState(applicantsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showRecent, setShowRecent] = useState(false); // New state for recent filter

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Function to update the status of an application
  const updateStatus = async (id, action) => {
    try {
      const response = await fetch(`/api/jobs/apply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const updatedApplicant = await response.json();
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.id === id
              ? { ...applicant, status: updatedApplicant.status }
              : applicant
          )
        );
      } else {
        console.error("Failed to update status:", await response.json());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Memoized filtered applicants
  const filteredApplicants = useMemo(() => {
    return applicants
      .filter((applicant) =>
        applicant.jobseeker.fullName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      )
      .filter((applicant) =>
        statusFilter ? applicant.status === statusFilter : true
      )
      .sort((a, b) => {
        if (showRecent) {
          return new Date(b.appliedAt) - new Date(a.appliedAt); // Sort by appliedAt descending
        }
        return 0; // If not filtering by recent, retain original order
      });
  }, [applicants, debouncedSearchTerm, statusFilter, showRecent]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <div>Application ID</div>,
        cell: ({ row }) => (
          <div className="text-gray-500">{row.getValue("id")}</div>
        ),
      },
      {
        accessorKey: "jobseeker",
        header: () => <div>Jobseeker Name</div>,
        cell: ({ row }) => {
          const jobseeker = row.getValue("jobseeker");
          return (
            <div
              onClick={() =>
                router.push(`/employer/profile/jobseekers/${jobseeker.id}`)
              }
              className="text-blue-500 cursor-pointer underline"
            >
              {jobseeker.fullName}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ row }) => (
          <div className="text-black">{row.getValue("status")}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
          const id = row.getValue("id");
          const status = row.getValue("status");
      
          return (
            <div className="space-x-2">
              {status === "SHORTLISTED" ? (
                <span className="text-green-500">Approved</span>
              ) : (
                <Button size="sm" className="border" onClick={() => updateStatus(id, "approve")}>
                  Approve
                </Button>
              )}
              {status === "REJECTED" ? (
                <span className="text-red-500">Rejected</span>
              ) : (
                <Button size="sm" className="border" onClick={() => updateStatus(id, "reject")}>
                  Reject
                </Button>
              )}
            </div>
          );
        },
      },
      
      {
        accessorKey: "appliedAt",
        header: () => <div>Applied At</div>,
        cell: ({ row }) => (
          <div>{new Date(row.getValue("appliedAt")).toLocaleDateString()}</div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: () => <div>Updated At</div>,
        cell: ({ row }) => (
          <div>{new Date(row.getValue("updatedAt")).toLocaleDateString()}</div>
        ),
      },
    ],
    [router]
  );

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data: filteredApplicants,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className="container font-poppins mx-auto p-4">
      <div className="justify-center text-center font-poppins pt-4">
        <h1 className="text-[20px] text-[#2b73ec] font-extrabold">
          Applicants List
        </h1>
        <p className="text-[#243460] text-[11px]">List of Job Applicants</p>
      </div>

      <div className="pt-4">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showRecent}
              onChange={(e) => setShowRecent(e.target.checked)}
              className="mr-2"
            />
            Show Most Recent
          </label>
        </div>
        <div className="overflow-x-auto container mx-auto bg-white p-4 rounded-[15px] shadow-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="border-r">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="border-r">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between py-4">
            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="rounded-full border-2 px-3 border-[#243460]">
                Previous
              </span>
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="rounded-full border-2 px-3 border-[#243460]">
                Next
              </span>
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsListClient;
