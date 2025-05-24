import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RFPPreview from '@/components/RFPPreview';

export default function PreviewPage() {
  const router = useRouter();
  const [rfpData, setRfpData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    let data = null;

    const fromQuery = router.query.rfp;
    if (fromQuery) {
      try {
        data = JSON.parse(fromQuery);
      } catch {
        data = null;
      }
    } else if (router.state && router.state.rfpData) {
      data = router.state.rfpData;
    }

    setRfpData(data);
  }, [router]);

  return (
    <>
      <Head>
        <title>معاينة العرض</title>
      </Head>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-start" dir="rtl">
        {rfpData ? (
          <RFPPreview data={rfpData} />
        ) : (
          <p className="text-gray-600 mt-10">لا توجد بيانات لعرض الوثيقة.</p>
        )}
      </div>
    </>
  );
}
