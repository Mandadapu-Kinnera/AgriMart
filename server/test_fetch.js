const http = require('http');

const start = Date.now();
http.get('http://localhost:5000/api/products', (res) => {
    console.log(`Status: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
        if (data.length % 1000000 < 10000) { // Log every ~1MB
            console.log(`Received ${Math.floor(data.length / 1000000)}MB...`);
        }
    });
    res.on('end', () => {
        console.log(`Finished in ${Date.now() - start}ms`);
        console.log(`Total size: ${data.length} bytes`);
        try {
            const parsed = JSON.parse(data);
            console.log(`Parsed ${parsed.length} products`);
        } catch (e) {
            console.log('Failed to parse JSON:', e.message);
        }
        process.exit(0);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
