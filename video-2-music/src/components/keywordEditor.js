import React, { useState } from 'react';
import axios from 'axios';

const KeywordEditor = ({ initialKeywords, onSave }) => {
  const [keywords, setKeywords] = useState(initialKeywords);

  const handleAddKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const handleKeywordChange = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSave = () => {
    axios.post('/api/update-keywords', { keywords })
      .then(response => {
        onSave(response.data.finalVideoUrl);
      })
      .catch(error => {
        console.error('Update failed:', error);
      });
  };

  return (
    <div className="keyword-editor">
      <h2>Edit Keywords</h2>
      {keywords.map((keyword, index) => (
        <input
          key={index}
          value={keyword}
          onChange={(e) => handleKeywordChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleAddKeyword}>Add Keyword</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default KeywordEditor;