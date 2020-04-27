import { Client, Notification } from "pg";
import { eventHandlers } from "./handlers";

const client = new Client({
  user: "bkk",
  database: "bkk",
  password: "bkk",
  host: "localhost",
});

const run = async () => {
  await client.connect();
  await Promise.all(
    Object.keys(eventHandlers).map(
      key => {
        console.log(`listen to event ${key}`);
        return client.query(`LISTEN ${key}`);
      }));

  await client.on("notification", async (data: Notification) => {
    const { channel } = data;

    if (eventHandlers[channel]) {
      console.log(`Event ${channel}`)
      await eventHandlers[channel](data, client);
    }
  });
};
run();
