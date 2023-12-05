// analyticsClient.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const client = new BetaAnalyticsDataClient({ keyFilename: '../data/credentials.json' });

module.exports = client;
