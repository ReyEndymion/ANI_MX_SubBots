/*
⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic (https://github.com/ferhacks)

El codigo de este archivo fue parchado por:
- ReyEndymion (https://github.com/ReyEndymion)
- BrunoSobrino (https://github.com/BrunoSobrino)

*/

/*
⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic (https://github.com/ferhacks)

El codigo de este archivo fue parchado por:
- ReyEndymion (https://github.com/ReyEndymion)
- BrunoSobrino (https://github.com/BrunoSobrino)

*/
//import {onBots} from '../main.js'
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys')
import qrcode from "qrcode"
import fetch from 'node-fetch';
import NodeCache from "node-cache"
import fs from "fs"
import path, { join } from 'path';
import pino from 'pino';
import {Boom} from '@hapi/boom';
import util from 'util' 
import * as ws from 'ws';
import chalk from 'chalk';
const { child, spawn, exec } = await import('child_process');
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js';
import { makeInMemoryStore } from '@whiskeysockets/baileys'
import store from '../lib/store.js'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = "CkphZGlib3QsIEhlY2hv"
let drm2 = "IHBvciBAQWlkZW5fTm90TG9nawmam"

if (global.conns instanceof Array) {console.log()} else {global.conns = []}
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
let lastConnectionMessageTime = 0;
let parentw = conn
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? parentw.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`//parentw.getName(who)
let bot = path.join(jadibts, uniqid)
const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
const drmer = Buffer.from(drm1 + drm2, `base64`)
const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false // stoled from aiden hehe
if (!global.db.data.bot[conn.user.jid].settings.modejadibot) {
let resp = `*[❗INFO❗] ESTE COMANDO ESTA INHABILITADO POR EL ACTUAL OWNER / PROPIETARIO DEL BOT*`
return conn.sendWritingText(m.chat, resp, m)
}
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
})
async function jddt() {
if (mcode) {
args[0] = args[0].replace("--code", "").trim()
if (args[1]) args[1] = args[1].replace("--code", "").trim()
if (args[0] == "") args[0] = undefined
console.log(args[0])}
if (!fs.existsSync(bot)){
fs.mkdirSync(bot, { recursive: true });
} else {

}
const credsBot = path.join(bot, "creds.json")
args[0] ? fs.writeFileSync(credsBot, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, `\t`)) : ""
let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(bot)
const logger = pino({ level: `silent`})
const useStore = !process.argv.includes('--no-store');
const store = useStore ? makeInMemoryStore({ logger }) : undefined;
async function getMessage(key) {
if (store) {
const msg = await store.loadMessage(key?.remoteJid, key?.id);
return msg?.message || undefined;
}
}
async function getMessage2 (key) {
if (store) {
const msg = await store.loadMessage((key.remoteJid), key.id) 
return msg.message || undefined
} else if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id);
return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined;
}
return { conversation: 'recargando mensaje' } || proto.Message.fromObject({})
}

const connectionOptions = {
printQRInTerminal: true,
msgRetry,
msgRetryCache,
version,
syncFullHistory: false,
markOnlineOnConnect: false,
getMessage: (getMessage || getMessage2),
connectTimeoutMs: 60_000,
defaultQueryTimeoutMs: 0,
receivedPendingNotifications: false,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage );
if (requiresPatch) { message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {}, }, ...message, },},};}
return message;},
auth: state,
logger: logger,
browser: ["Ubuntu", "Chrome", "20.0.04"] 
}
let conn = makeWASocket(connectionOptions)
conn.isInit = false
conn.uptime = Date.now();
let isInit = true

function wait(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}
let now = Date.now();
const oneDay = 24 * 60 * 60 * 1000; // 1 día en milisegundos

const MAX_CLOSE_COUNT = 10;
const CLOSE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RESET_INTERVAL = 2 * 60 * 1000; // 2 minutes
let lastQr, shouldSendLogin, errorCount = 0;

async function connectionUpdate(update) {
let i = global.conns.indexOf(conn)
global.timestamp.connect = new Date
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) conn.isInit = false
if (errorCount < 2){
if (qr && !mcode) {
let rtx = `*${wm}*
 *SER SUB-BOT*

*Escanea este codigo QR para convertirte en un Bot (SubBot), puedes usar otro dispositivo para escanear*

*Pasos para escanear:*
*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*
*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*
*3.- Escanee este codigo QR*
*El codigo QR expira en 60 segundos!!*

*—◉ ${wmam} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
if (lastQr) {
await new Promise(resolve => setTimeout(resolve, 20000));
await lastQr.delete() 
}
lastQr = await parentw.sendMessage(m.chat, {image: await qrcode.toBuffer(qr, { scale: 8 }) , caption : rtx + drmer.toString("utf-8")}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
errorCount++
} else if (qr && mcode) {
let rtx2 = `*${wm}*
*SER SUB-BOT*

*El codigo a continuacion se usara para convertirte en un Bot (SubBot)*

*Pasos para realizarlo:*
*Whatsapp te notifica*
*1.- Espere a que salga la notificacion de Whatsapp de vinculacion de dispositivo y a continuacion enviare un codigo de 8 digitos, copie el codigo y busque entre sus notificaciones el mensaje de vinculacion y presione sobre la notificacion, se le solicitara ingresar lois 8 digitos y ahi pegara el codigo. Advertencia!! no entre a la notificacion antes de copiar el codigo por que este codigo no funcionara*

O lo puede intentar:

*2.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp. Toca en donde dice dispositivos vinculados, vincular nuevo dispositivo y elegir vincular con el numero de telefono y el codigo que copio lo pegas en las casillas*
*El codigo expira en 60 segundos!!*

*—◉ ${wm} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
let q = await parentw.sendWritingText(m.chat, rtx2, m)
 await wait(5000)
let secret = await conn.requestPairingCode((m.sender.split`@`[0]))
return parentw.sendWritingText(m.chat, secret, m)
}
}
if (update.receivedPendingNotifications) {
return false
} 
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (global.db.data == null) loadDatabase()
 let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
console.log('jadibotReason: ', reason)
if (connection === 'close') { 
if (code === DisconnectReason.badSession) {
conn.logger.error(`[ ⚠ ] Sesión incorrecta, por favor elimina la carpeta ${authFolderAniMX + '/' + uniqid} y escanea nuevamente.`);
} else if (code === DisconnectReason.connectionClosed) {
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando...`);
if (lastDisconnect?.error && lastDisconnect?.error.output && lastDisconnect?.error.output.statusCode === 428 && lastDisconnect?.error.output.error === 'Precondition Required') {
return global.reloadHandler(bot).catch(console.error)
}
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionLost && now - lastConnectionMessageTime >= oneDay) {
conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`);
let resp = "La conexión se perdio, se intentara reconectar automáticamente..."
await parentw.sendWritingText(m.chat, resp, m)
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionReplaced) {
conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
conn.ws.close()
//delete global.conns[i]
global.conns.splice(i, 1)
let resp = "remplazando conexión actual..."
await parentw.sendWritingText(m.chat, resp, m)
} else if (code === DisconnectReason.loggedOut) {
conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${bot} y escanea nuevamente.`);
let resp = `◉sesion cerrada...\nSe usara deletebot automaticamente:\n\n* ${usedPrefix + 'deletebot'}*`
await parentw.sendWritingText(m.chat, resp, m)
conn.ev.removeAllListeners()
delete global.conns[i]
return deleteSesionSB()
} else if (code === DisconnectReason.restartRequired) {
conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`);
creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
} else if (code === DisconnectReason.timedOut) {
conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`);
let resp = "La conexión se cerró, Tendras que conectarte manualmente..."
await parentw.sendWritingText(m.chat, resp, m)
conn.ev.removeAllListeners()
delete global.conns[i]
creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
} else if (code === 403) {
conn.logger.warn(`[ ⚠ ] Razón de desconexión revisión de whatsapp o soporte. ${code || ''}: ${connection || ''}`);
conn.ev.removeAllListeners()
delete global.conns[i]
deleteSesionSB()
} else if (code === 503) {
return creloadHandler(true).catch(console.error)
} else if (code === 405 ) {
deleteSesionSB()
} else {
conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${code || ''}: ${connection || ''}`);
errorCount++
conn.ev.removeAllListeners()
delete global.conns[i]
creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
}
/*if (errorCount >= MAX_CLOSE_COUNT) {
console.log(chalk.red(`La conexión cerrada ocurrió ${errorCount} veces. Reiniciando el servidor...`));
errorCount = 0;
await wait(RESET_INTERVAL);
} else {
await wait(CLOSE_CHECK_INTERVAL);
}
conn.ev.removeAllListeners()
delete global.conns[i]
global.conns.splice(i, 1)
errorCount++
*/
} 
if (connection == 'open' && code !== 401) {
conn.isInit = true
global.conns.push(conn.user)
if (now - lastConnectionMessageTime >= oneDay) {
} 
let resp = `*[❗] Ya estas conectado, se paciente los mensajes se estan cargando...*\n\n*—◉ Para detener tu Bot debes usar el comando:*\n\n*—◉ ${usedPrefix + 'stop'}*\n\n*—◉ Para dejar de ser Bot puedes usar:*\n\n*◉ ${usedPrefix + 'deletebot'}*\n\n*Nota:* Primero tienes que utilizar el comando ${usedPrefix + 'stop'} para detener tú Bot, y posteriormente debes borrar desde dispositivos vinculados la sesión abierta de WhatsApp\n\n*—◉ Para volver a ser Bot y reescanear el codigo QR puedes usar:*\n\n*◉ ${usedPrefix + command}*\n\n*Nota:* tienes que haber hecho ya el procedimiento para borrar la sesión anterior\n\n*—◉ Si deseas solicitar tu token para conectarlo desde cualquier número puedes usar:*\n*◉ ${usedPrefix + 'codetoken'}*\n\nPara volver a conectarte usa ${usedPrefix + command}*\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub-bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot....` + `\n\n${global.timestamp.connect = new Date}`
let qq = await parentw.sendWritingText(m.chat, resp, m)

let chat = conn.user.jid
if (qq) {
let lang = `hello ${chat.split`@`[0]}\n\n` + mensajeidioma.trim()
await conn.sendWritingText(chat, resp, qq)
}
try {
let resp = `*${suppbot}*\n\n @${chat.split`@`[0]} este es el grupo donde daremos avisos para los bots nuevos y sub-bots\n\n`
await conn.sendWritingText(m.chat, resp, m);
 wait(40000)
return conn.groupAcceptInvite(suppbot.replace('https://chat.whatsapp.com/', ''));
} catch (error) {
console.log('Error al enviar invitación del grupo:', error);
}
//if (update.receivedPendingNotifications === true) return wait (10000)
//onBots(authFolderAniMX + '/' + uniqid)
wait(8000000)
//process.send('reset');
}
lastConnectionMessageTime = now;

}
	setInterval(async () => {
if (!conn.user) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()

let i = global.conns.indexOf(conn)
						
 if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)


async function deleteSesionSB() {
console.log(chalk.yellow(`🚩ㅤConexion cerrada, borrando la carpeta ${bot} automaticamente`));
return fs.rmSync(bot, { recursive: true, force: true })
}
		 
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
																				 
} catch (e) {
console.error(e)
}
if (restatConn) {
//const oldChats = conn.chats
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions//, { chats: oldChats }
)
conn.uptime = Date.now();
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.handler = handler.handler.bind(conn)
conn.participantsUpdate = handler.participantsUpdate.bind(conn)
conn.groupsUpdate = handler.groupsUpdate.bind(conn)
conn.onDelete = handler.deleteUpdate.bind(conn)
conn.onCall = handler.callUpdate.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
conn.ev.on('message.delete', conn.onDelete)
conn.ev.on('call', conn.onCall)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
wait(3000)
//process.send('reset');
return true
}
creloadHandler(false)
/**
*/
}
jddt()
}
handler.help = ['jadibot', 'serbot', 'getcode', 'rentbot']
handler.tags = ['jadibot']
handler.command = /^(jadibot|serbot|rentbot)/i
handler.private = true 
export default handler
/***Proteccion para bot principal
if (conn.user.jid !== global.conn.user.jid) {
let resp = `*[❗] Este comando solo puede ser usado en un Bot principal!!*\n\n*—◉ Da click aquí o en la imagen para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}
let contextInfo = {
mentionedJid: conn.parseMention(txt),
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"renderLargerThumbnail": true,
"title": wmam, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": imagen1am,//apii.res.url,
"mediaUrl": `https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`,
"sourceUrl": `https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`
}
}
return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
}
 */
