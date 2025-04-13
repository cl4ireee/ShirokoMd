import yargs from 'yargs';
import cfonts from 'cfonts';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { createInterface } from 'readline';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';

// Setup console output
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));

// Display bot header with cyan and blue gradient only
say('Shiroko', {
  font: 'block',
  align: 'center',
  gradient: ['cyan', 'blue']
});
say(`'${name}' By @${author.name || author}`, {
  font: 'console',
  align: 'center',
  gradient: ['cyan', 'blue']
});

console.log('🚀 Starting Shiroko WhatsApp Bot... 🐾\n');

let isRunning = false;

/**
 * Start a js file
 * @param {String} file Path to the file to start
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [join(__dirname, file), ...process.argv.slice(2)];
  
  // Display args with cyan/blue gradient
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['cyan', 'blue']
  });

  setupMaster({ exec: args[0], args: args.slice(1) });
  const p = fork();

  p.on('message', data => {
    console.log('[✅ RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.kill(); // Restart the process
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
      default:
        console.warn('[⚠️ UNRECOGNIZED MESSAGE]', data);
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[❗] Exited with code:', code);
    if (code !== 0) {
      console.log('[🔄 Restarting worker due to non-zero exit code...]');
      return start(file);
    }

    // Watch for file changes and restart the process
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();

  // Allow interaction with the process via command line input
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', line => {
        p.emit('message', line.trim());
      });
    }
  }
}

// Start the main bot process
start('main.js');