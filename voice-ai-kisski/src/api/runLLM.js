import { exec } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { padId } = req.body;

    exec(`python ./llm2.py --pad_id ${padId}`, (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ output: stdout });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}