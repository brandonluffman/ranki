// import { google } from 'googleapis';

// export default async function handler(req, res) {
//     console.log('Made It')
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
//   );

//   const userTokens = req.session.tokens; // Assuming you're using sessions

//   if (userTokens) {
//     oauth2Client.setCredentials(userTokens);
//   } else {
//     return res.status(401).json({ error: 'Authentication tokens not found' });
//   }
//   const searchConsole = google.webmasters({
//     version: 'v3',
//     auth: oauth2Client
//   });

//   try {
//     const response = await searchConsole.sites.list();
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }