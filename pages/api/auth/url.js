// // pages/api/auth/url.js
// import { google } from 'googleapis';

// export default function handler(req, res) {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
//   );

//   const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/webmasters.readonly']
//   });

//   res.redirect(url);
// }
