export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants}) {
if (m.isGroup) return !0
if (m.chat == 'status@broadcast') return
if (m.isBaileys && m.fromMe) return !0
if (!m.message) return !0
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats || {}
let chat = chats.privs[m.chat] || {}
let settings = bot.settings || {}
let sender = m.sender.split`@`[0];
let creators = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
//console.log('esto da lo que elegi: ', m.sender + '\n\n'+ adm)
const regexp = /(reporte|piedra|papel|tijera|serbot|jadibot|deletebot|stop|codetoken)/i;
const containsWord = regexp.test(m.text);
if (containsWord || (m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace'))) return !0
let ban = `Hola *@${sender}*, está prohibido hablar al privado del bot serás bloqueado.\nDudas con *${creators}\n Para los jadibots aqui solo se pueden usar los comandos jadibot/serbot, deletebot, stop y estado \n\n El grupo para usar el bot es:\n\n${gofwhabot}`
if (settings.antiPrivate && !isOwner && !isROwner) {
let txt = '';
let count = 0;
for (const c of ban) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
return conn.updateBlockStatus(m.chat, 'block');
}

}
