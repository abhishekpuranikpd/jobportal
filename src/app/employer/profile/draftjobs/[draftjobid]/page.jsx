import React from 'react';
import DraftUpdate from '../../components/draftjobsclient';
import { db } from '@/lib/db';

const DraftSinglePage = async ({ params }) => {
  const id = params.draftjobid;

  const data = await db.DraftSavedJob.findFirst({
    where: { id }
  });

  return (
    <div className="mt-10">
      {data ? <DraftUpdate data={data} /> : <p>Job not found</p>}
    </div>
  );
};

export default DraftSinglePage;
