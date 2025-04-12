const express = require('express');
const multer = require('multer');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: '/tmp' });

app.post('/sync', upload.single('code'), async (req, res) => {
  const zipPath = req.file.path;
  const targetDir = path.resolve(__dirname, 'code');
  const restartFile = path.join(targetDir, '.restart');

  // Clean old user code, keep /app/code alive
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  } else {
		fs.readdirSync(targetDir).forEach(file => {
			if (file === '.restart') return;
			const filePath = path.join(targetDir, file);
			fs.rmSync(filePath, { recursive: true, force: true });
		});		
  }

  // Unzip into /app/code
  fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .on('close', () => {
      fs.unlinkSync(zipPath);
      console.log('[+] Code extracted to /app/code');

      // Run npm install if needed
      const packageJsonPath = path.join(targetDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        console.log('[*] Running npm install...');
        exec('npm install --omit=dev', { cwd: targetDir }, (err, stdout, stderr) => {
          if (err) {
            console.error('❌ npm install failed:\n', stderr);
            return res.status(500).send('npm install failed');
          }

          console.log('[+] npm install complete');

          // ✅ Touch .restart to trigger nodemon
          fs.writeFileSync(restartFile, `${Date.now()}`);
          console.log('[+] Triggered app restart');

          res.send('Synced and restarted');
        });
      } else {
        fs.writeFileSync(restartFile, `${Date.now()}`);
        res.send('Synced (no deps) and restarted');
      }
    });
});

app.get('/', (_, res) => res.send('✅ Sync server running'));
app.listen(5000, () => console.log('🚀 Sync server on port 5000'));
