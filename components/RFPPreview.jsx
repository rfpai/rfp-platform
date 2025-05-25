"use client";
import React from "react";
import PropTypes from "prop-types";

export default function RFPPreview({ data = null, contentRef }) {
  if (!data) {
    return (
      <p className="text-center text-gray-600 mt-10">لا توجد بيانات لعرضها</p>
    );
  }
  const Section = ({ title, content }) => (
    <section className="space-y-2 pb-4 border-b last:border-b-0">
      <h2 className="font-semibold text-blue-700">{title}</h2>
      {content ? (
        <p className="whitespace-pre-line text-gray-800">{content}</p>
      ) : (
        <p className="text-gray-500 italic">لا توجد بيانات</p>
      )}
    </section>
  );

  Section.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div
        ref={contentRef}
        className="bg-white p-6 rounded-2xl shadow-md space-y-6 print:p-0 print:shadow-none print:bg-white"
        dir="rtl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          وثيقة طلب تقديم عروض (RFP)
        </h1>

        <Section title="١. معلومات المشروع" content={data.projectInfo} />
        <Section title="٢. خلفية عن الجهة" content={data.background} />
        <Section title="٣. وصف المشروع" content={data.projectDescription} />
        <Section title="٤. نطاق العمل" content={data.scopeOfWork} />
        <Section title="٥. الجمهور المستهدف" content={data.targetAudience} />
        <Section title="٦. المخرجات المتوقعة" content={data.deliverables} />
        <Section title="٧. الجدول الزمني" content={data.timeline} />
        <Section title="٨. الميزانية" content={data.budget} />
        <Section title="٩. معايير التقييم" content={data.evaluationCriteria} />
        <Section
          title="١٠. متطلبات تقديم العرض"
          content={data.submissionRequirements}
        />
        <Section
          title="١١. الأسئلة والاستفسارات"
          content={data.questions}
        />
        <Section title="١٢. الملاحق والمرفقات" content={data.attachments} />
      </div>
    </div>
  );
}
