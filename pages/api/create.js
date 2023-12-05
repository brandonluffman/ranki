import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const newApp = {
            id: uuidv4(), // Generate a unique ID
            ...req.body
          };
      // Ensure newApp contains the necessary fields
      if (!newApp.name || !newApp.description) {
        return res.status(400).json({ error: 'Missing app name or description' });
      }

      const filePath = path.resolve('./data/apps.json');
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

      data.push(newApp);

      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      res.status(200).json(newApp);
      res.status(200).json({ message: 'App created successfully' });
    } catch (error) {
      console.error('Error creating app:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}