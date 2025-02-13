require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT;

const connectToDB = async () => {
  try {
    await connectDB(
      `mongodb+srv://${encodeURIComponent(
        process.env.DB_USER
      )}:${encodeURIComponent(
        process.env.DB_PASS
      )}@cluster0.tihnn.mongodb.net/url-shortner?retryWrites=true&w=majority`
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("Error while connecting to DB:", error);
  }
};
connectToDB();

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log("server is running");
});
