import React from 'react'
import { db } from '@/lib/db'
import EmployerTable from '../../components/allemployers'

const Jobseekertablepage =async () => {
    const userdata = await db.Employer.findMany({})
  return (
    <div>
  <EmployerTable userdata={userdata}/>
    </div>
  )
}

export default Jobseekertablepage