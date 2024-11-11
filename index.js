console.log('✅ㅤIniciando...')
import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the hability to create the 'require' method
const { name, author, description } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('🌎ANI MX SUB-BOTS🌏\nWA - Bots Multi-Instancia - MD', {
font: 'chrome',
align: 'center',
gradient: ['red', 'magenta']
})
say(`'${name}' By @${author.name || author}`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})

var isRunning = false

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
async function start(file, message) {
return new Promise((resolve, reject) => {
const args = [join(__dirname, file), ...process.argv.slice(2)];
if (message === undefined) message = `cargando ${file}... `
say(message, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})

setupMaster({
exec: args[0],
args: args.slice(1),
});

let p = fork();

p.on('message', data => {
console.log('[RECEIVED]', data);
switch (data) {
case 'reset':
p.removeAllListeners();
rl.removeAllListeners('line');
p.kill();
console.log(`🔄 Reiniciando proceso '${file}'...`);
start(file, message).then(resolve).catch(reject);
break;
case 'uptime':
if (p.process.connected) p.send(process.uptime());
break;
}
});

p.on('exit', (code, signal) => {
console.error(`❎ㅤEl proceso '${file}' ha salido con código de error ${signal || code}`);
p.removeAllListeners();
//rl.removeAllListeners('line');
if (code !== 0 || signal === 'SIGKILL') {
p.removeAllListeners();
rl.removeAllListeners('line');
p.kill();
console.log(`🔄 Reiniciando proceso '${file}'...`);
start(file, message).then(resolve).catch(reject);
} else {
process.exit(code);
}
});

p.on('error', (err) => {
console.error(`Error en el proceso hijo: ${err.code}`);
if (err.code === 'EPIPE') {
console.error('El canal de comunicación está cerrado.');
p.removeAllListeners();
rl.removeAllListeners('line');
p.kill();
console.log(`🔄 Reiniciando proceso '${file}'...`);
}
});

const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
if (!opts['test']) {
rl.removeAllListeners('line');
rl.on('line', line => {
//console.log('index:', p);
if (p.process.connected) {
p.emit('message', line.trim());
//p.send(line.trim());
} else {console.log('El proceso no está conectado. No se pudo enviar el comando.');}
});
}
});
}

start('main.js')
