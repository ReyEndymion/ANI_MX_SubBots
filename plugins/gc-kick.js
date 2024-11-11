import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, args, participants, command, usedPrefix }) => {
}
handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick|echar|hechar|sacar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


/*
try {
if (!global.db.data.bot[conn.user.jid].settings.restrict) return conn.sendWritingText(m.chat, '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*', m)
let kicktext = `*[❗] ETIQUETÉ A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return conn.sendWritingText(m.chat, kicktext, m.chat, { mentions: conn.parseMention(kicktext)}) 
if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) return conn.sendWritingText(m.chat, '*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*', m)

if(m.message.extendedTextMessage.contextInfo.participant !== null && m.message.extendedTextMessage.contextInfo.participant != undefined && m.message.extendedTextMessage.contextInfo.participant !== "") {
var mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid[0] ? m.message.extendedTextMessage.contextInfo.mentionedJid[0] : m.message.extendedTextMessage.contextInfo.participant
if(conn.user.jid.includes(mentioned)) return conn.sendWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [mentioned], 'remove')
let exitoso1 = `*@${mentioned.split("@")[0]} FUE ELIMINADO EXITOSAMENTE DEL GRUPO*`
let error1 = `*@${mentioned.split("@")[0]} ES EL CREADOR DEL GRUPO, NO PUEDO ELIMINAR AL CREADOR DEL GRUPO*`
let error2 = `@${mentioned.split("@")[0]} YA HA SIDO ELIMINADO O HA ABANDONADO EL GRUPO*`
if (responseb[0].status === "200") conn.sendWritingText(m.chat, exitoso1, m.chat, { mentions: conn.parseMention(exitoso1)})
else if (responseb[0].status === "406") conn.sendWritingText(m.chat, error1, m.chat, { mentions: conn.parseMention(error1)}) 
else if (responseb[0].status === "404") conn.sendWritingText(m.chat, error2, m.chat, { mentions: conn.parseMention(error2)})
else conn.sendMessage(m.chat, {text: `*[❗] OCURRIO UN ERROR INESPERADO*`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
} else if (m.message.extendedTextMessage.contextInfo.mentionedJid != null && m.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
return
}
} catch {
 //let lol = args[0].replace(/[+]/g, '')
let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
let kickedUser = participants.map(u => u.id).filter(v => v !== conn.user.jid )
for (let user of users)
if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
kickedUser.concat(res)
await delay(1 * 10000)
}
conn.sendWritingText(m.chat, `*LA ELIMINACION FUE EXITOSA* ${users.map(v => '@' + v.split('@')[0]) || kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser })
 
}
var mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid
if(mentioned.includes(conn.user.jid)) return conn.sendWritingText(m.chat, "*[❗] 𝙽𝙾 𝙿𝚄𝙴𝙳𝙾 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁𝙼𝙴 𝙰 𝙼𝙸 𝙼𝙸𝚂𝙼𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚂𝙰𝙲𝙰𝙼𝙴 𝙼𝙰𝙽𝚄𝙰𝙻𝙼𝙴𝙽𝚃𝙴 𝚂𝙸 𝙰𝚂𝙸 𝙻𝙾 𝙳𝙴𝚂𝙴𝙰𝚂*")
if(mentioned.length > 1) {
if(mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return conn.sendWritingText(m.chat, `¿De verdad vas a banear a todos?`)
sexocomrato = 0
for (let banned of mentioned) {
await sleep(100)
let responseb2 = await conn.groupParticipantsUpdate(m.chat, [banned], 'remove')
if (responseb2[0].status === "200") sexocomrato = sexocomrato + 1
}
conn.sendMessage(m.chat, {text: `${sexocomrato} participante elimanado del grupo.`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
} else {
let responseb3 = await conn.groupParticipantsUpdate(m.chat, [mentioned[0]], 'remove')
if (responseb3[0].status === "200") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} fue eliminado exitosamente del grupo.️`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else if (responseb3[0].status === "406") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} creó este grupo y no puede ser eliminado.`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else if (responseb3[0].status === "404") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} ya ha sido eliminado o abandonado el grupo`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else conn.sendMessage(m.chat, {text: `A ocurrido un error.`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
}
*/
/*&& v.startsWith(lol || lol)*/