import { db } from '@/lib/db';
import Link from 'next/link';
import React from 'react'


async function getcompanieslist() {
    const data = await db.Employer.findMany({
    });
    return data;
  }
  
const AllCompaniesPage = async () => {
    const posts = await getcompanieslist();

  return (
<>
<div className="space-y-10">
   
      <div className=" min-h-screen">
        {/* <Navbar /> */}
        <div className="container mx-auto">
          {posts.map((item) => (
            <section className="py-8" key={item.id}>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                  <h1 className="text-1xl font-bold text-black mb-6">
                    {item.name}
                  </h1>
                 
                  <div className="flex justify-between items-center">
                    <h2 className="text-indigo-500 text-xs font-medium tracking-widest mb-4">
                      {item.email}
                    </h2>
                    <Link
                      href={`/employer/${item.id}`}
                      className="text-indigo-500 hover:underline"
                    >
                     View More
                    </Link>
                  </div>
                  <br />
                  {/* <span className="text-gray-900">
                    Author: {post.user.name}
                  </span> */}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
</>
  )
}

export default AllCompaniesPage