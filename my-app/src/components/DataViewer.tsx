import React, { useState, useEffect } from 'react';

const DataViewer = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.log('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  if (jsonData === null) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default DataViewer;
