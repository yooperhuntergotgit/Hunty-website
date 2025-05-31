const https = require('https');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

// Read SSL certificate and key
const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

const server = https.createServer(options, (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error loading index.html');
            console.error('Error Reading index.html', err);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
            console.log('index.html read and served successfully');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});