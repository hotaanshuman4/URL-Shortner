const shortid =require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    const shortId = shortid.generate();
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    }); 
    return res.render("home",{
        shortId:shortId,
    });
}

async function handleGetAnalytics(req, res) {
    shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}
module.exports = { handleGenerateShortUrl, handleGetAnalytics };