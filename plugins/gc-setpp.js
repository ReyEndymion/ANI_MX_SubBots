let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) {
let resp = '*⚠️️ Responde a una imagen.*'
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
await conn.updateProfilePicture(m.chat, img).then(async _ => {
    let resp = '⚘ *_Imagen actualizada con éxito._*'
    let txt = '';
    let count = 0;
    for (const c of resp) {
    new Promise(resolve => setTimeout(resolve, 15));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
          await conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
})
} else {
    let resp = '*⚠️️ Responde a una imagen.*'
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      await conn.sendPresenceUpdate('composing' , m.chat);
    }
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}
}
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

/*import { webp2png } from '../lib/webp2mp4.js'
import { URL_REGEX } from '@whiskeysockets/baileys'
let handler = async (m, { conn, args }) => {
let q = m.quoted ? m.quoted : m
if (/image/.test(mime)) {
let url = await webp2png(await q.download())
await conn.updateProfilePicture(m.chat, { url }).then(_ => m.reply('⚘ *_Imagen actualizada con éxito._*'))
} else if (args[0] && args[0].match(URL_REGEX)) {
await conn.updateProfilePicture(m.chat, { url: args[0] }).then(_ => m.reply('⚘ *_Imagen actualizada con éxito._*'))
} else throw '*⚠️️ Responde a una imagen.*'
}
handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'setppgroup']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler*/
