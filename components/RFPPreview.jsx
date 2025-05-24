import React from "react";
import PropTypes from "prop-types";

export default function RFPPreview({ data }) {
  const downloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const Section = ({ title, content }) => (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="whitespace-pre-line text-gray-700">{content}</p>
    </section>
  );

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

  return (
    <div className="bg-white p-6 shadow rounded space-y-6 print:p-0 print:shadow-none print:bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">طلب تقديم عرض تسويقي</h1>
      <Section title="معلومات المشروع" content={data.projectInfo} />
      <Section title="الخلفية" content={data.background} />
      <Section title="وصف المشروع" content={data.projectDescription} />
      <Section title="نطاق العمل" content={data.scopeOfWork} />
      <Section title="الجمهور المستهدف" content={data.targetAudience} />
      <Section title="المخرجات المتوقعة" content={data.deliverables} />
      <Section title="الجدول الزمني" content={data.timeline} />
      <Section title="الميزانية" content={data.budget} />
      <Section title="معايير التقييم" content={data.evaluationCriteria} />
      <Section title="متطلبات التقديم" content={data.submissionRequirements} />
      <Section title="الاستفسارات" content={data.questions} />
      <Section title="المرفقات" content={data.attachments} />
      <div className="text-center print:hidden">
        <button onClick={downloadPdf} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          تحميل PDF
        </button>
      </div>
    </div>
  );
}

RFPPreview.propTypes = {
  data: PropTypes.shape({
    projectInfo: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    scopeOfWork: PropTypes.string.isRequired,
    targetAudience: PropTypes.string.isRequired,
    deliverables: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    evaluationCriteria: PropTypes.string.isRequired,
    submissionRequirements: PropTypes.string.isRequired,
    questions: PropTypes.string.isRequired,
    attachments: PropTypes.string.isRequired,
  }).isRequired,
};
