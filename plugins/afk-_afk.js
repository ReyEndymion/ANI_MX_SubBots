export async function before(m, {conn}) {
if(m.chat.endsWith(groupID)) {
if (!m.isGroup) return !1
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats || {}
let chat = chats.groups[m.chat] || {}
let users = chat.users || {}
let user = users[m.sender] || {}
let settings = bot.settings || {}
if (user.afk > -1) {
let resp = `
*[❗INFO❗] DEJASTE DE ESTAR INACTIVO (AFK)${user.afkReason ? ' DESPUES DE ESTAR INACTIVO (AFK) POR EL MOTIVO: ' + user.afkReason : ''}*

*—◉ TIEMPO DE INACTIVIDAD (AFK): ${(new Date - user.afk).toTimeString()}*
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
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

user.afk = -1
user.afkReason = ''
}
let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let jid of jids) {
if (!user)
continue
let afkTime = user.afk
if (!afkTime || afkTime < 0)
continue
let reason = user.afkReason || ''
let resp = `*[❗] NO LO ETIQUETES [❗]*

*—◉ EL USUARIO QUE USTED ETIQUETO ESTA INACTIVO (AFK)*
*—◉ ${reason ? 'MOTIVO DE INACTIVIDAD (AFK): ' + reason : 'MOTIVO DE INACTIVIDAD (AFK): _EL USUARIO NO ESPECIFICO UN MOTIVO_'}*
*—◉ TIEMPO TRANSCURRIDO DE INACTIVIDAD (AFK): ${(new Date - afkTime).toTimeString()}*
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
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
return true
} else return
}
