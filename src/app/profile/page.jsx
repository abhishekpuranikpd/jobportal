import React from 'react';
import { getCurrentUser } from '../../lib/session';
import { db } from '../../lib/db';
import { redirect } from 'next/navigation';

import Link from 'next/link';

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const { name, email } = userData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen fixed">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Super Admin Panel</h2>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Dashboard</span>
          </Link>
          <Link href="/jobs">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Job Listings</span>
          </Link>
          <Link href="/users">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Users</span>
          </Link>
          <Link href="/reports">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Reports</span>
          </Link>
          <Link href="/settings">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-grow">
   

        <section className="p-8 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-indigo-600 mb-4">
                User ID: {user.id}
              </h2>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
              <p className="text-gray-700 mb-6">{email}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
