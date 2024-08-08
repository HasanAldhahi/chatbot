export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle the stop transcription logic here
    res.status(200).json({ message: "Transcription stopped" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
