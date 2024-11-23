import React from 'react'
import EmployerStatusClient from '../../components/employerstatusclient'
import { db } from '@/lib/db'

const EmpPortalToChange = async () => {
  // Fetching employer data and sorting by 'createdAt' (or your date field)
  const employerdata = await db.Employer.findMany({
    orderBy: {
      createdAt: 'desc', // Make sure to use the correct field name
    },
  })

  return (
    <>
      <EmployerStatusClient employerdata={employerdata} />
    </>
  )
}

export default EmpPortalToChange
