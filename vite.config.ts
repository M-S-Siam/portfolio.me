import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function suitPortraitSyncPlugin(): Plugin {
  const publicDir = path.resolve(__dirname, 'public');
  const suitPortraitPath = path.resolve(publicDir, 'suit_portrait.jpg');
  const oldPortraitPath = path.resolve(publicDir, 'github_portrait.jpg');

  const syncFromAssetsIfAvailable = () => {
    try {
      // Ensure old github_portrait.jpg is never present
      if (fs.existsSync(oldPortraitPath)) {
        fs.unlinkSync(oldPortraitPath);
      }

      const altSuitPath = path.resolve(publicDir, 'siam_suit_portrait.jpg');

      if (fs.existsSync(suitPortraitPath) && fs.statSync(suitPortraitPath).size > 1000) {
        if (!fs.existsSync(altSuitPath) || fs.statSync(altSuitPath).size === 0) {
          fs.copyFileSync(suitPortraitPath, altSuitPath);
        }
        return true;
      }

      if (fs.existsSync(altSuitPath) && fs.statSync(altSuitPath).size > 1000) {
        fs.copyFileSync(altSuitPath, suitPortraitPath);
        return true;
      }

      const assetsDir = path.resolve(publicDir, 'assets', 'aistudio');
      if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);
        const match = files.find(
          (f) =>
            f.startsWith('file_00000000f58c8208810a0e1f538275d9') ||
            f.toLowerCase().includes('suit')
        );
        if (match) {
          fs.copyFileSync(path.join(assetsDir, match), suitPortraitPath);
          fs.copyFileSync(path.join(assetsDir, match), altSuitPath);
          return true;
        }
      }
    } catch {
      // Ignore fs errors in restricted environments
    }
    return fs.existsSync(suitPortraitPath) || fs.existsSync(path.resolve(publicDir, 'siam_suit_portrait.jpg'));
  };

  return {
    name: 'suit-portrait-sync-plugin',
    buildStart() {
      syncFromAssetsIfAvailable();
    },
    configureServer(server) {
      syncFromAssetsIfAvailable();

      server.middlewares.use('/api/portrait-status', (_req, res) => {
        const exists = syncFromAssetsIfAvailable();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({exists}));
      });

      server.middlewares.use('/api/save-portrait', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({error: 'Method not allowed'}));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const dataUrl: string = parsed.dataUrl || '';
            const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
            if (!matches || !matches[2]) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({error: 'Invalid image dataUrl'}));
              return;
            }
            const buffer = Buffer.from(matches[2], 'base64');
            fs.mkdirSync(publicDir, {recursive: true});
            fs.writeFileSync(suitPortraitPath, buffer);
            if (fs.existsSync(oldPortraitPath)) {
              fs.unlinkSync(oldPortraitPath);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({saved: true, path: '/suit_portrait.jpg', bytes: buffer.length}));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({error: String(err)}));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  // Automatically resolve base path for GitHub Pages (e.g., /portfolio.me/) vs local/AI Studio preview
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const isUserPage = repoName?.toLowerCase().endsWith('.github.io');
  const base = process.env.GITHUB_ACTIONS
    ? isUserPage
      ? '/'
      : `/${repoName}/`
    : './';

  return {
    base,
    plugins: [react(), tailwindcss(), suitPortraitSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

