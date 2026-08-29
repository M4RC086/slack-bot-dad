require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/dad-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/dad-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
    `Available Commands:
    /dad-ping - Check bot latency
    /dad-catfact - Get a cat fact`
  });
});

app.command("/dad-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});


app.command("/dad-i-am-bored", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    await respond({ text: `If you're bored ${response.data.activity.toLowerCase()}` });
  } catch (err) {
    await respond({ text: "Failed to fetch an activity." });
  }
});

app.command("/dad-fact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    await respond({ text: `Once I met Chuck Norris. ${response.data.value}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a fact." });
  }
});



(async () => {
  await app.start();
  console.log("bot is running!");
})();