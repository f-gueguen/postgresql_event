import { Notification, Client } from "pg";

const selectLogEvent = async (data: Notification, client: Client) => {
  const payload = JSON.parse(data.payload);
  console.log(payload);
  const {
    rows,
  } = await client.query("SELECT * FROM log_event WHERE id = $1", [
    payload,
  ]);
  console.log(rows);
};
const deleteReturningEvent = async (data: Notification, client: Client) => {
  const payload = JSON.parse(data.payload);
  const {
    rows,
  } = await client.query("DELETE FROM log_event WHERE id = $1 RETURNING *", [
    payload,
  ]);
  console.log(rows[0]);
};

const rowPayload = async (data: Notification, _client: Client) => {
  const payload = JSON.parse(data.payload);
  console.log(payload);
};

export const eventHandlers = {
  // row_payload: rowPayload,
  // row_log_event_id: selectLogEvent,
  statement_log_event_id: deleteReturningEvent,
};
