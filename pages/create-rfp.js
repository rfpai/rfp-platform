import React from 'react';
import CreateRFP from '@/components/CreateRFP';

export default function CreateRFPPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        إنشاء وثيقة طلب تقديم عروض (RFP)
      </h1>
      <CreateRFP />
    </div>
  );
}
