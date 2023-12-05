// pages/api/singleapp.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const { slug } = req.query; // or use slug if you're using slugs to identify apps
  
        const filePath = path.resolve('./data/apps.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const apps = JSON.parse(data);
  
        const app = apps.find(app => app.id === slug); // Replace 'id' with 'slug' if necessary
        console.log(app)
        if (!app) {
          return res.status(404).json({ message: 'App not found' });
        }
  
        res.status(200).json(app);
      } catch (error) {
        console.error('Error reading apps file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }