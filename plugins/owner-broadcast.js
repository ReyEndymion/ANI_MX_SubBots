import fs from 'fs'
import path, { join } from 'path'
let handler = async (m, { conn, text } ) => {  
let chatsall = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let contextInfo = {  
    mentionedJid: [m.sender],  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": 'COMUNICADO OFICIAL A TODOS LOS CHATS',   
    body: igfg, 
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": imagen1,  
    "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
    "sourceUrl": hp_animxscans  
    }  
    } 
for (let id of chatsall) { 
let resp = `*╔═══❰ COMUNICADO ❱═══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════════╝*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 30));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , id);
    }
}
    await conn.sendMessage(id, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
}
let resp = `*[❗INFO❗] MENSAJE ENVIADO A TODOS LOS CHATS*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i
handler.rowner = true
export default handler

//, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + wm, fs.readFileSyncjoin(media, 'pictures/avatar_contact.png'), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { contextInfo: { externalAdReply: {title: 'COMUNICADO OFICIAL A TODOS LOS CHATS',body: igfg, sourceUrl: hp_animxscans, thumbnail: fs.readFileSync('./Menu2.jpg') }}})
