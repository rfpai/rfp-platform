import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RFPPreview from "@/components/RFPPreview";

export default function PreviewPage() {
  const router = useRouter();
  const [rfpData, setRfpData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    let data = null;

    // أولاً: جلب البيانات من query إذا كانت موجودة
    if (router.query.rfp) {
      try {
        data = JSON.parse(router.query.rfp);
        setRfpData(data);
        localStorage.setItem("rfpData", JSON.stringify(data));
      } catch {
        // إذا فشل التحليل يتم تجاهله
      }
    } else {
      // ثانيًا: محاولة تحميلها من localStorage
      const saved = localStorage.getItem("rfpData");
      if (saved) {
        try {
          data = JSON.parse(saved);
          setRfpData(data);
        } catch {
          // تجاهل في حال فشل التحليل
        }
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <Head>
        <title>معاينة وثيقة RFP</title>
      </Head>

      {rfpData ? (
        <RFPPreview data={rfpData} />
      ) : (
        <div className="text-center text-gray-600 mt-20">
          لا توجد بيانات لعرض الوثيقة.
        </div>
      )}
    </div>
  );
}
