<!DOCTYPE html>
 <body>
<div class="info">
<p align ="center">
 <img src= "https://files.catbox.moe/h73x0c.jpg" witdh = "100px"></img>
</p>
  <h1 align="center">Shiroko</h1>


<p align="center">
 <a href="#"><img title="ElainaBOT" src="https://img.shields.io/badge/Whatshapp BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/ImYanXiao"><img title="Author" src="https://img.shields.io/badge/AUTHOR-Claire-cyan.svg?style=for-the-badge&logo=github"></a>

Example Code

const handler = async (m, { conn }) => {
  const start = new Date().getTime()
  await m.reply("Pinging...")
  const end = new Date().getTime()

  const responseTime = end - start

  m.reply(`🏓 Pong!\nResponse time: ${responseTime}ms`)
}

handler.help = ["ping"]
handler.tags = ["info"]
handler.command = ["ping"]

export default handler
