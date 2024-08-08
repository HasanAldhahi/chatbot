"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function BBBTranscriptor() {
  const [roomAddress, setRoomAddress] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [corrections, setCorrections] = useState("");
  const [padId, setPadId] = useState(null);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runTranscriptor = async () => {
    if (!roomAddress) {
      setOutput("Room Address is required!");
      return;
    }

    try {
      setIsRunning(true);
      // Create a new pad
      const createPadResponse = await axios.post("../api/createPad");
      const newPadId = createPadResponse.data.padId;
      setPadId(newPadId);

      // Start the transcription process
      const transcriptionResponse = await axios.post("../api/runTranscriptor", {
        roomAddress,
        padId: newPadId,
        accessKey,
        corrections,
      });

      setOutput(
        "Transcription started. You can stop transcription by clicking the stop button, otherwise it will stop automatically in 30 minutes."
      );
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const stopTranscriptor = async () => {
    try {
      await axios.post("../api/stopTranscriptor");
      setIsRunning(false);
      setOutput("Transcription stopped.");

      // Run LLM
      const llmResponse = await axios.post("../api/runLLM", { padId });
      setOutput((prev) => `${prev}\n\nLLM Output:\n${llmResponse.data.output}`);
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BBB Room Voice-Transcriptor</h1>
      <p className="mb-4">
        Fill in the details below and click <strong>Run Transcriptor</strong>.
        Max limit time is set to 30 minutes. By stopping the transcriptor
        properly, you will also see the summary of the transcription at the
        bottom of your pad.
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Room Address (URL)"
          value={roomAddress}
          onChange={(e) => setRoomAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Access Key (leave empty if none)"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Words/terms that should be written correctly (optional)"
          value={corrections}
          onChange={(e) => setCorrections(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={runTranscriptor}
          disabled={isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Run Transcriptor
        </button>
        <button
          onClick={stopTranscriptor}
          disabled={!isRunning}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Stop Transcriptor
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}
