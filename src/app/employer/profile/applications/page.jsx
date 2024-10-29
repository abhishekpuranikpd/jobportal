import { db } from '@/lib/db'
import { getSession } from '@/lib/jobseekerauth'
import React from 'react'

const page = async() => {
    const session = await  getSession()
    const employermail = session.email 
    

    const data = await db.Application.findMany({
   
    })
    console.log(data);
    
  return (
    <div>page</div>
  )
}

export default page