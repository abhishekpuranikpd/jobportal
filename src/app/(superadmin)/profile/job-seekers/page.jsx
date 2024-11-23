import React from 'react'
import JobseekerTable from '../../components/alljobseekers'
import { db } from '@/lib/db'

const Jobseekertablepage =async () => {
    const userdata = await db.Jobseeker.findMany({})
  return (
    <div>
        <JobseekerTable userdata={userdata}/>
    </div>
  )
}

export default Jobseekertablepage