function Error({ statusCode }) {
  return (
    <p style={{ padding: 40 }}>
      {statusCode
        ? `حدث خطأ ${statusCode} في تحميل الصفحة.`
        : 'حدث خطأ في تحميل الصفحة.'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
