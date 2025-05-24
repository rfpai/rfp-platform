import React from 'react';
import Head from 'next/head';
import RFPChatFlow from '@/components/RFPChatFlow';

export default function ChatFlowPage() {
  return (
    <>
      <Head>
        <title>RFP Chat Flow</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <RFPChatFlow />
      </div>
    </>
  );
}
