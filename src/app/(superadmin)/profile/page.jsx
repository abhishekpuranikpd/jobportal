import React from 'react';
import { getCurrentUser } from '../../../lib/session';
import { db } from '../../../lib/db';
import { redirect } from 'next/navigation';
import Sidebar from '../components/supersidebar';
import Header from '../components/header';
import UserProfile from '../components/userproile';


const ProfilePage = async () => {
  const user = await getCurrentUser();

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const {id, name, email } = userData;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
   

      {/* Main content */}
      <div className="ml-64 flex-grow">

        <UserProfile user={user} name={name} email={email} />
      </div>
    </div>
  );
};

export default ProfilePage;
