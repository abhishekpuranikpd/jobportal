import RegisterComponent from '@/app/auth/components/compo'
import React from 'react'
import SubadminTable from '../components/adminslist'
import { db } from '@/lib/db'

const page = async() => {
  const subadminData = await db.User.findMany({})
  return (
    <div>
      
      <SubadminTable subadminData={subadminData}/>
   </div>
  )
}

export default page