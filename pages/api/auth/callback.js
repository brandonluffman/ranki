// pages/api/auth/callback.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
  );

  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    // Save tokens in user session or database
    req.session.tokens = tokens; // Make sure you have session handling set up

    res.redirect('/test'); // Replace with your dashboard route
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
