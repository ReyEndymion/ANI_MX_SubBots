let handler = async (m, { conn, text, usedPrefix, command, customPrefix }) => {
let stikerwelgc = "./src/welgc.webp"
let stikerbyegc = "./src/byegc.webp"
if (command == 'welcomegc') {
conn.sendFile(m.chat, stikerwelgc, 'welgc.webp', null, m, { asSticker: true })
}
if (command == 'byegc') {
conn.sendFile(m.chat, stikerbyegc, 'byegc.webp', null, m, { asSticker: true })
}}
handler.command = ['welcomegc', 'byegc']
export default handler
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}
