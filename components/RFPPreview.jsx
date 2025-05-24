import React, { useRef } from "react";

export default function RFPPreview({ rfpData = {} }) {
  const containerRef = useRef(null);

  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    if (containerRef.current) {
      html2pdf()
        .set({ filename: "RFP_Document.pdf", html2canvas: { scale: 2 } })
        .from(containerRef.current)
        .save();
    }
  };

  const sections = [
    { title: "Project Information", key: "projectInformation" },
    { title: "Background", key: "background" },
    { title: "Project Description", key: "projectDescription" },
    { title: "Scope of Work", key: "scopeOfWork" },
    { title: "Target Audience", key: "targetAudience" },
    { title: "Deliverables", key: "deliverables" },
    { title: "Timeline", key: "timeline" },
    { title: "Budget", key: "budget" },
    { title: "Evaluation Criteria", key: "evaluationCriteria" },
    { title: "Submission Requirements", key: "submissionRequirements" },
    { title: "Questions and Inquiries", key: "questionsAndInquiries" },
    { title: "Attachments", key: "attachments" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen" ref={containerRef}>
      <div className="max-w-3xl mx-auto space-y-6">
        {sections.map(({ title, key }) => (
          <div key={key} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="text-gray-700 whitespace-pre-wrap">{rfpData[key]}</div>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

