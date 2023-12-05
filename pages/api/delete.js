import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      console.log(id);
      if (!id) {
        return res.status(400).json({ message: 'App ID is required' });
      }

      const filePath = path.resolve('./data/apps.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const apps = JSON.parse(data);

      // Find the index of the app to be deleted
      const appIndex = apps.findIndex(app => app.id === id);
      if (appIndex === -1) {
        return res.status(404).json({ message: 'App not found' });
      }

      // Remove the app from the array
      apps.splice(appIndex, 1);

      // Write the updated array back to the file
      fs.writeFileSync(filePath, JSON.stringify(apps, null, 2));

      res.status(200).json({ message: 'App deleted successfully' });
    } catch (error) {
      console.error('Error deleting app:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
