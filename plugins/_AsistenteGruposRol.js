export async function before(m, {conn}) {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

if (/ficha$/i.test(m.text) && chat.gruposrol && !chat.isBanned) {
 let resp = 	
`❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
 *_𐂡MAGIC MEDIEVAL TECNOLOGÍ𐂡_*
❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
*~_FICHA ÚNICA DE PERSONAJE, EVITE LA PERDIDA DE SU FICHA AL COMPLETARLA_~*

*_✿:･NIVEL DEL PERSONAJE･:✿_*
_(No modificar)_

⌦NIVEL ACTUAL:1

*_✿:･EXPERIENCIA DEL PERSONAJE･:✿_*
_(No modificar)_

⌦(0/50)

*_✿:･OBJETOS DEL PERSONAJE･:✿_*
_(No modificar)_

⌦

*_✿:･DINERO DEL PERSONAJE･:✿_*
_(no modificar)_

⌦100(Moneda única en el rol)

*_✿:･NOMBRE DEL PERSONAJE･:✿_*

⌦

*_✿:･EDAD DEL PERSONAJE･:✿_*

⌦

*_✿:･SEXO Y ORIENTACIÓN SEXUAL DEL PERSONAJE･:✿_*

⌦

*_✿:･ESTATURA DEL PERSONAJE･:✿_*

⌦

*_✿:･RAZA U/O ESPECIE DE PERSONAJE･:✿_*

⌦

*_✿:･ELEMENTO DE CONTROL･:✿_*
_(es solo un elemento por personaje)_

⌦

*_✿:･SECCION DE HABILIDADES･:✿_*

*_➛ HABILIDADES MÁGICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛HABILIDAD FISICA_*

⌦

*_HABILIDADES COMUNES_*

⌦
⌦
⌦
⌦
⌦

*_✿:･SECCION DE DEBILIDADES･:✿_*
⌦
⌦
⌦
⌦

*_➛DEBILIDADES MÁGICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛DEBILIDADES FISICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛INEPTITUDES DEL PERSONAJE_*


⌦
⌦
⌦
⌦
⌦

*_✿:･ARMAS PORTADAS O EQUIPADAS DEL PERSONAJE･:✿_*


⌦
⌦
⌦
⌦
⌦

*_✿:･APARIENCIA DEL PERSONAJE･:✿_*
Imagen o descripción 


*_✿:･HISTORIA DE PERSONAJE･:✿_*

⌦`.trim()
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 20));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

} 

}
