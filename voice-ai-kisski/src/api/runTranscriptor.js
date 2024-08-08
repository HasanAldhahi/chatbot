import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { roomAddress, padId, accessKey, corrections } = req.body;

    const command = ['./fastwhisperr.py', roomAddress, '--verbose', '--pad_id', padId];
    if (accessKey) command.push('--accesskey', accessKey);
    if (corrections) command.push('--corrections', corrections);

    const process = spawn('python', command);

    // Store the process in a global variable or database for later access
    global.transcriptionProcess = process;

    res.status(200).json({ message: 'Transcription started' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}