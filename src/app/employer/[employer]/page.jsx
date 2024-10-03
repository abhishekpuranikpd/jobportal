import { db } from '@/lib/db';
import React from 'react'

const Employerpage = async ({params}) => {
   const companyid = params.employer
   const data = await db.Employer.findFirst({
    where: {
      id: companyid,
     },
  });

  return (
 <>
 <h1 className='pt-40'>{data.name}</h1>
 </>
  )
}

export default Employerpage