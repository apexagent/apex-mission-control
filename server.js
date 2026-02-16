const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const DATA_DIR = path.join(__dirname, 'data');

// Helper to read JSON file
function readJsonFile(filename, callback) {
  const filePath = path.join(DATA_DIR, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      try {
        callback(null, JSON.parse(data));
      } catch (parseErr) {
        callback(parseErr, null);
      }
    }
  });
}

// Helper to send JSON response
function sendJson(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // CORS headers for browser access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;
  
  // Tasks endpoint
  if (url === '/tasks.json' || url === '/api/tasks.json' || url === '/') {
    readJsonFile('tasks.json', (err, data) => {
      if (err) {
        sendJson(res, { error: 'Failed to read tasks' }, 500);
      } else {
        sendJson(res, data);
      }
    });
  }
  // Agents endpoint
  else if (url === '/api/agents.json') {
    readJsonFile('agents.json', (err, data) => {
      if (err) {
        sendJson(res, { error: 'Failed to read agents' }, 500);
      } else {
        sendJson(res, data);
      }
    });
  }
  // Intel endpoint
  else if (url === '/api/intel.json') {
    readJsonFile('intel.json', (err, data) => {
      if (err) {
        sendJson(res, { error: 'Failed to read intel' }, 500);
      } else {
        sendJson(res, data);
      }
    });
  }
  // Productions endpoint
  else if (url === '/api/productions.json') {
    readJsonFile('productions.json', (err, data) => {
      if (err) {
        sendJson(res, { error: 'Failed to read productions' }, 500);
      } else {
        sendJson(res, data);
      }
    });
  }
  // Health check
  else if (url === '/health') {
    sendJson(res, { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      endpoints: ['/tasks.json', '/api/agents.json', '/api/intel.json', '/api/productions.json']
    });
  }
  // 404 for unknown routes
  else {
    sendJson(res, { error: 'Not found' }, 404);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mission Control API running on http://0.0.0.0:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  - /tasks.json`);
  console.log(`  - /api/agents.json`);
  console.log(`  - /api/intel.json`);
  console.log(`  - /api/productions.json`);
  console.log(`  - /health`);
});
