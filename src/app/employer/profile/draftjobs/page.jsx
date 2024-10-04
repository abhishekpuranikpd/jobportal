import React from 'react'
import DraftJobs from '../components/draftjobs'
import { db } from '@/lib/db'

const page =async () => {
  const data = await db.DraftSavedJob.findMany({

include :{
  employer :true
}

  })
  return (
<><DraftJobs jobs={data}/></>
  )
}

export default page