// pages/index.js
"use client";
import React, { useState , useRef} from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Sun, Moon } from "lucide-react";
import BBBTranscriptor from "./BBBTranscriptor";

// Extend Tailwind config with custom colors
const customColors = {
  orange: "#FF8343",
  beige: "#F1DEC6",
  teal: "#179BAE",
  navy: "#4158A6",
};

export default function VoiceAIKISKI() {
  const router = useRouter();
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [activeTab, setActiveTab] = useState("Transcribe-form");
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState("");

  const [transcribeForm, setTranscribeForm] = useState({
    language: "",
    responseFormat: "text",
    audioFile: null,
  });

  const [bbbForm, setBbbForm] = useState({
    roomAddress: "",
    accessKey: "",
    corrections: "",
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setTranscribeForm((prev) => ({
      ...prev,
      audioFile: event.target.files[0],
    }));
  };

  const handleTranscribeFormChange = (e) => {
    const { name, value } = e.target;
    setTranscribeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBbbFormChange = (e) => {
    const { name, value } = e.target;
    setBbbForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitTranscribeForm = async (action) => {
    // ... (rest of the function remains the same)
  };

  const startTranscriptor = async () => {
    // ... (rest of the function remains the same)
  };

  const stopTranscriptor = async () => {
    // ... (rest of the function remains the same)
  };

  const toggleFooter = () => {
    setIsFooterExpanded(!isFooterExpanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <header className="bg-teal dark:bg-navy text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <button onClick={() => handleNavigation("/")}>
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button onClick={() => handleNavigation("/transcriptor")}>
              Voice AI
            </button>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-orange dark:bg-beige text-white dark:text-navy"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 flex justify-center items-center p-4">
        <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <header className="bg-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Voice AI - KISSKI</h1>
          </header>
          <div className="p-6">
            <div className="flex mb-6">
              <button
                className={`px-6 py-3 mr-2 rounded-full transition-all duration-300 ease-in-out ${
                  activeTab === "Transcribe-form"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("Transcribe-form")}
              >
                Transcribe
              </button>
              <button
                className={`px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${
                  activeTab === "BBB-form"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("BBB-form")}
              >
                Other
              </button>
            </div>

            <form
              id="Transcribe-form"
              className={`space-y-4 ${
                activeTab === "Transcribe-form" ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-wrap gap-4">
                <select
                  value={transcribeForm.language}
                  onChange={handleTranscribeFormChange}
                  name="language"
                  id="language"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="text">Normal text</option>
                  <option value="srt">SRT</option>
                  <option value="vtt">VTT</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="audio-file"
                  className="block text-sm font-medium mb-2"
                >
                  Upload Audio File
                </label>
                <input
                  type="file"
                  accept="audio/mp3, audio/mp4, audio/mpeg, audio/mpga, audio/m4a, audio/wav, audio/webm, video/mp4, video/mpeg, video/webm"
                  id="audio-file"
                  name="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => submitTranscribeForm("transcriptions")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Transcribe in source language
                </button>
                <button
                  type="button"
                  onClick={() => submitTranscribeForm("translations")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Transcribe in English
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </form>

            <form
              id="BBB-form"
              className={`space-y-4 ${
                activeTab === "BBB-form" ? "block" : "hidden"
              }`}
            >
              <div>
                <label
                  htmlFor="room-address"
                  className="block text-sm font-medium mb-2"
                >
                  Room Address (URL):
                </label>
                <input
                  type="text"
                  id="room-address"
                  name="roomAddress"
                  value={bbbForm.roomAddress}
                  onChange={handleBbbFormChange}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="access-key"
                  className="block text-sm font-medium mb-2"
                >
                  Access Key:
                </label>
                <input
                  type="text"
                  id="access-key"
                  name="accessKey"
                  value={bbbForm.accessKey}
                  onChange={handleBbbFormChange}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="corrections"
                  className="block text-sm font-medium mb-2"
                >
                  Words/terms that should be written correctly:
                </label>
                <input
                  type="text"
                  id="corrections"
                  name="corrections"
                  value={bbbForm.corrections}
                  onChange={handleBbbFormChange}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={startTranscriptor}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Run Transcriptor
                </button>
                <button
                  type="button"
                  onClick={stopTranscriptor}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Stop Transcriptor
                </button>
              </div>
            </form>
            <div
              id="output"
              className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </main>
      </div>
      {/* {main  content end } */}
      <div className="flex-grow bg-beige dark:bg-gray-900 text-navy dark:text-beige transition-colors duration-300">
        <main className="container mx-auto px-4 py-8">
          {router.pathname === "/transcriptor" ? (
            <BBBTranscriptor />
          ) : (
            <div>
              <h1 className="text-3xl font-bold">
                Welcome to Voice AI - KISSKI
              </h1>
              <p className="mt-4">
                This is the main page of the Voice AI - KISSKI application.
                Click on the "Voice AI" button in the navbar to access the BBB
                Room Transcriptor.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-teal dark:bg-navy text-white transition-all duration-300 ease-in-out">
        <button
          onClick={toggleFooter}
          className="w-full p-4 flex justify-center items-center hover:bg-orange dark:hover:bg-beige hover:text-white dark:hover:text-navy transition-colors duration-300"
        >
          {isFooterExpanded ? (
            <ChevronDown size={24} />
          ) : (
            <ChevronUp size={24} />
          )}
        </button>
        {isFooterExpanded && (
          <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold mb-2">About Us</h3>
              <p>Learn more about our company and mission.</p>
            </div>
            {/* Other footer sections */}
          </div>
        )}
      </footer>
    </div>
  );
}
