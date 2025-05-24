import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RFPPreview from "@/components/RFPPreview";

export default function PreviewPage() {
  const router = useRouter();
  const [rfpData, setRfpData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    let data = null;
    if (router.query.rfp) {
      try {
        data = JSON.parse(router.query.rfp);
        setRfpData(data);
        localStorage.setItem("rfpData", JSON.stringify(data));
      } catch {
        // ignore invalid data
      }
    } else {
      const saved = localStorage.getItem("rfpData");
      if (saved) {
        try {
          data = JSON.parse(saved);
          setRfpData(data);
        } catch {
          // ignore invalid saved data
        }
      }
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>معاينة العرض</title>
      </Head>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        {rfpData ? (
          <RFPPreview data={rfpData} />
        ) : (
          <p dir="rtl" className="text-gray-700">
            لا توجد بيانات لعرضها.
          </p>
        )}
      </div>
    </>
  );
}
