// Script Ori By BochilGaming
// Ditulis Ulang Oleh ImYanXiao
// Disesuaikan Oleh ShirokamiRyzen
// Disesuaikan Oleh Naoki

import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto, getDevice } = (await import('@adiwajshing/baileys')).default

const defaultMenu = {
  before: `
_Hello %name! i am ${global.wm}_

⏤͟͟͞͞╳── *[ ɪɴғᴏ  ᴜsᴇʀ ]*
│    =〆 *Nama:*  %name 
│    =〆 *Nomor:* %tag
│    =〆 *Premium:* %prems
│    =〆 *Limit:* %limit
│    =〆 *Role:* %role
⏤͟͟͞͞╳────────── ✦

⏤͟͟͞͞╳── *[ ʙᴏᴛ  ɪɴғᴏ ]*
│    =〆 *Nama Bot:* %me
│    =〆 *Mode:* %mode
│    =〆 *Prefix:* *%_p* 
│    =〆 *Type:* Node.JS
│    =〆 *Database:* %rtotalreg dari %totalreg
⏤͟͟͞͞╳────────── ✦
%readmore
`.trim(),
  header: '⏤͟͟͞͞╳── *[ %category ]*',
  body: '│    =〆 %cmd %isPremium %islimit',
  footer: '⏤͟͟͞͞╳────────── ✦',
  after: ``
}

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  if (m.isGroup && !global.db.data.chats[m.chat].menu) {
    throw `Admin telah mematikan menu`
  }

  let tags = {
    'main': 'MAIN MENU',
    'ai': 'AI MENU',
    'stalk': 'STALK MENU', 
    'downloader': 'DOWNLOADER MENU',
    'internet': 'INTERNET MENU',
    'anime': 'ANIME MENU',
    'sticker': 'STICKER MENU',
    'tools': 'TOOLS MENU',
    'maker': 'MAKER MENU', 
    'group': 'GROUP MENU',
    'search': 'SEARCH MENU',
    'game': 'GAME MENU',
    'fun': 'FUN MENU',
    'random': 'RANDOM MENU',
    'info': 'INFO MENU',
    'pterodactyl': 'PTERODACTYL MENU', 
    'owner': 'OWNER MENU'
  }

  try {
    let dash = global.dashmenu
    let m1 = global.dmenut
    let m2 = global.dmenub
    let m3 = global.dmenuf
    let m4 = global.dmenub2

    let cc = global.cmenut
    let c1 = global.cmenuh
    let c2 = global.cmenub
    let c3 = global.cmenuf
    let c4 = global.cmenua

    let lprem = global.lopr
    let llim = global.lolm
    let tag = `@${m.sender.split('@')[0]}`
    let device = await getDevice(m.id)

    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let usrs = db.data.users[m.sender]

    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    let mode = global.opts['self'] || global.opts['owneronly'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium' : 'Free'}`
    let platform = os.platform()

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
    // Menu Utama
    if (!args[0]) {
      let categoryName = 'MENU UTAMA'
      
      let menuText = [
        defaultMenu.before,
        defaultMenu.header.replace('%category', categoryName),
        ...Object.keys(tags).map(tag => 
          defaultMenu.body
            .replace('%cmd', `${_p}menu ${tag}`)
            .replace('%islimit', '')
            .replace('%isPremium', '')
        ),
        defaultMenu.footer,
        defaultMenu.after
      ].join('\n')

      const replacements = {
        '%name': name,
        '%tag': tag,
        '%prems': prems,
        '%limit': limit,
        '%level': level,
        '%role': role,
        '%me': conn.getName(conn.user.jid),
        '%mode': mode,
        '%_p': _p,
        '%rtotalreg': rtotalreg,
        '%totalreg': totalreg,
        '%readmore': readMore
      }

      for (const [key, value] of Object.entries(replacements)) {
        menuText = menuText.replace(new RegExp(key, 'g'), value)
      }

      let fkon = { 
        key: { 
          fromMe: false,
          participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
          ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {})
        },
        message: { 
          contactMessage: {
            displayName: `${name}`,
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
          }
        } 
      }
      
      await conn.sendMessage(m.chat, {
        text: menuText,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true, 
            title: `${global.wm}`,
            body: `${ucapan()}`,
            thumbnailUrl: "https://files.catbox.moe/0421p1.jpg",
            renderLargerThumbnail: true,
            mediaType: 1,
            mediaUrl: "",
            /*sourceUrl: sgw*/
          }
        }
      }, { quoted: fkon })
      
      /*await conn.sendMessage(m.chat, {
        audio: { url: 'https://files.catbox.moe/01k8yq.m4a' },
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m })*/
      
      return
    }

    // Menu Kategori Spesifik
    let selectedCategory = args[0].toLowerCase()
    
    // Jika kategori tidak valid, tidak merespon sama sekali
    if (!tags[selectedCategory]) return
    
    let categoryName = tags[selectedCategory]
    let categoryCommands = help.filter(plugin => 
      plugin.tags && plugin.tags.includes(selectedCategory) && plugin.help
    )

    // Jika tidak ada perintah dalam kategori, tidak merespon
    if (categoryCommands.length === 0) return

    let menuText = [
      defaultMenu.before,
      defaultMenu.header.replace('%category', categoryName),
      ...categoryCommands.flatMap(plugin => 
        plugin.help.map(cmd => 
          defaultMenu.body
            .replace('%cmd', plugin.prefix ? cmd : _p + cmd)
            .replace('%islimit', plugin.limit ? llim : '')
            .replace('%isPremium', plugin.premium ? lprem : '')
        )
      ),
      defaultMenu.footer,
      defaultMenu.after
    ].join('\n')

    const replacements = {
      '%name': name,
      '%tag': tag,
      '%prems': prems,
      '%limit': limit,
      '%level': level,
      '%role': role,
      '%me': conn.getName(conn.user.jid),
      '%mode': mode,
      '%_p': _p,
      '%rtotalreg': rtotalreg,
      '%totalreg': totalreg,
      '%readmore': readMore
    }

    for (const [key, value] of Object.entries(replacements)) {
      menuText = menuText.replace(new RegExp(key, 'g'), value)
    }

    let fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '16500000000@s.whatsapp.net' } : {})
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    }
      
    await conn.sendMessage(m.chat, {
      text: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          showAdAttribution: true, 
          title: `${global.wm}`,
          body: `${ucapan()}`,
          thumbnailUrl: "https://files.catbox.moe/0421p1.jpg",
          renderLargerThumbnail: true,
          mediaType: 1,
          mediaUrl: "",
          /*sourceUrl: sgc*/
        }
      }
    }, { quoted: fkon })
      
  } catch (e) {
    console.error('Menu Error:', e)
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|help|\?)$/i

handler.register = false
handler.exp = false

export default handler

// Utility Functions
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Kak 🌄"
  }
  if (time >= 10) {
    res = "Siang Kak 🏙️"
  }
  if (time >= 15) {
    res = "Sore Kak 🌇"
  }
  if (time >= 18) {
    res = "Malam Kak 🌃"
  }
  return res
}

function runtime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}