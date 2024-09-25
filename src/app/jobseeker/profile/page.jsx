import React from 'react';
import { db } from '../../../lib/db';
import { redirect } from 'next/navigation';

import UserProfile from '../components/userproile';
import { getSession } from '@/lib/jobseekerauth';


const ProfilePage = async () => {
  const user = await getSession();

  if (!user) {
    redirect('/jobseeker/login');
  }




  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
   

      {/* Main content */}
      <div className="ml-64 flex-grow">

        <UserProfile user={user.id} name={user.name} email={user.email} />
      </div>
    </div>
  );
};

export default ProfilePage;
