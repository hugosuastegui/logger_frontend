import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, InputNumber } from "antd";
import MY_SERVICE from "../services/index";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const { createPoi } = MY_SERVICE;
const { Option } = Select;

const styles = {
  width: 15,
  height: 15,
  backgroundColor: "red",
  borderRadius: "50%",
};

const mapboxToken =
  "pk.eyJ1IjoiaHVnb3N1YXN0ZWd1aSIsImEiOiJja2VrdjJiN3UwZXIwMzFxeHgzYzI4aDY3In0.evgV3HHHH1Gf-uplaJyOow";

function NewPoi({ history }) {
  const [weekdays, setweekdays] = useState([]);
  const [form] = Form.useForm();
  const [lng, setLng] = useState(-100);
  const [lat, setLat] = useState(20);
  const [viewport, setViewport] = useState({
    longitude: lng,
    latitude: lat,
    width: "75vw",
    height: "40vh",
    zoom: 5,
  });

  useEffect(() => {
    function setPos() {
      setLat(viewport.latitude);
      setLng(viewport.longitude);
    }

    // onDragEnd(e);
    setPos();
  }, [viewport]);

  const addWeekdays = (value) => {
    setweekdays([...weekdays, value]);
  };

  async function newPoi(values) {
    values.longitude = lng;
    values.latitude = lat;
    await createPoi(values);
    history.push("/pois");
  }

  return (
    <div>
      <h2>New Poi</h2>
      <Form layout="vertical" name="basic" form={form} onFinish={newPoi}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Check-In Time" name="checkinTime">
          <input type="time" name="checkinTime" />
        </Form.Item>
        <Form.Item label="Tolerance (minutes)" name="tolerance">
          <InputNumber min="0" defaultValue="5" />
        </Form.Item>
        <Form.Item label="Weekdays" name="weekdays">
          <Select mode="multiple" name="weekdays" onChange={addWeekdays}>
            <Option key="1" value="Mon">
              Mon
            </Option>
            <Option key="2" value="Tue">
              Tue
            </Option>
            <Option key="3" value="Wed">
              Wed
            </Option>
            <Option key="4" value="Thu">
              Thu
            </Option>
            <Option key="5" value="Fri">
              Fri
            </Option>
            <Option key="6" value="Sat">
              Sat
            </Option>
            <Option key="7" value="Sun">
              Sun
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Longitude" name="longitude">
          <Input value={lng} placeholder={lng} />
        </Form.Item>
        <Form.Item label="Latitude" name="latitude">
          <Input value={lat} placeholder={lat} />
        </Form.Item>
        <br />
        <ReactMapGL
          mapboxApiAccessToken={mapboxToken}
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <Marker latitude={lat} longitude={lng}>
            <center style={styles}></center>
          </Marker>
        </ReactMapGL>
        <br />
        <br />
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <br />
    </div>
  );
}

export default NewPoi;
