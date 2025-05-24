import React from 'react';
import Head from 'next/head';
import CreateRFP from '@/components/CreateRFP';

export default function CreateRFPPage() {
  return (
    <>
      <Head>
        <title>إنشاء وثيقة طلب تقديم عروض</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
        <CreateRFP />
      </div>
    </>
  );
}
