import daily from './rpg-daily.js' 
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'
import adventure from './rpg-adventure.js'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'

import moment from 'moment-timezone'
import fs from 'fs'

const inventory = {
	
  others: {
    level: true,
    limit: true,
    health: true,
    money: true,
    exp: true
  },
  items: {
    semillasdeuva: true,
    semillasdemango: true,
    semillasdeplatano: true,
    semillasdemanzana: true,
    semillasdenaranja: true,
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
    upgrader: true
  },
  durabi: {
    sworddurability: true,
    pickaxedurability: true,
    fishingroddurability: true,
    armordurability: true
  },
  tools: {
    armor: {
      '0': '❌',
      '1': 'Leather Armor',
      '2': 'Iron Armor',
      '3': 'Gold Armor',
      '4': 'Diamond Armor',
      '5': 'Emerald Armor',
      '6': 'Crystal Armor',
      '7': 'Obsidian Armor',
      '8': 'Netherite Armor',
      '9': 'Wither Armor',
      '10': 'Dragon Armor',
      '11': 'Hacker Armor'
    },
    sword: {
      '0': '❌',
      '1': 'Wooden Sword',
      '2': 'Stone Sword',
      '3': 'Iron Sword',
      '4': 'Gold Sword',
      '5': 'Copper Sword',
      '6': 'Diamond Sword',
      '7': 'Emerald Sword',
      '8': 'Obsidian Sword',
      '9': 'Netherite Sword',
      '10': 'Samurai Slayer Green Sword',
      '11': 'Hacker Sword'
    },
    pickaxe: {
      '0': '❌',
      '1': 'Wooden Pickaxe',
      '2': 'Stone Pickaxe',
      '3': 'Iron Pickaxe',
      '4': 'Gold Pickaxe',
      '5': 'Copper Pickaxe',
      '6': 'Diamond Pickaxe',
      '7': 'Emerlad Pickaxe',
      '8': 'Crystal Pickaxe',
      '9': 'Obsidian Pickaxe',
      '10': 'Netherite Pickaxe',
      '11': 'Hacker Pickaxe'
    },
    fishingrod: true

  },
  crates: {
    common: true,
    uncoommon: true,
    mythic: true,
    pet: true,
    legendary: true
  },
  pets: {
    horse: 10,
    gato: 10,
    zorro: 10,
    dog: 10,
    robo: 10,
    lion: 10,
    rhinoceros: 10,
    dragon: 10,
    centauro: 10,
    kyubi: 10,
    griffin: 10,
    phonix: 10,
    wolf: 10
  },
  cooldowns: {
    lastclaim: {
      name: 'claim',
      time: daily.cooldown
    },
    lastweekly: {
    	name: 'weekly',
        time: weekly.cooldown
        },
    lastmonthly: {
      name: 'monthly',
      time: monthly.cooldown
    },
    lastadventure: {
      name: 'adventure',
      time: adventure.cooldown
    }
  }
}
let handler = async (m, { conn, args, command, jid, text, usedPrefix }) => {
  if (m.chat.endsWith(userID)) return
  let chats = global.db.data.bot[conn.user.jid].chats
  let chat = chats.groups[m.chat] || {}
  let users = chat.users || {}
  let user = users[m.sender] || {}
    
//let imgr = flaaa.getRandom()
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (typeof users[who] == "Sin Datos | No Dates") {
      users[who] = {
        exp: 0,
        limit: 20,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Novato',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
     
if (!args[0]) {
let resp =	`✨ *AVERIGUA EL INVENTARIO QUE TIENES*

${comienzo}INVENTARIO${fin}

"დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘙𝘛𝘐𝘊𝘜𝘓𝘖𝘚 : 𝘐𝘛𝘌𝘔𝘚" usa: ${ usedPrefix + command } ' 1'}
"დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘉𝘈𝘛𝘌 : 𝘊𝘖𝘔𝘉𝘈𝘛" usa: ${usedPrefix + command} + ' 2'}
"დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘔𝘐𝘚𝘐𝘖𝘕𝘌𝘚 : 𝘔𝘐𝘚𝘚𝘐𝘖𝘕" usa: ${usedPrefix + command} + ' 3'}
"დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘗𝘓𝘌𝘛𝘖 : 𝘚𝘜𝘗𝘗𝘓𝘐𝘌𝘚" usa: ${usedPrefix + command} + ' 4'

${comienzo} ALIMENTOS Y ANIMALES ${fin}

"ღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘓𝘐𝘔𝘌𝘕𝘛𝘖𝘚 𝘠 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 : 𝘍𝘖𝘖𝘋" usa: ${usedPrefix}alimentos
{title: "ღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 𝘈𝘛𝘙𝘈𝘗𝘈𝘋𝘖𝘚 : HUNT" usa: ${usedPrefix}animales`

/*
const listMessage = {
  text: `✨ *AVERIGUA EL INVENTARIO QUE TIENES*\n✨ *FIND OUT YOUR INVENTORY*`,
  footer: global.wm,
  title: `*»»—— ֎ INVENTARIO : INVENTORY ֎ —-««*`,
  buttonText: `🔖 SELECCIONE AQUÍ 🔖`,
  sections
}
*/
let bottime = `${name} TIME: ${moment.tz('America/Bogota').format('HH:mm:ss')}`//America/Los_Angeles
let ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 99, status: 1, surface: 1, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
let fgif = {
            key: {
                 participant : '0@s.whatsapp.net'},
            message: { 
                        "videoMessage": { 
                        "title": wm,
                        "h": `Hmm`,
                        'seconds': '999999999', 
                        'gifPlayback': 'true', 
                        'caption': bottime,
                        'jpegThumbnail': imagen2am
                               }
                              }
                             }
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//    await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})
  }

if (args[0] == '1') { // Inventario 1
	
let member = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let healt = member.health
let level = member.level
let rol = member.role
let pasangan = member.pasangan
let warn = member.warn
let money = member.money
let exp = member.exp
let token = member.joincount
let dia = member.limit
let tiketm = member.healtmonster

    let sortedmoney = Object.entries(users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedmakananpet = Object.entries(users).sort((a, b) => b[1].makananpet - a[1].makananpet)
    let sortedbatu = Object.entries(users).sort((a, b) => b[1].batu - a[1].batu)
    let sortediron = Object.entries(users).sort((a, b) => b[1].iron - a[1].iron)
    let sortedkayu = Object.entries(users).sort((a, b) => b[1].kayu - a[1].kayu)
    let sortedstring = Object.entries(users).sort((a, b) => b[1].string - a[1].string)
    let sortedcommon = Object.entries(users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncoommon = Object.entries(users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
    let sortedmythic = Object.entries(users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(users).sort((a, b) => b[1].legendary - a[1].legendary)
    let sortedpet = Object.entries(users).sort((a, b) => b[1].pet - a[1].pet)
    let usersmoney = sortedmoney.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let usersmakananpet = sortedmakananpet.map(v => v[0])
    let usersbatu = sortedbatu.map(v => v[0])
    let usersiron = sortediron.map(v => v[0])
    let userskayu = sortedkayu.map(v => v[0])
    let usersstring = sortedstring.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncoommon = sorteduncoommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let userspet = sortedpet.map(v => v[0])
    
    let { min, max } = xpRange(level, global.multiplier)
    let pareja = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].pasangan
	
let str = `
🏷️ *INVENTARIO | INVENTORY* 
👤» *${name}* ( @${who.split("@")[0]} )\n
╭━━━━━━━━━⬣
┃ *INVENTARIO DE ARTICULOS* 
┃ *𝙄𝙏𝙀𝙈 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Level » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${member.premium ? "✅ VIP : Premium": "Limitado : Free"}*
┃ 🏦 *Banco : Bank » ${member.bank}*
┃ 💞 *Pareja : MyLove* 
┃ *» ${pasangan ? `${name} 💝 ${conn.getName(pareja)}` : `❌`}*
┃ ⚠️ *Advertencia : Warn » ${warn}/4*
┃ 🚷 *Baneado(a) : Banned » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ PRODUCTOS VALIOSOS
┃ VALUABLE PRODUCTS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *AMXcoins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${member.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${member.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${member.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${member.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${member.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${member.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${member.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${member.cupon}*
┃ 📉 *Gastos : Expg » ${member.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ SUPERVIVENCIA
┃ SURVIVAL ITEM
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${member.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${member.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${member.trash}*
┃ *${rpgshop.emoticon('wood')} » ${member.wood}*
┃ *${rpgshop.emoticon('rock')} » ${member.rock}*
┃ *${rpgshop.emoticon('batu')} » ${member.batu}*
┃ *${rpgshop.emoticon('string')} » ${member.string}*
┃ *${rpgshop.emoticon('iron')} » ${member.iron}*
┃ *${rpgshop.emoticon('coal')} » ${member.coal}*
┃ *${rpgshop.emoticon('botol')} » ${member.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${member.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${member.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ OBJETOS MISTERIOSOS
┃ MYSTERIOUS OBJECTS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${member.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${member.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${member.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${member.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${member.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${member.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${member.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${member.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${member.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${member.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${member.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${member.ramuan}*
┃ *🧭 Reloj : Reloj » ${member.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top AMXcoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
\n
*⚠️ Advertido(a) : Warn » ${warn}*
*🚫 Baneado(a) : Banned » ${member.banned ? '✅' : '❌'}*\n`.trim()

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
let resp = `*PREMIUM ${member.premium ? "✅": "❌"}*\n${wm}` + str  + `Inventario` + `🤺 _Inventario de combate_ => ${usedPrefix}inventario 2\n🏕️ Aventurar => ${usedPrefix}adventure\n💗 _Menu Aventura | RPG_ => ${usedPrefix}rpg`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//conn.reply(m.chat, str, m)
//await conn.sendButton(m.chat, `*PREMIUM ${member.premium ? "✅": "❌"}*\n${wm}`, str, imgr + `Inventario : Inventory`, [[`🤺 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘾𝙤𝙢𝙗𝙖𝙩𝙚`, `${usedPrefix}inventario 2`],[`🏕️ Aventurar | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`], ['💗 _Menu Aventura | RPG_', ${usedPrefix}rpgmenu']], fkontak, m, { mentions: conn.parseMention(str) })
	
} else if (args[0] == '2') { // Inventario 2

let user = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let healt = user.health

let pickaxe = user.pickaxe
let sword = user.sword
let armor = user.armor
let fishingrod = user.fishingrod

let kuda = user.kuda
let rubah = user.rubah
let kucing = user.kucing
let anjing = user.anjing

let _rubah = user.anakrubah
let _kucing = user.anakkucing
let _kuda = user.anakkuda
let _anjing = user.anakanjing

//armor
let adurability = user.armordurability
//sword
let sdurability = user.sworddurability
//pickaxe
let pdurability = user.pickaxedurability

let pancing = user.pancing
let fdurability = user.fishingroddurability

let bow = user.bow
let bdurability = user.bowdurability

let naga = user.naga
let _naga = user.anaknaga

let phonix = user.phonix
let _phonix = user.anakphonix

let centauro = user.centauro
let _centaur = user.anakcentaur

let griffin = user.griffin
let _griffin = user.anakgriffin

let serigala = user.serigala
let _serigala = user.anakserigala

let level = user.level
let { min, max } = xpRange(level, global.multiplier)


//const pets = Object.keys(inventory.pets).map(v => user[v] && `*${global.rpg.emoticon(v)} » ${user[v] >= inventory.pets[v] ? '*Nivel Máximo : Max Level*' : `Nivel : Level* \n*» ${user[v]}*\n`}`).filter(v => v).join('\n').trim()
const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `*✧ ${name}*: ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
 // ${Object.keys(inventory.others).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}${tools ? `
	
 const caption = `
👤» *@${who.split("@")[0]}* 
🛣️ ESTRATEGIAS | ANIMALES

╭━━━━━━━━━⬣
┃ *ESTADO DE COMBATE*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada | Sword*
┃ *» ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura | Armor* 
┃ *» ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar | FishingRod* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*│🥼 Armadura : Armor:* 
*│➠ ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
*│🥼⇡ Durabilidad : Durability:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword > 0 && sword < 5 ? `Ketahanan (*${sword}* / *${sword *100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad : Durability:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico : Peak* 
*│➠ ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad : Durability:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar : Fishing Rod* 
*│➠ ${pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad : Durability:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo | I do not have' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad : Durability:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *CAJAS ENCONTRADAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${user.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${user.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${user.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${user.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${user.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${user.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${user.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *MASCOTAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota : I do not have pet' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('zorro')}*
┃ *${rubah == 0 ? 'No tengo Mascota : I do not have pet' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota : I do not have pet' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota : I do not have pet' : '' || anjing == 1 ? 'Nivel | Level ✦ 1' : '' || anjing == 2 ? 'Nivel | Level ✦ 2' : '' || anjing == 3 ? 'Nivel | Level ✦ 3' : '' || anjing == 4 ? 'Nivel | Level ✦ 4' : '' || anjing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${user.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${user.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro : zorro*
*│* ${rubah == 0 ? '*No tengo | I do not have*' : '' || rubah > 0 && rubah < 5 ? `*Nivel/Level ${rubah} A Nivel/To Level ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato : gato* 
*│* ${kucing == 0 ? '*No tengo | I do not have*' : '' || kucing > 0 && kucing < 5 ? `*Nivel/Level ${kucing} A Nivel/To Level ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo : Horse* 
*│* ${kuda == 0 ? '*No tengo | I do not have*' : '' || kuda > 0 && kuda < 5 ? `*Nivel/Level ${kuda} A Nivel/To Level ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro : Dog* 
*│* ${anjing == 0 ? '*No tengo | I do not have*' : '' || anjing > 0 && anjing < 5 ? `*Nivel/Level ${anjing} A Nivel/To Level ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*╭━• PET COMBAT*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('zorro')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('gato')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel | Level ✦ 1' : '' || naga == 2 ? 'Nivel | Level ✦ 2' : '' || naga == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || naga == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel | Level ✦ 1' : '' || phonix == 2 ? 'Nivel | Level ✦ 2' : '' || phonix == 3 ? 'Nivel | Level ✦ 3' : '' || phonix == 4 ? 'Nivel | Level ✦ 4' : '' || phonix == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centauro')} » ${centauro == 0 ? '❌' : '' || centauro == 1 ? 'Nivel | Level ✦ 1' : '' || centauro == 2 ? 'Nivel | Level ✦ 2' : '' || centauro == 3 ? 'Nivel | Level ✦ 3' : '' || centauro == 4 ? 'Nivel | Level ✦ 4' : '' || centauro == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel | Level ✦ 1' : '' || griffin == 2 ? 'Nivel | Level ✦ 2' : '' || griffin == 3 ? 'Nivel | Level ✦ 3' : '' || griffin == 4 ? 'Nivel | Level ✦ 4' : '' || griffin == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel | Level ✦ 1' : '' || serigala == 2 ? 'Nivel | Level ✦ 2' : '' || serigala == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || serigala == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${htki} *PROGSES* ${htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${user.level} ➠  ${user.level + 1}*
*╭┫ ✨ Exp » ${user.exp} ➠ ${max - user.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('zorro')}*\n${rubah == 0 ? '*╰┫❌' : '' || rubah > 0 && rubah < 5 ? `*╰┫ Nivel : Level » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah *100}` : '' || rubah == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('gato')}*\n${kucing == 0 ? '*╰┫❌' : '' || kucing > 0 && kucing < 5 ? `*╰┫ Nivel : Level » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing *100}` : '' || kucing == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || kuda > 0 && kuda < 5 ? `*╰┫ Nivel : Level » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda *100}` : '' || kuda == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || naga > 0 && naga < 5 ? `*╰┫ Nivel : Level » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga *100}` : '' || naga == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || phonix > 0 && phonix < 5 ? `*╰┫ Nivel : Level » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix *100}` : '' || phonix == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centauro')}*\n${centauro == 0 ? '*╰┫❌' : '' || centauro > 0 && centauro < 5 ? `*╰┫ Nivel : Level » ${centauro} ➠ ${centauro + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centauro *100}` : '' || centauro == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || griffin > 0 && griffin < 5 ? `*╰┫ Nivel : Level » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin *100}` : '' || griffin == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || serigala > 0 && serigala < 5 ? `*╰┫ Nivel : Level » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala *100}` : '' || serigala == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *@${who.split("@")[0]}* 
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date - user.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🪙 Minar AMXcoins » ${new Date - user.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre : Coffer » ${new Date - user.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza : Berburu » ${new Date - user.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura : Adventure : » ${new Date - user.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora : Hourly » ${new Date - user.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar : Claim » ${new Date - user.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente : Weekly ${new Date - user.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual : Monthly ${new Date - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*`.trim()

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
let resp = `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}\n`+ caption + '\n' + 'Inventario'+ '\n' + `⚜️ 𝙇𝙞𝙨𝙩𝙖 𝙙𝙚 𝙈𝙞𝙨𝙞𝙤𝙣𝙚𝙨` + '\n' + `${usedPrefix}inventario 3`+ '\n' + `🏕️ Aventurar`+ '\n' + `${usedPrefix}adventure`+ '\n' + '💗 _Menu Aventura | RPG_'+ '\n' +`${usedPrefix}rpg`
//await conn.sendButton(m.chat, `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}`, caption, imgr + 'Inventario : Inventory', [[`⚜️ 𝙇𝙞𝙨𝙩𝙖 𝙙𝙚 𝙈𝙞𝙨𝙞𝙤𝙣𝙚𝙨 | 𝙈𝙞𝙨𝙨𝙞𝙤𝙣𝙨`, `${usedPrefix}inventario 3`], [`🏕️ Aventurar | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`], ['💗 _Menu Aventura | RPG_', ${usedPrefix}rpgmenu']], fkontak, m, { mentions: conn.parseMention(caption) })
	
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else if (args[0] == '3') { // Inventario 3

let member = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let user = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let usuario = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]

let healt = member.health
//let level = member.level
let rol = member.role
let pasangan = member.pasangan
let warn = member.warn
let money = member.money
let exp = member.exp
let token = member.joincount
let dia = member.limit
let tiketm = member.healtmonster

let sortedmoney = Object.entries(users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedmakananpet = Object.entries(users).sort((a, b) => b[1].makananpet - a[1].makananpet)
    let sortedbatu = Object.entries(users).sort((a, b) => b[1].batu - a[1].batu)
    let sortediron = Object.entries(users).sort((a, b) => b[1].iron - a[1].iron)
    let sortedkayu = Object.entries(users).sort((a, b) => b[1].kayu - a[1].kayu)
    let sortedstring = Object.entries(users).sort((a, b) => b[1].string - a[1].string)
    let sortedcommon = Object.entries(users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncoommon = Object.entries(users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
    let sortedmythic = Object.entries(users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(users).sort((a, b) => b[1].legendary - a[1].legendary)
    let sortedpet = Object.entries(users).sort((a, b) => b[1].pet - a[1].pet)
    let sortedgold = Object.entries(users).sort((a, b) => b[1].gold - a[1].gold)
    let sortedarlok = Object.entries(users).sort((a, b) => b[1].arlok - a[1].arlok)
    
    let usersmoney = sortedmoney.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let usersmakananpet = sortedmakananpet.map(v => v[0])
    let usersbatu = sortedbatu.map(v => v[0])
    let usersiron = sortediron.map(v => v[0])
    let userskayu = sortedkayu.map(v => v[0])
    let usersstring = sortedstring.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncoommon = sorteduncoommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let userspet = sortedpet.map(v => v[0])
    let usersgold = sortedgold.map(v => v[0])
    let usersarlok = sortedarlok.map(v => v[0])
    
let pickaxe = user.pickaxe
let sword = user.sword
let armor = user.armor
let fishingrod = user.fishingrod

//armor
let adurability = user.armordurability
//sword
let sdurability = user.sworddurability
//pickaxe
let pdurability = user.pickaxedurability

let pancing = user.pancing
let fdurability = user.fishingroddurability

let bow = user.bow
let bdurability = user.bowdurability

let naga = user.naga
let _naga = user.anaknaga

let phonix = user.phonix
let _phonix = user.anakphonix

let centauro = user.centauro
let _centaur = user.anakcentaur

let griffin = user.griffin
let _griffin = user.anakgriffin

let serigala = user.serigala
let _serigala = user.anakserigala

let level = user.level
let { min, max } = xpRange(level, global.multiplier)

let kuda = user.kuda
let rubah = user.rubah
let kucing = user.kucing
let anjing = user.anjing

let _rubah = user.anakrubah
let _kucing = user.anakkucing
let _kuda = user.anakkuda
let _anjing = user.anakanjing

let pollo = user.pollo
let kambing = user.kambing
let sapi = user.sapi
let kerbau = user.kerbau
let cerdo = user.cerdo
let harimau = user.harimau
let banteng = user.banteng
let monyet = user.monyet
let babihutan = user.babihutan
let panda = user.panda
let gajah = user.gajah
let cocodrilo = user.cocodrilo

let paus = user.paus 
let kepiting = user.kepiting
let gurita = user.gurita 
let cumi = user.cumi 
let buntal = user.buntal 
let dory = user.dory 
let lumba = user.lumba 
let lobster = user.lobster 
let hiu = user.hiu 
let udang = user.udang
let ikan = user.ikan 
let orca = user.orca 
let pancingan = user.pancingan
let _pancingan = user.anakpancingan 
	 
//let makananpet = user.makananpet
let ayamb = user.ayamb
let ayamg = user.ayamg
let sapir = user.sapir
let ssapi = user.ssapi

let makananpet = user.makananpet
let makanannaga = user.makanannaga                                         
let makananphonix = user.makananphonix                                     
let makanangriffin = user.makanangriffin
let makanankyubi = user.makanankyubi                                       
let makanancentaur = user.makanancentaur

let mangga = user.mangga
let anggur = user.anggur
let pisang = user.pisang
let jeruk = user.jeruk
let apel = user.apel

let semillasdeuva = user.semillasdeuva                            
let semillasdenaranja = user.semillasdenaranja                              
let semillasdemanzana = user.semillasdemanzana
let semillasdemango = user.semillasdemango                            
let semillasdeplatano = user.semillasdeplatano
//let number = `${PhoneNumber('+' + pasangan.replace('@s.whatsapp.net', '')).getNumber('international')}`
						   
    let pepe = flaaa.getRandom()
    let pp = pepe + 'Inventario : Inventory'
    let str = `
🎒 *_INVENTARIO TOTAL_*
${readMore}
╭━━━━━━━━━⬣
┃ *INVENTARIO DE ARTICULOS* 
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Level » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${member.premium ? "✅ VIP : Premium": "Limitado : Free"}*
┃ 🏦 *Banco : Bank » ${member.bank}*
┃ 💞 *Pareja : Pasangan »* ${pasangan ? `@${pasangan.split("@")[0]}` : `❌`}
┃ ⚠️ *Advertencia : Warn » ${warn}*
┃ 🚷 *Baneado(a) : Banned » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ PRODUCTOS VALIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *AMXcoins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${member.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${member.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${member.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${member.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${member.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${member.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${member.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${member.cupon}*
┃ 📉 *Gastos : Expg » ${member.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ SUPERVIVENCIA
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${member.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${member.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${member.trash}*
┃ *${rpgshop.emoticon('wood')} » ${member.wood}*
┃ *${rpgshop.emoticon('rock')} » ${member.rock}*
┃ *${rpgshop.emoticon('batu')} » ${member.batu}*
┃ *${rpgshop.emoticon('string')} » ${member.string}*
┃ *${rpgshop.emoticon('iron')} » ${member.iron}*
┃ *${rpgshop.emoticon('coal')} » ${member.coal}*
┃ *${rpgshop.emoticon('botol')} » ${member.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${member.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${member.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ OBJETOS MISTERIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${member.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${member.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${member.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${member.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${member.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${member.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${member.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${member.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${member.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${member.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${member.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${member.ramuan}*
┃ *🧭 Reloj : Reloj » ${member.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top AMXcoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*

👤» *@${who.split("@")[0]}* 
🛣️ ESTRATEGIAS | ANIMALES
🌄 STRATEGIES | ANIMALS

╭━━━━━━━━━⬣
┃ *ESTADO DE COMBATE*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada | Sword*
┃ *» ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura | Armor* 
┃ *» ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar | FishingRod* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*│🥼 Armadura : Armor:* 
*│➠ ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
*│🥼⇡ Durabilidad : Durability:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword > 0 && sword < 5 ? `Ketahanan (*${sword}* / *${sword *100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad : Durability:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico : Peak* 
*│➠ ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad : Durability:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar : Fishing Rod* 
*│➠ ${pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad : Durability:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo | I do not have' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad : Durability:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *CAJAS ENCONTRADAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${user.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${user.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${user.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${user.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${user.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${user.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${user.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *MASCOTAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota : I do not have pet' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('zorro')}*
┃ *${rubah == 0 ? 'No tengo Mascota : I do not have pet' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota : I do not have pet' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota : I do not have pet' : '' || anjing == 1 ? 'Nivel | Level ✦ 1' : '' || anjing == 2 ? 'Nivel | Level ✦ 2' : '' || anjing == 3 ? 'Nivel | Level ✦ 3' : '' || anjing == 4 ? 'Nivel | Level ✦ 4' : '' || anjing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${user.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${user.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro : zorro*
*│* ${rubah == 0 ? '*No tengo | I do not have*' : '' || rubah > 0 && rubah < 5 ? `*Nivel/Level ${rubah} A Nivel/To Level ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato : gato* 
*│* ${kucing == 0 ? '*No tengo | I do not have*' : '' || kucing > 0 && kucing < 5 ? `*Nivel/Level ${kucing} A Nivel/To Level ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo : Horse* 
*│* ${kuda == 0 ? '*No tengo | I do not have*' : '' || kuda > 0 && kuda < 5 ? `*Nivel/Level ${kuda} A Nivel/To Level ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro : Dog* 
*│* ${anjing == 0 ? '*No tengo | I do not have*' : '' || anjing > 0 && anjing < 5 ? `*Nivel/Level ${anjing} A Nivel/To Level ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('zorro')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('gato')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel | Level ✦ 1' : '' || naga == 2 ? 'Nivel | Level ✦ 2' : '' || naga == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || naga == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel | Level ✦ 1' : '' || phonix == 2 ? 'Nivel | Level ✦ 2' : '' || phonix == 3 ? 'Nivel | Level ✦ 3' : '' || phonix == 4 ? 'Nivel | Level ✦ 4' : '' || phonix == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centauro')} » ${centauro == 0 ? '❌' : '' || centauro == 1 ? 'Nivel | Level ✦ 1' : '' || centauro == 2 ? 'Nivel | Level ✦ 2' : '' || centauro == 3 ? 'Nivel | Level ✦ 3' : '' || centauro == 4 ? 'Nivel | Level ✦ 4' : '' || centauro == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel | Level ✦ 1' : '' || griffin == 2 ? 'Nivel | Level ✦ 2' : '' || griffin == 3 ? 'Nivel | Level ✦ 3' : '' || griffin == 4 ? 'Nivel | Level ✦ 4' : '' || griffin == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel | Level ✦ 1' : '' || serigala == 2 ? 'Nivel | Level ✦ 2' : '' || serigala == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || serigala == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${htki} *PROGSES* ${htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${user.level} ➠  ${user.level + 1}*
*╭┫ ✨ Exp » ${user.exp} ➠ ${max - user.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('zorro')}*\n${rubah == 0 ? '*╰┫❌' : '' || rubah > 0 && rubah < 5 ? `*╰┫ Nivel : Level » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah *100}` : '' || rubah == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('gato')}*\n${kucing == 0 ? '*╰┫❌' : '' || kucing > 0 && kucing < 5 ? `*╰┫ Nivel : Level » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing *100}` : '' || kucing == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || kuda > 0 && kuda < 5 ? `*╰┫ Nivel : Level » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda *100}` : '' || kuda == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || naga > 0 && naga < 5 ? `*╰┫ Nivel : Level » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga *100}` : '' || naga == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || phonix > 0 && phonix < 5 ? `*╰┫ Nivel : Level » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix *100}` : '' || phonix == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centauro')}*\n${centauro == 0 ? '*╰┫❌' : '' || centauro > 0 && centauro < 5 ? `*╰┫ Nivel : Level » ${centauro} ➠ ${centauro + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centauro *100}` : '' || centauro == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || griffin > 0 && griffin < 5 ? `*╰┫ Nivel : Level » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin *100}` : '' || griffin == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || serigala > 0 && serigala < 5 ? `*╰┫ Nivel : Level » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala *100}` : '' || serigala == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *@${who.split("@")[0]}*
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - user.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🪙 Minar AMXcoins » ${new Date - user.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre : Coffer » ${new Date - user.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza : Berburu » ${new Date - user.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura : Adventure : » ${new Date - user.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora : Hourly » ${new Date - user.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar : Claim » ${new Date - user.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente : Weekly ${new Date - user.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual : Monthly ${new Date - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• ANIMALES EN RESERVA*
*│${rpg.emoticon('toro')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elefante')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('cerdo')} ➡️ ${cerdo}*
*│${rpg.emoticon('pollo')} ➡️ ${pollo}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${ cocodrilo + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + pollo + sapi + cerdo + banteng } Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• COMIDA*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• 𝗙RUTAS Y SEMILLAS*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${semillasdemango}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${semillasdeuva}*                                   
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${semillasdeplatano}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${semillasdenaranja}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${semillasdemanzana}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *PISCINA DE PECES*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho*\n*│ ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan > 0 && pancingan < 5 ? `Nivel : Level » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan *10000}*` : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${user.boxs}*
┃📦 *Caja Común : Common Box » ${user.common}*
┃🥡 *Caja Poco Común : Uncommon » ${user.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${user.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${user.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${user.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${user.gardenboxs}*
╰━━━━━━━━━⬣

👤» *@${who.split("@")[0]}* 
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - user.lastmiming < 600000 ? '❌' : '✅'}*
${new Date - user.lastmiming < 600000 ? `${clockString(user.lastmiming + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🪙 Minar AMXcoins » ${new Date - user.lastcoins < 600000 ? '❌' : '✅'}*
${new Date - user.lastcoins < 600000 ? `${clockString(user.lastcoins + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date - user.lastdiamantes < 900000 ? `${clockString(user.lastdiamantes + 900000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre : Coffer » ${new Date - user.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date - user.lastcofre < 86400000 ? `${clockString(user.lastcofre + 86400000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza : Berburu » ${new Date - user.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date - user.lastberburu < 2700000 ? `${clockString(user.lastberburu + 2700000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura : Adventure : » ${new Date - user.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date - user.lastadventure < 1500000 ? `${clockString(user.lastadventure + 1500000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora : Hourly » ${new Date - user.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date - user.lasthourly < 3600000 ? `${clockString(user.lasthourly + 3600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar : Claim » ${new Date - user.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date - user.lastclaim < 7200000 ? `${clockString(user.lastclaim + 7200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente : Weekly ${new Date - user.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date - user.lastweekly < 259200000 ? `${clockString(user.lastweekly + 259200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual : Monthly ${new Date - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date - user.lastmonthly < 432000000 ? `${clockString(user.lastmonthly + 432000000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete : Roket »* ${user.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir : ngojek »* ${user.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${user.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición : nebang »* ${user.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir : ngocok »* ${user.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo : Duel :* ${user.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra : War :* ${user.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras : Dungeon :* ${user.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio : Berdagang :* ${user.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería : Berkebun :* ${user.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca : Fishing :* ${user.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social : Bansos :* ${user.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top AMXcoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(m.sender) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(m.sender) + 1}* _de_ *${usersarlok.length}*`
 
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
// let ftroli = { key: {participant : '0@s.whatsapp.net'}, message: { orderMessage: { itemCount: 2022, status: 1, surface: 1, message: bottime, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }   
//await conn.sendButton(m.chat, `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}`, str, imgr + 'Inventario : Inventory', [[`${healt < 40 ? '❤️ _CURARME_ | 𝙃𝙀𝘼𝙇 𝙈𝙀' : 'Aventurar | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚 🏕️'}`, `${healt < 40 ? ${usedPrefix}heal' : ${usedPrefix}adventure'}`],['🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 | 𝘽𝙪𝙮', '.'buy'],['🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝙑𝙚𝙣𝙙𝙚𝙧 | 𝙎𝙚𝙡𝙡', '.sell']], m, {quoted: fkontak})
let resp = `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}` + '\n' + str + 'Inventario' + '\n' + `${healt < 40 ? '❤️ _CURARME_' : 'Aventurar 🏕️'}` + '\n' + `${healt < 40 ? usedPrefix + `heal` : usedPrefix + `adventure`}` + '\n' + '🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝘾𝙤𝙢𝙥𝙧𝙖𝙧' + '\n' + `${usedPrefix}buy` + '\n' + '🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝙑𝙚𝙣𝙙𝙚𝙧' + '\n' + `${usedPrefix}sell`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else if (args[0] == '4') { // Inventario 4

 // let name = m.fromMe ? conn.user : conn.contacts[m.sender]
//let { lastdiamantes, lastcoins, lastmiming, registered, age, lastrampok, lastdagang, lastcofre, lastcodereg, lastberkebon, lasthourly, lastberburu, lastbansos, lastadventure, lastfishing, lastwar, lastduel, lastmining, lastdungeon, lastclaim, lastweekly, lastmonthly } = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let chats, chat, users, user
if (m.chat.endsWith(userID)) {
chats = global.db.data.bot[conn.user.jid].chats.privs
chat = chats[m.chat]
users = chats
user = chats[m.sender]
} else if (m.chat.endsWith(groupID)) {
chats = global.db.data.bot[conn.user.jid].chats.groups
chat = chats[m.chat]
users = chat.users
user = users[m.sender]
}
    let name = m.sender
    let usuario = await conn.getName(name)
    
    let sortedmoney = Object.entries(users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedmakananpet = Object.entries(users).sort((a, b) => b[1].makananpet - a[1].makananpet)
    let sortedbatu = Object.entries(users).sort((a, b) => b[1].batu - a[1].batu)
    let sortediron = Object.entries(users).sort((a, b) => b[1].iron - a[1].iron)
    let sortedkayu = Object.entries(users).sort((a, b) => b[1].kayu - a[1].kayu)
    let sortedstring = Object.entries(users).sort((a, b) => b[1].string - a[1].string)
    let sortedcommon = Object.entries(users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncoommon = Object.entries(users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
    let sortedmythic = Object.entries(users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(users).sort((a, b) => b[1].legendary - a[1].legendary)
    let sortedpet = Object.entries(users).sort((a, b) => b[1].pet - a[1].pet)
    let sortedgold = Object.entries(users).sort((a, b) => b[1].gold - a[1].gold)
    let sortedarlok = Object.entries(users).sort((a, b) => b[1].arlok - a[1].arlok)
    
    let usersmoney = sortedmoney.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let usersmakananpet = sortedmakananpet.map(v => v[0])
    let usersbatu = sortedbatu.map(v => v[0])
    let usersiron = sortediron.map(v => v[0])
    let userskayu = sortedkayu.map(v => v[0])
    let usersstring = sortedstring.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncoommon = sorteduncoommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let userspet = sortedpet.map(v => v[0])
    let usersgold = sortedgold.map(v => v[0])
    let usersarlok = sortedarlok.map(v => v[0])
    
    let str = `
👤» *${usuario}* ( @${who.split("@")[0]} )\n
*✅ » MISIÓN DISPONIBLE : MISSION AVAILABLE*

*❌ » MISIÓN NO DISPONIBLE : MISSION NOT AVAILABLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date - user.lastmiming < 600000 ? '❌' : '✅'}*
${new Date - user.lastmiming < 600000 ? `${clockString(user.lastmiming + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🪙 Minar AMXcoins » ${new Date - user.lastcoins < 600000 ? '❌' : '✅'}*
${new Date - user.lastcoins < 600000 ? `${clockString(user.lastcoins + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date - user.lastdiamantes < 900000 ? `${clockString(user.lastdiamantes + 900000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre : Coffer » ${new Date - user.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date - user.lastcofre < 86400000 ? `${clockString(user.lastcofre + 86400000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza : Berburu » ${new Date - user.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date - user.lastberburu < 2700000 ? `${clockString(user.lastberburu + 2700000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura : Adventure : » ${new Date - user.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date - user.lastadventure < 1500000 ? `${clockString(user.lastadventure + 1500000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora : Hourly » ${new Date - user.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date - user.lasthourly < 3600000 ? `${clockString(user.lasthourly + 3600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar : Claim » ${new Date - user.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date - user.lastclaim < 7200000 ? `${clockString(user.lastclaim + 7200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente : Weekly ${new Date - user.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date - user.lastweekly < 259200000 ? `${clockString(user.lastweekly + 259200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual : Monthly ${new Date - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date - user.lastmonthly < 432000000 ? `${clockString(user.lastmonthly + 432000000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete : Roket »* ${user.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir : ngojek »* ${user.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${user.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición : nebang »* ${user.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir : ngocok »* ${user.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo : Duel :* ${user.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra : War :* ${user.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras : Dungeon :* ${user.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio : Berdagang :* ${user.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería : Berkebun :* ${user.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca : Fishing :* ${user.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social : Bansos :* ${user.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${usuario}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top AMXcoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(m.sender) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(m.sender) + 1}* _de_ *${usersarlok.length}*`.trim()
/*
*Hero*
My Hero: *${hero == 0 ? 'Tidak Punya' : '' || hero == 1 ? 'Level 1' : '' || hero == 2 ? 'Level 2' : '' || hero == 3 ? 'Level 3' : '' || hero == 4 ? 'Level 4' : '' || hero == 5 ? 'Level 5' : '' || hero == 6 ? 'Level 6' : '' || hero == 7 ? 'Level 7' : '' || hero == 8 ? 'Level 8' : '' || hero == 9 ? 'Level 9' : '' || hero == 10 ? 'Level 10' : '' || hero == 11 ? 'Level 11' : '' || hero == 12 ? 'Level 12' : '' || hero == 13 ? 'Level 13' : '' || hero == 14 ? 'Level 14' : '' || hero == 15 ? 'Level 15' : '' || hero == 16 ? 'Level 16' : '' || hero == 17 ? 'Level 17' : '' || hero == 18 ? 'Level 18' : '' || hero == 19 ? 'Level 19' : '' || hero == 20 ? 'Level 20' : '' || hero == 21 ? 'Level 21' : '' || hero == 22 ? 'Level 22' : '' || hero == 23 ? 'Level 23' : '' || hero == 24 ? 'Level 24' : '' || hero == 25 ? 'Level 25' : '' || hero == 26 ? 'Level 26' : '' || hero == 27 ? 'Level 27' : '' || hero == 28 ? 'Level 28' : '' || hero == 29 ? 'Level 29' : '' || hero == 30 ? 'Level 30' : '' || hero == 31 ? 'Level 31' : '' || hero == 32 ? 'Level 32' : '' || hero == 33 ? 'Level 33' : '' || hero == 34 ? 'Level 34' : '' || hero == 35 ? 'Level 35' : '' || hero == 36 ? 'Level 36' : '' || hero == 37 ? 'Level 37'  : '' || hero == 38 ? 'Level 38' : '' || hero == 39 ? 'Level 39' : '' || hero == 40 ? 'Level MAX' : ''}*

*Pet*
Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*
Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
Naga: *${naga == 0 ? 'Tidak Punya' : '' || naga == 1 ? 'Level 1' : '' || naga == 2 ? 'Level 2' : '' || naga == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || naga == 5 ? 'Level 5' : '' || naga == 6 ? 'Level 6' : '' || naga == 7 ? 'Level 7' : '' || naga == 8 ? 'Level 8' : '' || naga == 9 ? 'Level 9' : '' || naga == 10 ? 'Level 10' : '' || naga == 11 ? 'Level 11' : '' || naga == 12 ? 'Level 12' : '' || naga == 13 ? 'Level 13' : '' || naga == 14 ? 'Level 14' : '' || naga == 15 ? 'Level 15' : '' || naga == 16 ? 'Level 16' : '' || naga == 17 ? 'Level 17' : '' || naga == 18 ? 'Level 18' : '' || naga == 19 ? 'Level 19' : '' || naga == 20 ? 'Level MAX' : ''}*
Kyubi: *${kyubi == 0 ? 'Tidak Punya' : '' || kyubi == 1 ? 'Level 1' : '' || kyubi == 2 ? 'Level 2' : '' || kyubi == 3 ? 'Level 3' : '' || kyubi == 4 ? 'Level 4' : '' || kyubi == 5 ? 'Level 5' : '' || kyubi == 6 ? 'Level 6' : '' || kyubi == 7 ? 'Level 7' : '' || kyubi == 8 ? 'Level 8' : '' || kyubi == 9 ? 'Level 9' : '' || kyubi == 10 ? 'Level 10' : '' || kyubi == 11 ? 'Level 11' : '' || kyubi == 12 ? 'Level 12' : '' || kyubi == 13 ? 'Level 13' : '' || kyubi == 14 ? 'Level 14' : '' || kyubi == 15 ? 'Level 15' : '' || kyubi == 16 ? 'Level 16' : '' || kyubi == 17 ? 'Level 17' : '' || kyubi == 18 ? 'Level 18' : '' || kyubi == 19 ? 'Level 19' : '' || kyubi == 20 ? 'Level MAX' : ''}*
centauro: *${centauro == 0 ? 'Tidak Punya' : '' || centauro == 1 ? 'Level 1' : '' || centauro == 2 ? 'Level 2' : '' || centauro == 3 ? 'Level 3' : '' || centauro == 4 ? 'Level 4' : '' || centauro == 5 ? 'Level 5' : '' || centauro == 6 ? 'Level 6' : '' || centauro == 7 ? 'Level 7' : '' || centauro == 8 ? 'Level 8' : '' || centauro == 9 ? 'Level 9' : '' || centauro == 10 ? 'Level 10' : '' || centauro == 11 ? 'Level 11' : '' || centauro == 12 ? 'Level 12' : '' || centauro == 13 ? 'Level 13' : '' || centauro == 14 ? 'Level 14' : '' || centauro == 15 ? 'Level 15' : '' || centauro == 16 ? 'Level 16' : '' || centauro == 17 ? 'Level 17' : '' || centauro == 18 ? 'Level 18' : '' || centauro == 19 ? 'Level 19' : '' || centauro == 20 ? 'Level MAX' : ''}*
Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*  
Phonix: *${phonix == 0 ? 'Tidak Punya' : '' || phonix == 1 ? 'Level 1' : '' || phonix == 2 ? 'Level 2' : '' || phonix == 3 ? 'Level 3' : '' || phonix == 4 ? 'Level 4' : '' || phonix == 5 ? 'Level 5' : '' || phonix == 6 ? 'Level 6' : '' || phonix == 7 ? 'Level 7' : '' || phonix == 8 ? 'Level 8' : '' || phonix == 9 ? 'Level 9' : '' || phonix == 10 ? 'Level 10' : '' || phonix == 11 ? 'Level 11' : '' || phonix == 12 ? 'Level 12' : '' || phonix == 13 ? 'Level 13' : '' || phonix == 14 ? 'Level 14' : '' || phonix == 15 ? 'Level MAX' : ''}*
Griffin: *${griffin == 0 ? 'Tidak Punya' : '' || griffin == 1 ? 'Level 1' : '' || griffin == 2 ? 'Level 2' : '' || griffin == 3 ? 'Level 3' : '' || griffin == 4 ? 'Level 4' : '' || griffin == 5 ? 'Level 5' : '' || griffin == 6 ? 'Level 6' : '' || griffin == 7 ? 'Level 7' : '' || griffin == 8 ? 'Level 8' : '' || griffin == 9 ? 'Level 9' : '' || griffin == 10 ? 'Level 10' : '' || griffin == 11 ? 'Level 11' : '' || griffin == 12 ? 'Level 12' : '' || griffin == 13 ? 'Level 13' : '' || griffin == 14 ? 'Level 14' : '' || griffin == 15 ? 'Level MAX' : ''}*
Serigala: *${serigala == 0 ? 'Tidak Punya' : '' || serigala == 1 ? 'Level 1' : '' || serigala == 2 ? 'Level 2' : '' || serigala == 3 ? 'Level 3' : '' || serigala == 4 ? 'Level 4' : '' || serigala == 5 ? 'Level 5' : '' || serigala == 6 ? 'Level 6' : '' || serigala == 7 ? 'Level 7' : '' || serigala == 8 ? 'Level 8' : '' || serigala == 9 ? 'Level 9' : '' || serigala == 10 ? 'Level 10' : '' || serigala == 11 ? 'Level 11' : '' || serigala == 12 ? 'Level 12' : '' || serigala == 13 ? 'Level 13' : '' || serigala == 14 ? 'Level 14' : '' || serigala == 15 ? 'Level MAX' : ''}*\n
*Proges*
╭────────────────
│Level *${level}* To Level *${level}*
│Exp *${exp}* -> *${max}*
│
│Hero ${hero == 0 ? 'Tidak Punya' : '' || hero > 0 && hero < 40 ? `Level *${hero}* To level *${hero + 1}*\n│Exp *${exphero}* -> *${hero *500}*` : '' || hero == 40 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Rubah ${rubah == 0 ? 'Tidak Punya' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n│Exp *${_rubah}* -> *${rubah *1000}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kucing ${kucing == 0 ? 'Tidak Punya' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n│Exp *${_kucing}* -> *${kucing *1000}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kuda ${kuda == 0 ? 'Tidak Punya' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n│Exp *${_kuda}* -> *${kuda *1000}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Naga ${naga == 0 ? 'Tidak Punya' : '' || naga > 0 && naga < 20 ? `Level *${naga}* To level *${naga + 1}*\n│Exp *${_naga}* -> *${naga *10000}*` : '' || naga == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Phonix ${phonix == 0 ? 'Tidak Punya' : '' || phonix > 0 && phonix < 15 ? `Level *${phonix}* To level *${phonix + 1}*\n│Exp *${_phonix}* -> *${phonix *10000}*` : '' || phonix == 15 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kyubi ${kyubi == 0 ? 'Tidak Punya' : '' || kyubi > 0 && kyubi < 20 ? `Level *${kyubi}* To level *${kyubi + 1}*\n│Exp *${_kyubi}* -> *${kyubi *10000}*` : '' || kyubi == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│centauro ${centauro == 0 ? 'Tidak Punya' : '' || centauro > 0 && centauro < 20 ? `Level *${centauro}* To level *${centauro + 1}*\n│Exp *${_centaur}* -> *${centauro *10000}*` : '' || centauro == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Griffin ${griffin == 0 ? 'Tidak Punya' : '' || griffin > 0 && griffin < 15 ? `Level *${griffin}* To level *${griffin + 1}*\n│Exp *${_griffin}* -> *${griffin *10000}*` : '' || griffin == 15 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Serigala ${serigala == 0 ? 'Tidak Punya' : '' || serigala > 0 && serigala < 15 ? `Level *${serigala}* To level *${serigala + 1}*\n│Exp *${_serigala}* -> *${serigala *10000}*` : '' || serigala == 15? '*Max Level*' : ''}
╰────────────────\n\n
*/

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
} 
let resp = `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}\n`  + str + 'Inventario' + '\n' + `🍱 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘼𝙡𝙞𝙢𝙚𝙣𝙩𝙤𝙨 => ${usedPrefix}alimentos` + '\n' + `🎒 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙩𝙤𝙩𝙖𝙡 => ${usedPrefix}inventario 4` + '\n' + `💗 _Menu Aventura | RPG_ => ${usedPrefix}rpgmenu`
//await conn.sendButton(m.chat, `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}`, str, imgr + 'Inventario : Inventory', [[`🍱 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘼𝙡𝙞𝙢𝙚𝙣𝙩𝙤𝙨 `, `${usedPrefix}alimentos`], [`🎒 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙩𝙤𝙩𝙖𝙡`, `${usedPrefix}inventario 4`], ['💗 _Menu Aventura | RPG_', ${usedPrefix}rpgmenu']], fkontak, m, { mentions: conn.parseMention(str) })
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
	
    } else if (args[0] == 'alimentos') { // Inventario piscina
	    
let user = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let pollo = user.pollo
let kambing = user.kambing
let sapi = user.sapi
let kerbau = user.kerbau
let cerdo = user.cerdo
let harimau = user.harimau
let banteng = user.banteng
let monyet = user.monyet
let babihutan = user.babihutan
let panda = user.panda
let gajah = user.gajah
let cocodrilo = user.cocodrilo

let paus = user.paus 
let kepiting = user.kepiting
let gurita = user.gurita 
let cumi = user.cumi 
let buntal = user.buntal 
let dory = user.dory 
let lumba = user.lumba 
let lobster = user.lobster 
let hiu = user.hiu 
let udang = user.udang
let ikan = user.ikan 
let orca = user.orca 
let pancingan = user.pancingan
let _pancingan = user.anakpancingan 
	 
//let makananpet = user.makananpet
let ayamb = user.ayamb
let ayamg = user.ayamg
let sapir = user.sapir
let ssapi = user.ssapi

let makananpet = user.makananpet
let makanannaga = user.makanannaga                                         
let makananphonix = user.makananphonix                                     
let makanangriffin = user.makanangriffin
let makanankyubi = user.makanankyubi                                       
let makanancentaur = user.makanancentaur

let mangga = user.mangga
let anggur = user.anggur
let pisang = user.pisang
let jeruk = user.jeruk
let apel = user.apel

let semillasdeuva = user.semillasdeuva                            
let semillasdenaranja = user.semillasdenaranja                              
let semillasdemanzana = user.semillasdemanzana
let semillasdemango = user.semillasdemango                            
let semillasdeplatano = user.semillasdeplatano

let aineh = `
*╭──━• ANIMALES EN RESERVA*
*│${rpg.emoticon('toro')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elefante')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('cerdo')} ➡️ ${cerdo}*
*│${rpg.emoticon('pollo')} ➡️ ${pollo}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${ cocodrilo + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + pollo + sapi + cerdo + banteng } Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• COMIDA*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• 𝗙RUTAS Y SEMILLAS*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${semillasdemango}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${semillasdeuva}*                                   
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${semillasdeplatano}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${semillasdenaranja}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${semillasdemanzana}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *PISCINA DE PECES*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho » ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan > 0 && pancingan < 5 ? `Nivel : Level » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan *10000}*` : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${user.boxs}*
┃📦 *Caja Común : Common Box » ${user.common}*
┃🥡 *Caja Poco Común : Uncommon » ${user.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${user.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${user.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${user.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${user.gardenboxs}*
╰━━━━━━━━━⬣`.trim()

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
let resp = `*PREMIUM ${user.premium ? "✅": "❌"}*\n${wm}`.trim()
let txt = '';
let count = 0;
for (const c of resp + aineh + 'Inventario') {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//await conn.sendButton(m.chat, resp, , [[`🐈 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘼𝙣𝙞𝙢𝙖𝙡𝙚𝙨`, `${usedPrefix}animales`], [`🎒 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙩𝙤𝙩𝙖𝙡`, `${usedPrefix}inventario 4`], ['_Menu Aventura | RPG_ 💗', ${usedPrefix}rpgmenu']], fkontak, m)
}

}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inventory|inv|inventario)$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['*│ NUEVA MISION EN : MISSION*\n*│* ', ye, ' *🗓️ Años : Year*\n', '*│* ', mo, ' *⛅ Mes : Month*\n', '*│* ', d, ' *☀️ Días : Days*\n', '*│* ', h, ' *⏰ Horas : Hours*\n', '*│* ', m, ' *🕐 Minutos : Minutes*\n', '*│* ', s, ' *⏱️ Segundos : Seconds*\n*│*'].map(v => v.toString().padStart(2, 0)).join('')
}
