import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const apiKey = process.env.ETHERPAD_API_KEY;
      const baseUrl = process.env.ETHERPAD_BASE_URL;
      const padId = uuidv4();

      const response = await axios.post(`${baseUrl}/api/1.2.15/createPad?apikey=${apiKey}&padID=${padId}`);

      if (response.status === 200) {
        res.status(200).json({ padId, url: `${baseUrl}/p/${padId}` });
      } else {
        throw new Error('Failed to create pad');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}