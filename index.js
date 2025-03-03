import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import LastFmApi from 'lastfmapi';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const argv = yargs(hideBin(process.argv)).argv;

// Load config.json
const configPath = path.join(__dirname, 'config.json');
if (!fs.existsSync(configPath)) {
  console.error('Missing config.json - create one from config-sample.json');
  process.exit(1);
}

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
  console.error('Invalid config.json:', err.message);
  process.exit(1);
}

if (!config.lfm?.api_key || !config.lfm?.secret) {
  console.error('Invalid config.json - missing API credentials');
  process.exit(1);
}

// Initialize Last.fm API
const lfm = new LastFmApi({
  api_key: config.lfm.api_key,
  secret: config.lfm.secret
});

if (config.sessionCreds) {
  lfm.setSessionCredentials(config.sessionCreds.username, config.sessionCreds.key);
}

// Load and run the specified method
(async () => {
  try {
    const method = argv.method;
    if (!method) throw new Error('Missing --method parameter');

    const module = await import(`./methods/${method}.js`);
    const params = {
      log: !argv.nolog,
      tag: argv.tag,
      page: argv.page,
      user: argv.user,
      dm: argv.dm,
      ...config
    };

    module.default(params, lfm);
  } catch (err) {
    console.error('Error:', err.message);
    console.log(`
Valid methods:
- auth (--port optional)
- addToLibrary (--user, --page, --dm delay multiplier)
- scrobbleRandom

Example:
node index.js --method=addToLibrary --user=MyLastFMUser --dm=1.5
    `);
    process.exit(1);
  }
})();