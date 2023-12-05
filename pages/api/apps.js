// pages/api/apps.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filePath = path.resolve('./data/apps.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const apps = JSON.parse(data);
      res.status(200).json(apps);
    } catch (error) {
      console.error('Error reading apps file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
