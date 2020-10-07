import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button, TimePicker, InputNumber } from "antd";
import MY_SERVICE from "../services/index";

const { getPoi, updatePoi, deletePoi } = MY_SERVICE;
const { Option } = Select;

function PoiDetail({
  match: {
    params: { poiId },
  },
  history,
}) {
  const [poi, setpoi] = useState(null);
  const [weekdays, setweekdays] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchPoi() {
      const {
        data: { poi },
      } = await getPoi(poiId);
      setpoi(poi);
    }

    fetchPoi();
  }, [poiId]);

  const addWeekdays = (value) => {
    setweekdays([...weekdays, value]);
  };

  async function editPoi(values) {
    await updatePoi(poi._id, values);
    history.push("/pois");
  }

  async function removePoi() {
    await deletePoi(poi._id);
    history.push("/pois");
  }

  return poi ? (
    <div>
      <h2>{poi.name}</h2>
      <Form layout="vertical" name="basic" form={form} onFinish={editPoi}>
        <Form.Item label="Name" name="name">
          <Input placeholder={poi.name} />
        </Form.Item>
        <Form.Item label="Longitude" name="location">
          <Input placeholder={poi.longitude} />
        </Form.Item>
        <Form.Item label="Latitude" name="location">
          <Input placeholder={poi.latitude} />
        </Form.Item>
        <Form.Item label="Check-In Time" name="checkinTime">
          <TimePicker format="HH:mm" minuteStep={5} />
        </Form.Item>
        <Form.Item label="Tolerance (minutes)" name="tolerance">
          <InputNumber min="0" initialValues="5" placeholder={poi.tolerance} />
        </Form.Item>
        <Form.Item label="Weekdays" name="weekdays">
          <Select
            mode="multiple"
            placeholder="Weekdays"
            name="weekdays"
            onChange={addWeekdays}
          >
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <br />
      <Button type="danger" onClick={() => removePoi()}>
        Delete Point of Interest
      </Button>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default PoiDetail;
