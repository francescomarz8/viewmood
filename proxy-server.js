// Simple proxy server to enable page tracking for cross-origin sites
// Run with: node proxy-server.js

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse the target URL from query parameter
  const parsedUrl = url.parse(req.url, true);
  const targetUrl = parsedUrl.query.url;

  if (!targetUrl) {
    res.writeHead(400);
    res.end('Missing url parameter. Usage: http://localhost:3001/?url=https://example.com');
    return;
  }

  console.log('Proxying:', targetUrl);

  // Choose http or https based on target URL
  const client = targetUrl.startsWith('https') ? https : http;

  client.get(targetUrl, (proxyRes) => {
    // Forward status code
    res.writeHead(proxyRes.statusCode, {
      'Content-Type': proxyRes.headers['content-type'] || 'text/html',
      'Access-Control-Allow-Origin': '*',
    });

    // Pipe the response
    proxyRes.pipe(res);
  }).on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.writeHead(500);
    res.end('Proxy error: ' + err.message);
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Usage: http://localhost:${PORT}/?url=https://greenback-app.dmoodlabs.com/`);
});
