const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};

const handleGetAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
