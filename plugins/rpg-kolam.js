import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
let grupos = [suppbot, gofwhabot]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp =  await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png' )
//let enlace = { contextInfo: { externalAdReply: {title: wm, body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(img.getRandom())).buffer() }}}
//let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: paypal, mediaType: 'VIDEO', description: '', title: wm, body: wm, thumbnailUrl: await(await fetch(img)).buffer(), sourceUrl: paypal }}}
//let dos = [enlace, enlace2]  

let name = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].name
let level = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].level
let exp = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp
let paus = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].paus
let kepiting = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].kepiting
let gurita = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].gurita
let cumi = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].cumi
let buntal = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].buntal
let dory = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].dory
let lumba = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].lumba
let lobster = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].lobster
let hiu = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].hiu
let udang = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].udang
let ikan = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].ikan
let orca = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].orca
//let wm = global.wm 

let peces = `🌊🌊 𝗣𝗜𝗦𝗖𝗜𝗡𝗔 𝗗𝗘 𝗣𝗘𝗖𝗘𝗦 🌊🌊
👤» *${name}*

╭━━━━━━━━━⬣ 
┃ *𝗣𝗜𝗦𝗖𝗜𝗡𝗔 𝗗𝗘 𝗣𝗘𝗖𝗘𝗦 : 𝗙𝗜𝗦𝗛 𝗣𝗢𝗢𝗟*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣
🎏 *Total: ${paus + kepiting + gurita + cumi + buntal + dory + lumba + lobster + hiu + udang + ikan + orca}*`.trim()
let txt = '';
let count = 0;
for (const c of peces) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { image: {url: pp}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
//await conn.sendButton(m.chat, wm, peces, img5, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']], m, dos.getRandom())
//conn.sendButton(m.chat, peces, `${wm}`, [['Pasar', '#pasar']], m)
}
handler.help = ['kotakikan', 'kolam', 'kolamikan']
handler.tags = ['rpg']
handler.command = /^(picina|piscina|peces|kotak(ikan)?|kolam(ikan)?)$/i
export default handler 
//handler.register = true

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
