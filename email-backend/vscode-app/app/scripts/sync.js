const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const SANDBOX_BASE_URL = process.env.SANDBOX_BASE_URL || 'http://localhost:5000';
const OUTPUT_ZIP = '/tmp/code.zip';
const ROOT_DIR = path.resolve(__dirname, '..');

// Files and directories to include
const files = ['app.js', 'server.js', 'package.json', 'README.md'];
const directories = ['controllers', 'middleware', 'models', 'routes', 'utils'];

(async () => {
  const output = fs.createWriteStream(OUTPUT_ZIP);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', async () => {
    console.log(`[+] Created archive: ${OUTPUT_ZIP} (${archive.pointer()} bytes)`);

    // Send archive to sandbox
    const form = new FormData();
    form.append('code', fs.createReadStream(OUTPUT_ZIP));

    try {
      const res = await axios.post(`${SANDBOX_BASE_URL}/sync`, form, {
        headers: form.getHeaders()
      });
      console.log(`[+] Sync success: ${res.data}`);
    } catch (err) {
      console.error('❌ Sync failed:', err.message);
    }
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);

  // Add files
  files.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: file });
    }
  });

  // Add directories
  directories.forEach(dir => {
    const dirPath = path.join(ROOT_DIR, dir);
    if (fs.existsSync(dirPath)) {
      archive.directory(dirPath, dir);
    }
  });

  archive.finalize();
})();
