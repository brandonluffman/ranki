// pages/api/checkDomain.js
export default async function handler(req, res) {
    const { domain } = req.query;
  
    try {
      const formattedDomain = domain.startsWith('http') ? domain : 'https://' + domain;
      const response = await fetch(formattedDomain);
      if (response.status === 200) {
        res.status(200).json({ message: 'Domain is reachable' });
      } else {
        res.status(response.status).json({ error: 'Domain is not reachable' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
  