const ServiceSummary = ({
  tech,
  hosting,
  domain,
}: {
  tech: string;
  hosting: string;
  domain: string;
}) => {
  return (
    <>
      <p>
        <strong>What you get:</strong> {tech}
      </p>
      <p>
        <strong>Hosting:</strong> {hosting}
      </p>
      <p>
        <strong>Domain:</strong> {domain}
      </p>
    </>
  );
};

export default ServiceSummary;
