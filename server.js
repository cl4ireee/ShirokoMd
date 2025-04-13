import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import { exec } from 'child_process';

let app = global.app = express();

function connect(PORT) {
    app.get('/', (req, res) => res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="15">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shiroko -Techno Bot</title>
  <link rel="icon" href="https://telegra.ph/file/d85b0f03d07813ad6eeef.png">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <style>
    body {
      background: #0f0f0f;
      color: #f0f0f0;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
      text-align: center;
    }
    h1 { color: #00ffff; }
    #clock-container { margin: 20px 0; }
    #clock-container div { font-size: 1.5em; font-weight: bold; }
    a.btn-custom {
      margin-top: 20px;
      background: #007bff;
      color: white;
    }
  </style>
</head>
<body>
  <h1>Shiroko -Techno Panel</h1>
  <p>Base: Elaina-MultiDevice | Owner: Mileina Claire</p>
  <div id="clock-container">
    <div id="clock-wib"></div>
    <div id="clock-wita"></div>
    <div id="clock-wit"></div>
  </div>
  <a class="btn btn-custom" href="https://luccanexz.hostingpanel.my.id" target="_blank">Kunjungi Web Saya</a>
  <script>
    function updateClock() {
      const now = new Date();
      const options = { hour12: false };
      document.getElementById('clock-wib').textContent = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' (WIB)';
      document.getElementById('clock-wita').textContent = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Makassar' }) + ' (WITA)';
      document.getElementById('clock-wit').textContent = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jayapura' }) + ' (WIT)';
    }
    setInterval(updateClock, 1000);
    updateClock();
  </script>
</body>
</html>`));

    app.get('/nowa', async (req, res) => {
        const q = req.query.number;
        const regex = /x/g;

        if (!q) return res.status(400).json({ error: 'Input Parameter Number Parameter is required' });
        if (!q.match(regex)) return res.status(400).json({ error: 'Parameter Number must contain at least one letter "x"' });

        const random = q.match(regex).length;
        const total = Math.pow(10, random);
        const array = [];

        for (let i = 0; i < total; i++) {
            const list = [...i.toString().padStart(random, '0')];
            const result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';
            try {
                const v = await conn.onWhatsApp(result);
                const exists = v[0]?.exists;
                let info = exists ? await conn.fetchStatus(result).catch(_ => {}) : {};
                array.push({ jid: result, exists, ...info });
            } catch (error) {
                array.push({ jid: result, exists: false });
            }
        }
        res.json({ result: array });
    });

    app.get('/speedtest', (req, res) => {
        exec('speedtest', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: `Speedtest failed: ${error.message}` });
            }
            res.status(200).send(`<h2>Speedtest Results</h2><pre>${stdout}</pre>`);
        });
    });

    app.get('/ping', (req, res) => {
        res.status(200).send('Ping successful');
    });

    app.get('/ping2', async (req, res) => {
        const pingResults = [];
        const url = 'https://xnuvers007botz.xnuvers007.repl.co';

        for (let i = 0; i < 10; i++) {
            try {
                const response = await axios.get(url);
                pingResults.push(`Ping result ${i + 1}: ${response.data} ${response.status}<br />`);
            } catch (error) {
                pingResults.push(`Error pinging ${i + 1}: ${error.message}`);
            }
        }
        res.status(200).send(pingResults.join('<br /><br />'));
    });

    app.listen(PORT, () => {
        keepAlive();
        console.log('App listened on port', PORT);
    });
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    if (/(\/\/|\.)undefined\./.test(url)) return;

    setInterval(() => {
        fetch(url).catch(console.log);
    }, 30 * 1000);
}

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' });
}

export default connect;