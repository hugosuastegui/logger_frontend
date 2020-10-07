import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import MY_SERVICE from "../services/index";
import { Redirect, Link } from "react-router-dom";
import { Card, Tag, Button } from "antd";
import QRCode from "qrcode.react";

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://ironlogger.herokuapp.com")
  : (baseURL = "http://localhost:3000");

const { getUserInfo } = MY_SERVICE;

function ShowPoIs() {
  const [pois, setpois] = useState([]);
  const { user } = useContext(MyContext);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { employerPoIs },
        },
      } = await getUserInfo();
      setpois(employerPoIs);
    }
    fetchInfo();
  }, []);

  return user ? (
    user.role === "employer" ? (
      <div>
        <h1>Points of Interest</h1>
        {pois.map((poi, ind) => (
          <Card
            key={ind}
            title={poi.name}
            bordered={true}
            style={{ marginTop: 16 }}
            extra={<Link to={`/pois/${poi._id}`}>More</Link>}
          >
            <p>{poi.location}</p>
            <Link to={`/pois/${poi._id}/qrcode`}>
              <QRCode value={`${baseURL}/logs/${poi._id}`} renderAs="svg" />
            </Link>
            <p>Weekdays:</p>
            {poi.weekdays.map((day, ind) => (
              <Tag key={ind}>{day}</Tag>
            ))}
          </Card>
        ))}
        <br />
        <br />
        <Button>
          <Link to="/pois/new">Create Point of Interest</Link>
        </Button>
      </div>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <h1>Loading...</h1>
  );
}

export default ShowPoIs;
