import React, { useState, useContext, useEffect } from "react";
import QrReader from "react-qr-reader";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import MY_SERVICE from "../services";

const { createLog } = MY_SERVICE;

function Scan() {
  const { user } = useContext(MyContext);
  const [result, setresult] = useState(null);
  const [message, setmessage] = useState(null);

  useEffect(() => {
    if (result) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const values = { latitude, longitude };
          console.log("Attempt to create a log");
          await createLog(result, values);
        },
        setmessage("Geolocation permission is needed to get a valid log")
      );
    }
  }, [result]);

  const handleScan = async (data) => {
    console.log(data);
    setresult(data);
  };

  const handleError = async (err) => {
    setresult(err);
  };

  return user ? (
    user.collabValidated ? (
      !result ? (
        <div>
          <h2>Scan QR Code</h2>
          <p>{message ? message : ""}</p>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
          <p>{result}</p>
        </div>
      ) : (
        <>
          <h1 style={{ color: "green" }}>Scan Made</h1>
          <p>Please check geolocation permission is allowed</p>
          <Redirect to="/" />
        </>
      )
    ) : (
      <div>
        <h2>Scan QR Code</h2>
        <p>Only validated collabs can Scan</p>
      </div>
    )
  ) : (
    <Redirect to="/login" />
  );
}

export default Scan;
