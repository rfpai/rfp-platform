import dynamic from 'next/dynamic';

const RFPAssistant = dynamic(() => import('../components/RFPAssistant'), { ssr: false });

export default function AssistantPage() {
  return <RFPAssistant />;
}