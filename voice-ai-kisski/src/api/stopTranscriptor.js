export default async function handler(req, res) {
    if (req.method === 'POST') {
      if (global.transcriptionProcess) {
        global.transcriptionProcess.kill();
        global.transcriptionProcess = null;
        res.status(200).json({ message: 'Transcription stopped' });
      } else {
        res.status(404).json({ message: 'No running transcription process found' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }