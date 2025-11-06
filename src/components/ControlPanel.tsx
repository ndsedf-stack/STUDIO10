import React, { useState } from 'react';

// Dummy data for demonstration
const blocks = [
  { id: 1, title: 'Block 1', content: 'Content for Block 1' },
  { id: 2, title: 'Block 2', content: 'Content for Block 2' },
  // More blocks as needed
];

const ControlPanel = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [progress, setProgress] = useState({});
  
  const handleWeekChange = (delta: number) => {
    setCurrentWeek(currentWeek + delta);
  };

  const importProgressData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target?.result as string);
        setProgress(json);
      };
      reader.readAsText(file);
    }
  };

  const exportProgressData = () => {
    const dataStr = JSON.stringify(progress);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Control Panel</h1>
      <div>
        <button onClick={() => handleWeekChange(-1)}>Previous Week</button>
        <span>Current Week: {currentWeek}</span>
        <button onClick={() => handleWeekChange(1)}>Next Week</button>
      </div>
      <div>
        <h2>Progress Tracking</h2>
        <pre>{JSON.stringify(progress, null, 2)}</pre>
      </div>
      <div>
        <h2>Block Information</h2>
        {blocks.map(block => (
          <div key={block.id}>
            <h3>{block.title}</h3>
            <p>{block.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Import/Export Progress Data</h2>
        <input type="file" accept=".json" onChange={importProgressData} />
        <button onClick={exportProgressData}>Export Progress Data</button>
      </div>
    </div>
  );
};

export default ControlPanel;