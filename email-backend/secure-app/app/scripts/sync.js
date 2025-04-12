const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const SANDBOX_BASE_URL = process.env.SANDBOX_BASE_URL || 'http://localhost:5000';
const OUTPUT_ZIP = '/tmp/code.zip';
const ROOT_DIR = path.resolve(__dirname, '..');

// Directories & files to include
const include = [
  'app.js', 'server.js', 'package.json', 'README.md',
  'controllers', 'middleware', 'models', 'routes', 'utils'
];

(async () => {
  // Create zip
  const output = fs.createWriteStream(OUTPUT_ZIP);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', async () => {
    console.log(`[+] Created archive: ${OUTPUT_ZIP} (${archive.pointer()} bytes)`);

    // Send to sandbox
    const form = new FormData();
    form.append('code', fs.createReadStream(OUTPUT_ZIP));

    try {
      const res = await axios.post(SANDBOX_BASE_URL + "/sync", form, {
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
  include.forEach(entry => archive.directory(
    path.join(ROOT_DIR, entry), entry, { ignore: ['node_modules/**'] }
  ));
  archive.file(path.join(ROOT_DIR, 'package.json'), { name: 'package.json' });
  archive.finalize();
})();
