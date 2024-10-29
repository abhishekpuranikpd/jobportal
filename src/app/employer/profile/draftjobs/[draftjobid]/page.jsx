import React from 'react';
import DraftUpdate from '../../components/draftjobsclient';
import { db } from '@/lib/db';
import JobPostingForm from '../../components/draftjobsclient';

const DraftSinglePage = async ({ params }) => {
  const id = params.draftjobid;

  const data = await db.DraftSavedJob.findFirst({
    where: { id }
  });

  return (
    <div className="mt-10">
     <JobPostingForm fetchdata={data} /> 
    </div>
  );
};

export default DraftSinglePage;
