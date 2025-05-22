import Head from "next/head";
import RFPAssistant from "@/components/RFPAssistant";

export default function Home() {
  return (
    <>
      <Head>
        <title>منصة RFP الذكية</title>
      </Head>
      <main>
        <RFPAssistant />
      </main>
    </>
  );
}

