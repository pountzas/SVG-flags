import React, { useState } from 'react';
import { Flag, FlagSelector } from 'svg-flags';

const countries = [
  'us',
  'gb',
  'fr',
  'de',
  'jp',
  'us',
]
function App() {
  const [selectedCountry, setSelectedCountry] = useState('us');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'left' }}>
      <h1>SVG Flags Demo</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2>Basic Flag Display</h2>
        {countries.map((country) => (
            <Flag country={country} width={64} />
        ))}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
          <Flag country="us" width={64} />
          <Flag country="gb" width={48} height={32} />
          <Flag country="fr" width={64} showBorder />
          <Flag country="de" width={40} showBorder borderColor="#333" />
          <Flag country="jp" width={50} />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Flag country="ca" width={32} />
          <Flag country="au" width={32} />
          <Flag country="br" width={32} />
          <Flag country="in" width={32} />
          <Flag country="cn" width={32} />
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Interactive Flags</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Flag 
            country="us" 
            width={40} 
            clickable 
            onClick={(country) => alert(`Clicked: ${country}`)}
            showBorder
          />
          <Flag 
            country="gb" 
            width={40} 
            clickable 
            onClick={(country) => alert(`Clicked: ${country}`)}
            showBorder
          />
          <Flag 
            country="fr" 
            width={40} 
            clickable 
            onClick={(country) => alert(`Clicked: ${country}`)}
            showBorder
          />
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Country Selector</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>Selected country: {selectedCountry}</p>
          <FlagSelector
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Search countries..."
            flagSize={24}
            showNames={true}
            showSearch={true}
            maxResults={20}
          />
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Different Sizes</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Flag country="us" width={16} />
          <Flag country="us" width={24} />
          <Flag country="us" width={32} />
          <Flag country="us" width={48} />
          <Flag country="us" width={64} />
          <Flag country="us" width={96} />
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Custom Styling</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Flag 
            country="us" 
            width={40} 
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          />
          <Flag 
            country="gb" 
            width={40} 
            style={{ 
              borderRadius: '50%',
              border: '3px solid #333'
            }}
          />
          <Flag 
            country="fr" 
            width={40} 
            style={{ 
              transform: 'rotate(15deg)',
              filter: 'grayscale(50%)'
              }}
          />
        </div>
      </section>

      <section>
        <h2>Error Handling</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Flag country="invalid" width={32} />
          <Flag country="xx" width={32} />
          <Flag country="" width={32} />
        </div>
      </section>
    </div>
  );
}

export default App;
