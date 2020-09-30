import React, { useEffect, useRef, useState } from "react";
import { Form, Select, Input, Button, TimePicker, InputNumber } from "antd";
import MY_SERVICE from "../services/index";
import mapboxgl from "mapbox-gl";

const { createPoi } = MY_SERVICE;
const { Option } = Select;

const styles = {
  width: "100%",
  height: "40vh",
  display: "block",
};

function NewPoi({ history }) {
  const [weekdays, setweekdays] = useState([]);
  const [form] = Form.useForm();
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaHVnb3N1YXN0ZWd1aSIsImEiOiJja2VrdjJiN3UwZXIwMzFxeHgzYzI4aDY3In0.evgV3HHHH1Gf-uplaJyOow";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      map.on("move", () => {
        // setMap({
        //   lng: map.getCenter().lng.toFixed(4),
        //   lat: map.getCenter().lat.toFixed(4),
        //   zoom: map.getZoom().toFixed(2),
        // });
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setMap({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: 5,
        });
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  const addWeekdays = (value) => {
    setweekdays([...weekdays, value]);
  };

  async function newPoi(values) {
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
          <TimePicker format="HH:mm" minuteStep={5} />
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
        <Form.Item label="Location" name="location">
          <Input placeholder={`Longitude: ${lng}, Latitude: ${lat}`} />
        </Form.Item>
        <div ref={(el) => (mapContainer.current = el)} style={styles} />
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
