import React, { useState } from 'react';
import FileUpload from './components/fileUpload';
import KeywordEditor from './components/keywordEditor';
import FinalVideo from './components/finalVideo';
import './App.css';

function App() {
  const [stage, setStage] = useState('upload');
  const [keywords, setKeywords] = useState([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState('');

  const handleUploadComplete = (extractedKeywords) => {
    setKeywords(extractedKeywords);
    setStage('editKeywords');
  };

  const handleSaveKeywords = (videoUrl) => {
    setFinalVideoUrl(videoUrl);
    setStage('finalVideo');
  };

  return (
    <div className="App">
      {stage === 'upload' && <FileUpload onUploadComplete={handleUploadComplete} />}
      {stage === 'editKeywords' && <KeywordEditor initialKeywords={keywords} onSave={handleSaveKeywords} />}
      {stage === 'finalVideo' && <FinalVideo videoUrl={finalVideoUrl} />}
    </div>
  );
}

export default App;