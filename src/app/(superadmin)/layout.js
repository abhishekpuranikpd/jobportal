import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Sidebar from "./components/supersidebar";
import Header from "./components/navbar";

export const metadata = {
  title: "Super Admin",
  description: "Peperk.in",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <>
      <div className="">
        <Header userData={userData} />
      </div>
      <div className="flex">
        <div className="pl-1 pt-40">
          <Sidebar />
        </div>
        <div className="lg:ml-[300px] mt-8 flex-1">{children}</div>
      </div>
    </>
  );
}
// import React from 'react';
// import { getCurrentUser } from '../../../lib/session';
// import { db } from '../../../lib/db';

// const ProfilePage = async () => {
//   const user = await getCurrentUser();

//   // Fetch Superadmin user data
//   const userData = await db.user.findUnique({
//     where: {
//       id: user.id,
//     },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//     },
//   });

//   // Set today's date start for filtering today's records
//   const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

//   // Fetch data metrics for Superadmin view
//   const [
//     totalJobs,
//     todayJobs,
//     approvedJobs,
//     rejectedJobs,
//     totalApplications,
//     rejectedApplications,
//     shortlistedApplications,
//     todayApplications,
//     todayApprovedJobs,
//     todayRejectedJobs
//   ] = await Promise.all([
//     db.job.count(),
//     db.job.count({
//       where: {
//         createdAt: {
//           gte: todayStart,
//         },
//       },
//     }),
//     db.job.count({
//       where: {
//         jobstatus: 'APPROVED',
//       },
//     }),
//     db.job.count({
//       where: {
//         jobstatus: 'REJECTED',
//       },
//     }),
//     db.application.count(),
//     db.application.count({
//       where: {
//         status: 'REJECTED',
//       },
//     }),
//     db.application.count({
//       where: {
//         status: 'SHORTLISTED',
//       },
//     }),
//     db.application.count({
//       where: {
//         appliedAt: {
//           gte: todayStart,
//         },
//       },
//     }),
//     db.job.count({
//       where: {
//         jobstatus: 'APPROVED',
//         createdAt: {
//           gte: todayStart,
//         },
//       },
//     }),
//     db.job.count({
//       where: {
//         jobstatus: 'REJECTED',
//         createdAt: {
//           gte: todayStart,
//         },
//       },
//     })
//   ]);

//   const employerJobData = await db.Employer.findMany({
//     select: {
//       id: true,
//       name: true,
//       jobs: {
//         select: {
//           id: true,
//           title: true,
//           application: {
//             select: {
//               status: true
//             }
//           }
//         }
//       }
//     }
//   });

//   const employerJobsWithCounts = employerJobData.map(employer => ({
//     employerName: employer.name,
//     jobs: employer.jobs.map(job => {
//       const appliedCount = job.application.length;
//       const shortlistedCount = job.application.filter(app => app.status === 'SHORTLISTED').length;
//       const rejectedCount = job.application.filter(app => app.status === 'REJECTED').length;
      
//       return {
//         jobTitle: job.title,
//         appliedCount,
//         shortlistedCount,
//         rejectedCount
//       };
//     })
//   }));

//   return (
//     <>
//       {/* Main Content */}
//       <div className="flex-grow p-4 md:p-8">
//         <div className="bg-white shadow rounded-lg p-4 md:p-6 mb-4 md:mb-6">
//           <h1 className="text-xl md:text-2xl font-semibold mb-4">Dashboard Overview</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//             {/* Metrics Sections... */}
//             {/* Your existing metric cards go here */}
//           </div>
//         </div>

//         {/* Employer Jobs Table */}
//         <div className="bg-white shadow rounded-lg p-4 md:p-6">
//           <h2 className="text-xl md:text-2xl font-semibold mb-4">Employer Job Statistics</h2>
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="p-2 text-left">Employer</th>
//                 <th className="p-2 text-left">Job Title</th>
//                 <th className="p-2 text-left">Applied Count</th>
//                 <th className="p-2 text-left">Shortlisted Count</th>
//                 <th className="p-2 text-left">Rejected Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employerJobsWithCounts.map((employer, index) => (
//                 employer.jobs.map((job) => (
//                   <tr key={`${employer.employerName}-${job.jobTitle}`}>
//                     <td className="p-2">{employer.employerName}</td>
//                     <td className="p-2">{job.jobTitle}</td>
//                     <td className="p-2">{job.appliedCount}</td>
//                     <td className="p-2">{job.shortlistedCount}</td>
//                     <td className="p-2">{job.rejectedCount}</td>
//                   </tr>
//                 ))
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;

