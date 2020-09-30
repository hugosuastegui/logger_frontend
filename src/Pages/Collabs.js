import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Card, Avatar, Button, Select } from "antd";
import MY_SERVICE from "../services/index";

const { getUserInfo, updateUser } = MY_SERVICE;

const { Meta } = Card;
const { Option } = Select;

function Collabs() {
  const { user } = useContext(MyContext);
  const [collaborators, setcollaborators] = useState([]);
  const [validatedCollabs, setvalidatedCollabs] = useState([]);
  const [unvalidatedCollabs, setunvalidatedCollabs] = useState([]);
  const [toggleValidated, settoggleValidated] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabs },
        },
      } = await getUserInfo();

      const unvalidated = collabs.filter((el) => !el.collabValidated);
      const validated = collabs.filter((el) => el.collabValidated);

      setcollaborators(collabs);
      setvalidatedCollabs(validated);
      setunvalidatedCollabs(unvalidated);
    }
    fetchInfo();
  }, []);

  async function removeCollab(id) {
    let values = { collabValidated: false };
    await updateUser(id, values);
    const {
      data: {
        user: { collabs },
      },
    } = await getUserInfo();
    const unvalidated = collabs.filter((el) => !el.collabValidated);
    const validated = collabs.filter((el) => el.collabValidated);
    setunvalidatedCollabs(unvalidated);
    setvalidatedCollabs(validated);
  }

  async function acceptCollab(id) {
    let values = { collabValidated: true };
    await updateUser(id, values);
    const {
      data: {
        user: { collabs },
      },
    } = await getUserInfo();
    setcollaborators(collabs);
    const unvalidated = collabs.filter((el) => !el.collabValidated);
    const validated = collabs.filter((el) => el.collabValidated);
    setunvalidatedCollabs(unvalidated);
    setvalidatedCollabs(validated);
  }

  async function denyCollab(id) {
    let values = { collabValidated: false, employers: [] };
    await updateUser(id, values);
    let newCollabs = collaborators.filter((el) => el._id !== id);
    const {
      data: {
        user: { collabs },
      },
    } = await updateUser(user._id, { collabs: newCollabs });
    setcollaborators(collabs);
    const unvalidated = collabs.filter((el) => !el.collabValidated);
    const validated = collabs.filter((el) => el.collabValidated);
    setunvalidatedCollabs(unvalidated);
    setvalidatedCollabs(validated);
  }

  async function toggle(value) {
    settoggleValidated(value);
  }

  return collaborators && validatedCollabs && unvalidatedCollabs ? (
    <div>
      <h2>Show Collabs</h2>
      <Select defaultValue={true} onChange={(e) => toggle(e)}>
        <Option value={true}>Show Valid Collabs</Option>
        <Option value={false}>Show Pending Requests</Option>
      </Select>
      <br />
      <br />
      {toggleValidated ? (
        <div>
          <h1>Validated Collabs</h1>
          {validatedCollabs.map((el, ind) => (
            <Card
              actions={[
                <Button type="danger" onClick={() => removeCollab(el._id)}>
                  Remove Collab
                </Button>,
              ]}
              style={{ marginTop: 16 }}
              key={ind}
            >
              <Meta
                avatar={<Avatar src={el.photo} />}
                title={el.name}
                description={el.email}
              />
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h1>Collabs Requests</h1>
          {unvalidatedCollabs.map((el, ind) => (
            <Card
              actions={[
                <Button type="primary" onClick={() => acceptCollab(el._id)}>
                  Accept
                </Button>,
                <Button type="danger" onClick={() => denyCollab(el._id)}>
                  Deny
                </Button>,
              ]}
              style={{ marginTop: 16 }}
              key={ind}
            >
              <Meta
                avatar={<Avatar src={el.photo} />}
                title={el.name}
                description={el.email}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div>
      <h2>No Collabs To Show</h2>
      <p>Share code to add</p>
      <strong>{user._id}</strong>
    </div>
  );
}

export default Collabs;
