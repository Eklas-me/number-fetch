const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

app.get("/getMobile", async (req, res) => {
  try {
    const response = await axios.get("https://api.cowboymsg.com/getMobile", {
      params: {
        name: "anikspecial",
        ApiKey: "SkhrTFhEdENTV1VrbUx1dCsrbFQxZz09",
        pid: "8992",
        num: "1",
        serial: "2 with HttpClient",
      },
    });
    console.log("getMobile response:", response.data); // Log the response data for debugging
    res.json(response.data);
  } catch (error) {
    console.error("Error in getMobile:", error); // Log the error for debugging
    res.status(500).json({ error: error.toString() });
  }
});

app.get("/getMsg", async (req, res) => {
  try {
    const response = await axios.get("https://api.cowboymsg.com/getMsg", {
      params: {
        name: "anikspecial",
        ApiKey: "SkhrTFhEdENTV1VrbUx1dCsrbFQxZz09",
        pn: req.query.pn,
        pid: "8992",
        serial: "2 with HttpClient",
      },
    });
    console.log("getMsg response:", response.data); // Log the response data for debugging
    res.json(response.data);
  } catch (error) {
    console.error("Error in getMsg:", error); // Log the error for debugging
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(
    `Proxy server listening at number-fetch-production.up.railway.app`
  );
});
