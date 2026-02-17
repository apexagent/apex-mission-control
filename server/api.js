const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8765;

// Enable CORS for all origins
app.use(cors());

// Data directory
const DATA_DIR = path.join(__dirname, '..', 'data');

// Helper to read JSON file
function readJsonFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return null;
  }
}

// Tasks endpoint (existing)
app.get('/tasks.json', (req, res) => {
  const data = readJsonFile('tasks.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read tasks.json' });
  }
});

// Agents endpoint (new)
app.get('/api/agents.json', (req, res) => {
  const data = readJsonFile('agents.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read agents.json' });
  }
});

// Intel endpoint (new)
app.get('/api/intel.json', (req, res) => {
  const data = readJsonFile('intel.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read intel.json' });
  }
});

// Productions endpoint (new)
app.get('/api/productions.json', (req, res) => {
  const data = readJsonFile('productions.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read productions.json' });
  }
});

// Also serve tasks at /api/tasks.json for consistency
app.get('/api/tasks.json', (req, res) => {
  const data = readJsonFile('tasks.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read tasks.json' });
  }
});

// Neural feedback endpoint (new)
app.get('/api/neural.json', (req, res) => {
  const data = readJsonFile('neural.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read neural.json' });
  }
});

// Dashboard data endpoint (live data - refreshes every 60s)
app.get('/api/dashboard-data.json', (req, res) => {
  const data = readJsonFile('dashboard-data.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read dashboard-data.json' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    endpoints: ['/tasks.json', '/api/agents.json', '/api/intel.json', '/api/productions.json']
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mission Control API server running on port ${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  - http://167.99.69.191:${PORT}/tasks.json`);
  console.log(`  - http://167.99.69.191:${PORT}/api/agents.json`);
  console.log(`  - http://167.99.69.191:${PORT}/api/intel.json`);
  console.log(`  - http://167.99.69.191:${PORT}/api/productions.json`);
});
