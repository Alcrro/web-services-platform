const InvoiceTitle = () => {
  return (
    <div>
      <h1>Factura Service</h1>
      <p>{new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default InvoiceTitle;
