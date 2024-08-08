// pages/index.js
import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Transcribe-form');
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const [transcribeForm, setTranscribeForm] = useState({
    language: '',
    responseFormat: 'text',
    audioFile: null
  });

  const [bbbForm, setBbbForm] = useState({
    roomAddress: '',
    accessKey: '',
    corrections: ''
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setTranscribeForm(prev => ({ ...prev, audioFile: event.target.files[0] }));
  };

  const handleTranscribeFormChange = (e) => {
    const { name, value } = e.target;
    setTranscribeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBbbFormChange = (e) => {
    const { name, value } = e.target;
    setBbbForm(prev => ({ ...prev, [name]: value }));
  };

  const submitTranscribeForm = async (action) => {
    const formData = new FormData();
    formData.append('file', transcribeForm.audioFile);
    formData.append('language', transcribeForm.language);
    formData.append('response_format', transcribeForm.responseFormat);
    formData.append('modele', 'whisper-1');
    formData.append('model', 'whisper-1');

    try {
      const response = await axios.post(`http://141.5.107.197/v1/audio/${action}`, formData, {
        headers: {
          'inference-service': 'whisper-service'
        },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });
      setOutput(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred during the request.');
    }
  };

  const startTranscriptor = async () => {
    try {
      const response = await axios.post('/api/start-transcription', bbbForm);
      setOutput(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while starting the transcription.');
    }
  };

  const stopTranscriptor = async () => {
    try {
      const response = await axios.post('/api/stop-transcription');
      setOutput(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while stopping the transcription.');
    }
  };

  return (
    <div>
      <main>
        <header>
          <h1>Voice AI - KISSKI</h1>
        </header>
        <div className="tab-links">
          <button className="tab-link" onClick={() => setActiveTab('Transcribe-form')}>Transcribe</button>
          <button className="tab-link" onClick={() => setActiveTab('BBB-form')}>Other</button>
        </div>
        
        {/* Tab 1: Transcribe */}
        <form id="Transcribe-form" className={`tab ${activeTab === 'Transcribe-form' ? 'active' : ''}`}>
          <p>
            <select 
              value={transcribeForm.language} 
              onChange={handleTranscribeFormChange} 
              name="language" 
              id="language"
            >
              <option value="">Automatic language (slower)</option>
              <option value="en">English</option>
              <option value="af">Afrikaans</option>
              {/* Add all other language options here */}
            </select>
            <select 
              value={transcribeForm.responseFormat} 
              onChange={handleTranscribeFormChange}
              id="response_format" 
              name="responseFormat"
            >
              <option value="text">Normal text</option>
              <option value="srt">SRT</option>
              <option value="vtt">VTT</option>
            </select>
            <input 
              type="file"
              accept="audio/mp3, audio/mp4, audio/mpeg, audio/mpga, audio/m4a, audio/wav, audio/webm, video/mp4, video/mpeg, video/webm"
              id="audio-file" 
              name="file" 
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </p>
          <p>
            <button type="button" onClick={() => submitTranscribeForm('transcriptions')}>Transcribe in source language!</button>
            <button type="button" onClick={() => submitTranscribeForm('translations')}>Transcribe in english!</button>
          </p>
          <progress id="progress-bar" value={progress} max="100" />
        </form>

        <form id="BBB-form" className={`tab ${activeTab === 'BBB-form' ? 'active' : ''}`}>
          <p>
            <label htmlFor="room-address">Room Address (URL):</label>
            <input 
              type="text" 
              id="room-address" 
              name="roomAddress"
              value={bbbForm.roomAddress}
              onChange={handleBbbFormChange}
            />
          </p>
          <p>
            <label htmlFor="access-key">Access Key:</label>
            <input 
              type="text" 
              id="access-key" 
              name="accessKey"
              value={bbbForm.accessKey}
              onChange={handleBbbFormChange}
            />
          </p>
          <p>
            <label htmlFor="corrections">Words/terms that should be written correctly:</label>
            <input 
              type="text" 
              id="corrections" 
              name="corrections"
              value={bbbForm.corrections}
              onChange={handleBbbFormChange}
            />
          </p>
          <p>
            <button type="button" onClick={startTranscriptor}>Run Transcriptor</button>
            <button type="button" onClick={stopTranscriptor}>Stop Transcriptor</button>
          </p>
        </form>
        <div id="output">{output}</div>
      </main>
      <style jsx>{`
        body {
          background-color: #f0f0f0;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        header {
          background-color: #333;
          color: #f0f0f0;
        }
        .tab {
          display: none;
        }
        .tab.active {
          display: block;
        }
        /* Add any additional styles here */
      `}</style>
    </div>
  );
}