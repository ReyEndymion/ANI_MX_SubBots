import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
  if (m.chat.endsWith(userID)) return
	let name = m.sender.split`@`[0]//conn.getName(m.sender)
  let chats = global.db.data.bot[conn.user.jid].chats
  let chat = chats.groups[m.chat]
  let users = chat.users
  let user = users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
   let { min, xp, max } = xpRange(user.level, global.multiplier)
   let resp =  `
┌───⊷ *NIVEL*
▢ Nombre : *@${name}*
▢ Nivel : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
└──────────────

Te falta *${max - user.exp}* de *XP* para subir de nivel
`.trim()
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
 let teks = `🎊 Bien hecho @${m.sender.split`@`[0]}Nivel:`
 let str = `
┌─⊷ *LEVEL UP*
▢ Nivel anterior : *${before}*
▢ Nivel actual : *${user.level}*
└──────────────

*_Cuanto más interactúes con los bots, mayor será tu nivel_*
`.trim()
 try {
 const img = await levelup(teks, user.level)
 let txt = '';
 let count = 0;
 for (const c of str) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
 }
// conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
 conn.sendMessage(m.chat, {image: {url: img}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
 } catch (e) {
let txt = '';
let count = 0;
for (const c of str) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
 //m.reply(str)
 }
}
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

export default handler
