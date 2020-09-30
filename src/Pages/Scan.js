import React, { useState, useContext, useEffect } from "react";
import QrReader from "react-qr-reader";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import MY_SERVICE from "../services";

const { createLog } = MY_SERVICE;

function Scan() {
  const { user } = useContext(MyContext);
  const [result, setresult] = useState(null);
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  const [message, setmessage] = useState(null);

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setlat(latitude);
        setlong(longitude);
      },
      setmessage("Log Failed: Geolocation not allowed")
    );
    if (lat && long) {
      const values = { lat, long };
      //   await createLog(result);
    }
  }, [result]);

  const handleScan = async (data) => {
    console.log(data);
    setresult(data);
  };

  const handleError = async (err) => {
    setresult(err);
  };

  return !result ? (
    <div>
      <h2>Scan QR Code</h2>
      {/* <p>{message ? message : ""}</p> */}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </div>
  ) : (
    <h1>Scan Made</h1>
    // <Redirect to="/login" />
  );
}

export default Scan;
