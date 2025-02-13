const Qrcode = ({ qrCode }) => {
  console.log("qr " + qrCode);
  return (
    <div className="max-w-3xl mx-auto ">
      <img src={qrCode} alt="QRCode" />
    </div>
  );
};

export default Qrcode;
