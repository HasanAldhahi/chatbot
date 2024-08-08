export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle the start transcription logic here
      res.status(200).json({ message: 'Transcription started' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }