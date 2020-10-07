import React from "react";
import PrintPage from "../components/PrintPage";

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://ironlogger.herokuapp.com")
  : (baseURL = "http://localhost:3000");

function showQrCode({
  match: {
    params: { poiId },
  },
}) {
  return (
    <div>
      <PrintPage qrcode={`${baseURL}/logs/${poiId}`}></PrintPage>
    </div>
  );
}

export default showQrCode;
