import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    console.log('Got to update.js')
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updatedApp = req.body;

      const filePath = path.resolve('./data/apps.json');
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

      const appIndex = data.findIndex(app => app.id === id);
      if (appIndex === -1) {
        return res.status(404).json({ message: 'App not found' });
      }

      data[appIndex] = { ...data[appIndex], ...updatedApp };
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      res.status(200).json(data[appIndex]);
    } catch (error) {
      console.error('Error updating app:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
