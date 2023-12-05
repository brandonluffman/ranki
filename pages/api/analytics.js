// pages/api/analytics.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

export default async function handler(req, res) {
    // Path to your credentials JSON file
    const credentials = require('../../data/credentials.json');

    const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: credentials
    });

    // Replace with your Google Analytics 4 property ID
    const propertyId = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID;
    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
            metrics: [{ name: 'activeUsers' }],
            // Add additional parameters as needed
        });

        // Process and respond with the data
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching data from Google Analytics:', error);
        res.status(500).json({ error: error.message });
    }
}
