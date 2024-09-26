import React from 'react';
import { db } from '../../../lib/db';
import { redirect } from 'next/navigation';

import UserProfile from '../components/userproile';
import { getSession } from '@/lib/jobseekerauth';

const ProfilePage = async () => {
  const user = await getSession();


  if (!user) {

    redirect('/employer/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">


      {/* Main content */}
      <div className="ml-64 flex-grow">

        {user ? (
          <UserProfile user={user.id} name={user.name} email={user.email} />
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
