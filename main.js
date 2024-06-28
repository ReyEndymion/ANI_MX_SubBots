process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = true;
import './config.js';
import { createRequire } from 'module'; 
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws';
import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename, writeFile } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import util, { format } from 'util';
import pino from 'pino';
import {Boom} from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
const {proto} = (await import('@whiskeysockets/baileys')).default;
const {makeInMemoryStore, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore} = await import('@whiskeysockets/baileys');
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = { start: new Date };
const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.loadDatabase = async function loadDatabase(conn) {
const dbSession = path.join(dataBases, conn?.user?.jid.split('@')[0])
if (!existsSync(dbSession)) {
mkdirSync(dbSession)
}
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}${dbSession}/database.json`));

global.DATABASE = global.db; 
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase(conn) : global.db.data);
}
}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
bot: {
[conn?.user?.jid]: {
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
}
},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};

const creds = 'creds.json'
const readJadibtsSession = fs.readdirSync(jadibts)

const dirSessionsAni = []

for (const session of readJadibtsSession) {
const bot = path.join(jadibts, session)
dirSessionsAni.push(bot);
}
dirSessionsAni.push(authFolder)

for (const botPath of dirSessionsAni) {
const readBotPath = fs.readdirSync(botPath)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(botPath, creds)
try {
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
const userJid = readCreds && readCreds.me && readCreds.me.jid.split('@')[0]
const currentFolderName = path.basename(botPath);
const botDirRespald = path.join(global.authFolderRespald, userJid)

if (currentFolderName !== userJid && currentFolderName !== sessionNameAni) {
const newBotPath = path.join(path.dirname(botPath), userJid);
fs.renameSync(botPath, newBotPath);
console.log(`Carpeta renombrada desde ${currentFolderName} a ${userJid}`);
}

if (credsStatus(botPath, userJid) && validateJSON(filePathCreds)) {
backupCreds(botPath, botDirRespald)
onBots(botPath)
} else {
const readBotDirBackup = fs.readdirSync(botDirRespald)
if (readBotDirBackup.includes(creds)) {
const fileCredsResp = path.join(botDirRespald, creds)
if (backupCredsStatus(botDirRespald) && validateJSON(fileCredsResp)) {
respaldCreds(botPath, botDirRespald)
} else {
cleanupOnConnectionError(botPath, botDirRespald)
}
} else {
cleanupOnConnectionError(botPath, botDirRespald)
}
}
continue
} catch (error) {
console.log('errorInicializacion: ', error)
}
} else if (!readJadibtsSession.length) {
onBots(authFolder)
}
}

function validateJSON(filePath) {
let statsCreds = fs.statSync(filePath);
if (statsCreds && statsCreds.size !== 0) {
try {
const data = fs.readFileSync(filePath, 'utf8');
let readCreds = JSON.parse(data);
if (readCreds && readCreds.me && readCreds.me.jid && readCreds.hasOwnProperty('platform')) {
console.log(`El archivo JSON de la carpeta ${filePath} es válido.`);
return true
}
} catch (error) {
console.error('Error de sintaxis en JSON:', error.message);
return false
}
} else {
console.log(`El archivo JSON de la carpeta ${filePath} es inválido.`);
}
}

async function backupCreds(pathSession, pathBackUp) {
if (!fs.existsSync(pathBackUp)) {
fs.mkdirSync(pathBackUp)
console.log(`Directorio del backup ${pathBackUp} creado exitosamente'`);
}
const credsFilePath = path.join(pathSession, creds)
const backupFilePath = path.join(pathBackUp, creds)
copyFileSync(credsFilePath, backupFilePath);
console.log(`Creado el archivo de respaldo: ${backupFilePath}`);

}
 
async function respaldCreds(pathSession, pathBackUp) {
if (!existsSync(pathSession)) {
mkdirSync(pathSession);
console.log(`Directorio de la sesion ${pathSession} creado exitosamente'`);
}
const fileCredsResp = path.join(pathBackUp, creds)
const fileCreds = path.join(pathSession, creds)
copyFileSync(fileCredsResp, fileCreds, 2);
console.log(`Restaurado el archivo desde el respaldo: ${fileCredsResp} -> ${fileCreds}`);
process.send('reset')
}
async function credsStatus(pathSession, userJid) {
try {
const filesSession = fs.readdirSync(pathSession);
if (filesSession.includes(creds)) {
const credsFilePath = path.join(pathSession, creds)
const statsCreds = fs.statSync(credsFilePath);
if (statsCreds && statsCreds.size !== 0) {
try {
const readCreds = JSON.parse(fs.readFileSync(credsFilePath));
if (readCreds && readCreds.me && readCreds.me.jid && readCreds.hasOwnProperty('platform')) {
return `Archivo creds correcto para ${userJid}. Se realizó un backup.`, true;
} else {
return `El Archivo de sesion de ${userJid} no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} catch (error) {
return `El Archivo de sesion de ${userJid} no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`, false;
}
} else {
return `El Archivo de sesion de ${userJid} es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} else {
return `El Archivo de sesion de ${userJid} no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} catch (error) {
return console.log('credsStatusError: ', error)
}
}
/**
 
 */
function backupCredsStatus(pathBackUp) {
if (existsSync(pathBackUp)) {
const readDirRespald = fs.readdirSync(pathBackUp);
if (readDirRespald.includes(creds)) {
const backupFilePath = path.join(pathBackUp, creds)
const statBackUpCreds = fs.statSync(backupFilePath);
if (statBackUpCreds.size !== 0) {
try {
const readCredsResp = JSON.parse(fs.readFileSync(backupFilePath));
if (readCredsResp && readCredsResp.me && readCredsResp.me.jid && readCredsResp.hasOwnProperty('platform')) {
return 'Archivo de respaldo es correcto, puede respaldar la sesion si gusta', true
} else {
return 'Archivo de respaldo no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} catch (error) {
return `El Archivo de respaldo no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`, false;
}
} else {
return 'Archivo de respaldo es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} else {
return 'Archivo de respaldo no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} else {
return 'La carpeta Backup de credenciales no existe, debe realizar un respaldo desde el archivo original', false;
}
}

function cleanupOnConnectionError(pathSession, pathBackUp) {

readdirSync(pathSession).forEach(file => {
const credsFilePath = path.join(pathSession, file);
try {
rmSync(pathSession, { recursive: true, force: true });
console.log(`Archivo eliminado: ${credsFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo: ${credsFilePath}`);
}
});
const backupFilePath = path.join(pathBackUp, creds);
try {
rmSync(pathBackUp, { recursive: true, force: true });
console.log(`Archivo de copia de seguridad eliminado: ${backupFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo de copia de seguridad o no existe: ${backupFilePath}`);
}
process.send('reset')
}


global.conns = []

export async function onBots(folderPath) {
const { state, saveState, saveCreds } = await useMultiFileAuthState(folderPath);
const msgRetryCounterMap = (MessageRetryMap) => { };
const {version} = await fetchLatestBaileysVersion();
const logger = pino({level: 'silent'})
const storeReload = makeInMemoryStore({logger})
async function getMessage(key) {
if (storeReload) {
const msg = await storeReload.loadMessage(key?.remoteJid, key?.id);
return msg.message || proto.Message.fromObject({}) || undefined;
}
}

async function patchMessageBeforeSending(message) {
const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage || message.interactiveMessage );
if (requiresPatch) {
message = {viewOnceMessage: {message: {messageContextInfo: {deviceListMetadataVersion: 2, deviceListMetadata: {}}, ...message}}};
}
return message;
}

const connectionOptions = {
printQRInTerminal: true,
patchMessageBeforeSending,
getMessage,
msgRetryCounterMap,
logger,
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, logger),
},
browser: ['ANI MX SCANS','Edge','1.0.0'],
version,
defaultQueryTimeoutMs: undefined,
};

if (global.conns instanceof Array) {console.log()} else {global.conns = []}
global.conn = makeWASocket(connectionOptions)
conn.isInit = false;
conn.well = false;
loadDatabase(global.conn);
const botJid = state.creds.me.jid.split('@')[0]
const botDirRespald = path.join(global.authFolderRespald, botJid)

if (!opts['test']) {
if (global.db) {
setInterval(async () => {
if (global.db.data) {
await global.db.write()
}
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000);
}
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);



function waitTwoMinutes() {
return new Promise(resolve => {
setTimeout(() => {
resolve();
}, 2 * 60 * 1000); 
});
}
function wait(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_CLOSE_COUNT = 10;
const CLOSE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RESET_INTERVAL = 2 * 60 * 1000; // 2 minutes
let consecutiveCloseCount = 0

async function connectionUpdate(update) {
let i = global.conns.indexOf(conn)
global.timestamp.connect = new Date
const { connection, lastDisconnect, isNewLogin } = update;
if (isNewLogin) conn.isInit = true;
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState == null || undefined || CONNECTING) {
await global.reloadHandler(true).catch(console.error);
}
if (global.db?.data == null && conn?.user?.jid !== undefined) loadDatabase(conn);
if (update.qr != 0 && update.qr != undefined) {
console.log(chalk.yellow('🚩ㅤEscanea este codigo QR, el codigo QR expira en 60 segundos.'));
}
if (conn?.ws?.readyState === CONNECTING || conn?.ws?.readyState === undefined) {
console.log(chalk.red(`La conexión se esta estableciendo: ${connection}`));
}
if (connection === undefined) {

await wait(5000); 
if (conn?.ws?.readyState !== CONNECTING && conn?.ws?.readyState !== undefined) {
console.log(chalk.yellow(`La conexión ya está abierta: ${connection}`));
} else {
await wait(10000)
console.log(chalk.red(`La conexión aún no está lista, esperando conexión: ${connection}`));
}
return;

}
const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
if (connection == 'close') {
if (reason === DisconnectReason.badSession) {
conn.logger.error(`[ ⚠ ] ${botJid} Sesión incorrecta, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
cleanupOnConnectionError()
//process.exit();
} else if (reason === DisconnectReason.preconditionRequired){
conn.logger.warn(`[ ⚠ ] ${botJid} Conexión cerrada, reconectando por precondicion...`);
global.reloadHandler(true).catch(console.error)
return
} else if (reason === DisconnectReason.connectionClosed) {
conn.logger.warn(`[ ⚠ ] ${botJid} Conexión cerrada, reconectando...`);
global.reloadHandler(true).catch(console.error)
return
//process.send('reset');
} else if (reason === DisconnectReason.connectionLost) {
conn.logger.warn(`[ ⚠ ] ${botJid} Conexión perdida con el servidor, reconectando...`);
global.reloadHandler(true).catch(console.error)
return
 // process.send('reset');
} else if (reason === DisconnectReason.connectionReplaced) {
conn.logger.error(`[ ⚠ ] ${botJid} Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
conn.ws.close()
//delete global.conns[i]
global.conns.splice(i, 1)
//process.exit();
} else if (reason === DisconnectReason.loggedOut) {
conn.logger.error(`[ ⚠ ] ${botJid} Conexion cerrada, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
conn.ev.removeAllListeners()
delete global.conns[i]
cleanupOnConnectionError()
//process.exit();
} else if (reason === DisconnectReason.restartRequired) {
conn.logger.info(`[ ⚠ ] ${botJid} Reinicio necesario, reinicie el servidor si presenta algún problema.`);
//process.send('reset');
} else if (reason === DisconnectReason.timedOut) {
conn.logger.warn(`[ ⚠ ] ${botJid} Tiempo de conexión agotado, reconectando...`);
conn.ev.removeAllListeners()
delete global.conns[i]
process.send('reset');
} else if (reason === 403) {
conn.logger.warn(`[ ⚠ ] ${botJid} Razón de desconexión revisión de whatsapp o soporte. ${reason || ''}: ${connection || ''}`);
cleanupOnConnectionError()
} else if (code === 503){
global.reloadHandler(true).catch(console.error)
} else {
conn.logger.warn(`[ ⚠ ] ${botJid} Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`);
//process.exit();
conn.ev.removeAllListeners()
delete global.conns[i]
consecutiveCloseCount++;
console.log(chalk.yellow(`🚩ㅤConexion cerrada para ${botJid} , por favor borre la carpeta ${folderPath} y reescanee el codigo QR`));
}
if (consecutiveCloseCount >= MAX_CLOSE_COUNT) {
console.log(chalk.red(`La conexión cerrada ocurrió ${consecutiveCloseCount} veces. Reiniciando el servidor...`));
consecutiveCloseCount = 0;
await wait(RESET_INTERVAL);
} else {
await wait(CLOSE_CHECK_INTERVAL);
}
}
if (connection == 'open') {
conn.isInit = true
global.conns.push(conn)
console.log(chalk.yellow(`▣─────────────────────────────···\n│\n│❧ ${botJid}CONECTADO CORRECTAMENTE AL WHATSAPP ✅\n│\n▣─────────────────────────────···`))
if (update.receivedPendingNotifications) { 
waitTwoMinutes()
return conn.groupAcceptInvite('HbC4vaYsvYi0Q3i38diybA');
}
}
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

process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats;
try {
global.conn.ws.close();
} catch { }
conn.ev.removeAllListeners();
global.conn = makeWASocket(connectionOptions, { chats: oldChats });
isInit = true;
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler);
conn.ev.off('group-participants.update', conn.participantsUpdate);
conn.ev.off('groups.update', conn.groupsUpdate);
conn.ev.off('message.delete', conn.onDelete);
conn.ev.off('call', conn.onCall);
conn.ev.off('connection.update', conn.connectionUpdate);
conn.ev.off('creds.update', conn.credsUpdate);
}

conn.handler = handler.handler.bind(global.conn);
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
conn.onDelete = handler.deleteUpdate.bind(global.conn);
conn.onCall = handler.callUpdate.bind(global.conn);
conn.connectionUpdate = connectionUpdate.bind(global.conn);
conn.credsUpdate = saveCreds.bind(global.conn, true);

conn.ev.on('messages.upsert', conn.handler);
conn.ev.on('group-participants.update', conn.participantsUpdate);
conn.ev.on('groups.update', conn.groupsUpdate);
conn.ev.on('message.delete', conn.onDelete);
conn.ev.on('call', conn.onCall);
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);
conn.ev.on('chats.set', () => {
console.log('got chats', storeReload.chats.all())
})

conn.ev.on('contacts.set', () => {
console.log('got contacts', Object.values(storeReload.contacts))
})
isInit = false;
return true;
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
let file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then(_ => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(`plugin actualizado - '${filename}'`)
else {
conn.logger.warn(`plugin eliminado - '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`nuevo plugin - '${filename}'`)
let err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true
})
if (err) conn.logger.error(`Error de sintaxis mientras se carga '${filename}'\n${format(err)}`)
else try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(`Hay un error que requiere atención en '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
let test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version'])
].map(p => {
return Promise.race([
new Promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})}),
new Promise(resolve => {
p.on('error', _ => resolve(false))
})])}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
Object.freeze(global.support)
}


function purgeSession(folderPath) {

let prekey = []
let directorio = readdirSync(folderPath)
let filesFolderPreKeys = directorio.filter((file) => {
if (file.startsWith('pre-key-')) {
return true 
}
const stats = statSync(path.join(folderPath, file))
const mtime = new Date(stats.mtime);
const now = new Date();
const hourAgo = new Date(now - 60 * 60 * 1000);
return (
(file.startsWith('sender-key-') ||
file.startsWith('sender-key-memory-') ||
file.startsWith('sender-key-status@broadcast') ||
file.startsWith('session')) &&
mtime <= hourAgo
)
})
if (filesFolderPreKeys.length === 0) {
console.log("Ningún archivo encontrado");
} else {
filesFolderPreKeys.forEach((files) => {
prekey.push(files);
unlinkSync(path.join(folderPath, files));

})
}
}


function purgeOldFiles(folderPath) {
const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));
readdirSync(folderPath, (err, files) => {
if (err) throw err;
files.forEach((file) => {
const filePath = path.join(dir, file);
statSync(filePath, (err, stats) => {
if (err) throw err;
const createTime = new Date(stats.birthtimeMs);
const modTime = new Date(stats.mtimeMs);
const isOld = createTime < oneHourAgo || modTime < oneHourAgo;
const isCreds = file === 'creds.json';
if (stats.isFile() && isOld && !isCreds) {
unlinkSync(filePath, (err) => {
if (err) throw err;
});
} else {
}
});
});
});
}

setInterval(async () => {
backupCreds(folderPath, botDirRespald)
console.log(chalk.whiteBright(`\n▣────────[ BACKUP_CREDS ]───────────···\n│\n▣─❧ RESPALDO EXITOSO ✅\n│\n▣────────────────────────────────────···\n`))
}, 15 * 60 * 1000)
setInterval(async () => {
clearTmp()
console.log(chalk.cyanBright(`\n▣────────[ AUTOCLEARTMP ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 3)
setInterval(async () => {
 purgeSession()
 console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_SESSIONS_SUB-BOTS ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)
setInterval(async () => {
 purgeOldFiles()
console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)


_quickTest()
.then(() => conn.logger.info(`CARGANDO．．．\n`))
.catch(console.error)
}

function clearTmp() {
const tmp = [join(__dirname, 'tmp')]
const filename = []
tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
return filename.map(file => {
const stats = statSync(file)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
return false })
}

global.cleanFolders = async function limpCarpetas() {
const directories = [jadibts, authFolderRespald, dataBases];
try {
 directories.forEach((dir) => {
const files = readdirSync(dir, { recursive: true });
files.forEach((file) => {
const filePath = path.join(dir, file);
const stats = statSync(filePath);
const tiempoTranscurrido = Date.now() - stats.mtimeMs;

if ( dir === jadibts || dir === authFolderRespald ) {
if (stats.isDirectory()) {
const contenidoCarpeta = readdirSync(filePath);

if (contenidoCarpeta.length === 0) {
 rmSync(filePath, { recursive: true, force: true });
console.log( `Carpeta ${filePath} eliminada.`);
if (filePath.startsWith(authFolderAniMX)) {
process.send('reset')
}
} else {

if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
 rmSync(filePath, { recursive: true, force: true });
console.log(`Carpeta ${filePath} eliminada.`);
}
}
}
} else if (dir === dataBases ) {
if (stats.isDirectory()) {

if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
 rmSync(filePath, { recursive: true, force: true });
console.log(`Carpeta ${filePath} eliminada.`);
}
}
}
});
});
} catch (error) {
console.error(`Error al eliminar directorios:\n\n${error}`);
}
}
setInterval(async () => {
global.cleanFolders()
console.log(chalk.cyanBright(`\n▣────────[ LIMPIAR CARPETAS ]───────────···\n│\n▣─❧ CARPETAS VACIAS Y ANTIGUAS ELIMINADAS ✅\n│\n▣────────────────────────────────────···\n`))
}, 30 * 10000);
