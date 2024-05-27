const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});


const Discord = require("discord.js")
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });
const timestamp = require('discord-timestamp');
const moment = require("moment")
const ms = require('ms');
const fs = require("fs")
const { Database } = require("quickmongo");
const isTimestamp = require('is-timestamp')
const db = new Database(process.env.mongodb)
const prefix = process.env.prefix;
const discordModals = require('discord-modals')
discordModals(client);


const { AutoKill } = require('autokill')
AutoKill({Client: client, Time: 5000})

const { Probot } = require("discord-probot-transfer");
client.probot = Probot(client, {
  fetchGuilds: true,
  data: [
    {
      fetchMembers: true,
      guildId: "1241843928165126225",
      probotId: "282859044593598464",
      owners: ["1155260634678710272"],
    },
  ],
});




const{REST} = require('@discordjs/rest');
const{Routes} = require('discord-api-types/v9')

const clientID = "756270743242801313"


client.on("ready", async () => {
const commands = [{
name:"buy",
description:"يظهرلك قائمة الشراء"
},
{
name:"private-room",
description:"صناعة روم خاصة (للإدارة)",
options: [{
name: 'user',
description: 'برجاء اختيار الشخص لصنع الروم الخاصة',
type: 6,
required: true
},
{
name: 'time',
description: 'برجاء اختيار الوقت الروم الخاصة',
type: 3,
required: true
}]
},
{
name:"discount",
description: "لوضع خصم على جميع الأسـ3ـار",
options: [{
name: 'value',
description: 'برجاء وضع قيمة الخصم',
type: 10,
min_value: 5,
max_value: 95,
required: true
},
{
name: 'time',
description: 'برجاء تحديد مدة الخصم',
type: 3,
required: true
}]
}]


const rest = new REST({version: "9" }).setToken(process.env.token);
    (async () => {
        try {
          await rest.put(Routes.applicationCommands(clientID),
{ body:commands },);
        
console.log("#saved slash commands");
      
        } catch(error) {
            console.error(error);
        }
    })();
})





db.on("ready", async () => {
    console.log("Connected to the database");
  await db.connect();
});

let ur_server = "756270743242801313"

let owner = ["1155260634678710272","866143250561761325"]

let log_open_and_close_channels = process.env.log_open_and_close_channels;

async function Clock() {
var now = new Date();
var hours = now.getHours() + 2;
let status = await db.get(`statusrooms_${ur_server}`)
if(hours == "24") {
if(status == "close") return;
client.channels.cache.forEach(async channel => {
if(channel.parentId !== "1009148206887731210") return;
let owner = await db.get(`privr_${channel.id}.owner`)
if(!owner) return;
let user = client.guilds.cache.get(ur_server).members.cache.get(owner)
if(!user) return;
channel.permissionOverwrites.edit(user, {
SEND_MESSAGES: false,
});
})
client.guilds.cache.get(ur_server).channels.cache.get("987018256722313277").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018281758126110").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018314490445874").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018338397986826").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018350465015848").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018364570452118").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018375840542820").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: false,
});
let msgID = await db.get(`statusrooms_${ur_server}`)
if(msgID) {
client.channels.cache.get(log_open_and_close_channels).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
}
client.channels.cache.get(log_open_and_close_channels).send({content: `**مرحبًا ، رومات البيـ3 قد تم إغلاقها الآن ، لا تقلق سيتم فتحها في الساعة 10:00 صباحًا بتوقيت مصر**`}).then(async msg => {
db.set(`statusrooms_${ur_server}.msgID`, msg.id)
db.set(`statusrooms_${ur_server}`, "close")
})
return;
    }


      
if(hours == "21") {
if(status == "open") return;
client.channels.cache.forEach(async channel => {
if(channel.parentId !== "1009148206887731210") return;
let owner = await db.get(`privr_${channel.id}.owner`)
if(!owner) return;
let user = client.guilds.cache.get(ur_server).members.cache.get(owner)
if(!user) return;
channel.permissionOverwrites.edit(user, {
SEND_MESSAGES: true,
});
})
const messages = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018281758126110").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018281758126110").bulkDelete(messages)
const messages1 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018256722313277").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018256722313277").bulkDelete(messages1)
const messages2 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018314490445874").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018314490445874").bulkDelete(messages2)
const messages3 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018338397986826").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018338397986826").bulkDelete(messages3)
const messages4 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018350465015848").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018350465015848").bulkDelete(messages4)
const messages5 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018364570452118").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018364570452118").bulkDelete(messages5)
const messages6 = await client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018375840542820").messages.fetch()
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == "987018375840542820").bulkDelete(messages6)

client.guilds.cache.get(ur_server).channels.cache.get("987018256722313277").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018281758126110").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018314490445874").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018338397986826").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018350465015848").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018364570452118").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
client.guilds.cache.get(ur_server).channels.cache.get("987018375840542820").permissionOverwrites.edit(client.guilds.cache.get(ur_server).roles.everyone, {
VIEW_CHANNEL: true,
});
let msgID = await db.get(`statusrooms_${ur_server}`)
if(msgID) {
client.channels.cache.get(log_open_and_close_channels).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
}
client.guilds.cache.get(ur_server).channels.cache.find(w => w.id == log_open_and_close_channels).send({content: `@everyone
**مرحبًا ، تم فتح رومات البيـ3 الآن ، وستغلق في الساعة 12:00 ليلاً بتوقيت مصر**`}).then(async msg => {
db.set(`statusrooms_${ur_server}.msgID`, msg.id)
db.set(`statusrooms_${ur_server}`, "open")
})
return;    
    }

    }



let priv = JSON.parse(fs.readFileSync("./privaterooms.json", "utf8"));  
let privr = JSON.parse(fs.readFileSync("./privateroom.json", "utf8"));   
client.on("ready", async () => { 
setInterval(async () => {
Clock()
let channel_log = client.channels.cache.get(process.env.log_channels);
if(!channel_log) return;
priv.forEach(async pr => {
if(!pr.pr) return;
let pr1 = await db.get(`privr_${pr.pr}`)
let c = await db.get(`privr_${pr.pr}.pr`)
let times = await db.get(`privr_${pr.pr}.time`)
if(!times) return;
let owner1 = await db.get(`privr_${pr.pr}.owner`)
let own = client.guilds.cache.get(ur_server).members.cache.get(owner1)
if(!own) return;
if(times == timestamp(moment((ms("2d")) + Date.now())) || times < timestamp(moment((ms("2d")) + Date.now()))) {
let role = client.guilds.cache.get(ur_server).roles.cache.get("1071828804269527162");
if(!privr[owner1]) return privr[owner1] = {
id: null,
privroom: null,
}
var privroom = privr[owner1].privroom
var privroomID = privr[owner1].id
if(!privroom) return;
var private_room1 = privr[owner1]
if(!private_room1) return;
if(privroom == "privateroom") return;
let msg = await db.get(`privr_${pr.pr}.msgID`)
let status = await db.get(`statusroom_${pr.pr}.warn1`)
if(status === "on") return;
client.guilds.cache.get(ur_server).channels.create(`تجديد روم خاصة`, "text").then(async c => {
await db.set(`privr_${privroomID}.chrenew`, c.id)
c.permissionOverwrites.create(own, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
c.permissionOverwrites.create(client.guilds.cache.get(ur_server).roles.everyone, {
SEND_MESSAGES: false,
VIEW_CHANNEL: false,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: false,
USE_APPLICATION_COMMANDS: false
})
c.setParent("1072196343600267405");
let embed_end = new Discord.MessageEmbed()
.setDescription(`انتهت صلاحية اشتراك الروم ، إذا كنت ترغب في تجديدها ، فلديك يومان لتجديده أو ستحذف الروم`)
.setColor("#9b0e09")
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew_${pr.pr}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`cancel_${pr.pr}`))
c.send({content: `<@!${own.id}>`, embeds: [embed_end], components: [row]}).then(async msg1 => { 
const row1 = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('LINK')
.setLabel("اضغط هنا لتجديد")
.setURL(msg1.url))
own.send({content: `**عميلنا العزيز،**

**اشتراكك في الروم خاصة سينتهي بعد يومين يرجي التجديد قبل انتهاء المده .**
**\`سعر التجديد فقط 50الف\`**`, components: [row1]})
db.set(`statusroom_${pr.pr}.warn1`, "on")
db.set(`privr_${privroomID}.msgw1`, msg1.id)
})
})
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
}
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
})
}, 8000)
setInterval(async () => {
let channel_log = client.channels.cache.get(process.env.log_channels);
if(!channel_log) return;
priv.forEach(async pr => {
if(!pr.pr) return;
let pr1 = await db.get(`privr_${pr.pr}`)
let c = await db.get(`privr_${pr.pr}.pr`)
let times = await db.get(`privr_${pr.pr}.time`)
if(!times) return;
let owner1 = await db.get(`privr_${pr.pr}.owner`)
let own = client.guilds.cache.get(ur_server).members.cache.get(owner1)
if(!own) return;
if(times == timestamp(moment(Date.now() + (ms("2d") - ms("5h")))) || times < timestamp(moment(Date.now() + (ms("2d") - ms("5h"))))) {
let status = await db.get(`statusroom_${pr.pr}.warn1`)
if(status !== "on") return;
var privroom = privr[owner1].privroom
var privroomID = privr[owner1].id
if(!privroom) return;
var private_room1 = privr[owner1]
if(!private_room1) return;
if(privroom == "privateroom") return;
let chrenew = await db.get(`privr_${pr.pr}.chrenew`)
if(!chrenew) return;
let ch = client.channels.cache.find(t => t.id == chrenew)
if(!ch) return;
ch.delete()
db.set(`privr_${privroomID}.timewarn`, timestamp(moment((ms("2d") - ms("5h")) + Date.now())))
db.set(`statusroom_${privroomID}.warn`, `on`)
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
}
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
})
}, 8000)
setInterval(async () => {
priv.forEach(async pr => {
if(!pr.pr) return;
let channel_log = client.channels.cache.get(process.env.log_channels);
if(!channel_log) return;
let pr1 = await db.get(`privr_${pr.pr}`)
let c = await db.get(`privr_${pr.pr}.pr`)
let times = await db.get(`privr_${pr.pr}.timewarn`)
if(!times) return;
let owner1 = await db.get(`privr_${pr.pr}.owner`)
let own = client.guilds.cache.get(ur_server).members.cache.get(owner1)
if(!own) return;
let c2 = client.channels.cache.get(pr.pr)
if(!c2) return;
let time = await db.get(`privr_${pr.pr}.time`)
if(!time) return;
if(time == timestamp(moment(new Date())) || time < timestamp(moment(new Date()))) {
var privroom = privr[owner1].privroom
if(!privroom) return;
var private_room1 = privr[owner1]
if(!private_room1) return;
if(privroom == "privateroom") return;
let stat = await db.get(`privr_${pr.pr}.statw`)
if(stat && stat == "on") return;
privr[owner1].privroom = "privateroom"
let role1 = client.guilds.cache.get(ur_server).roles.cache.find(w => w.name == "@everyone");
c2.permissionOverwrites.edit(own, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
c2.permissionOverwrites.edit(role1, {
SEND_MESSAGES: false,
VIEW_CHANNEL: false,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: false,
USE_APPLICATION_COMMANDS: false
}); 
let embed_end1 = new Discord.MessageEmbed()
.setColor(`#9b0e09`)
  .setTitle(`**__End Private Room__**`)
.setDescription(`**Name Room :** __\`${c2.name}\`__
**Owner a Room :** __${own}__
**Room Ended Time in :** __<t:${time}:f>__`)
channel_log.send({embeds: [embed_end1]})
client.guilds.cache.get(ur_server).channels.create(`تجديد روم خاصة`, "text").then(async c3 => {
await db.set(`privr_${pr.pr}.chrenew2`, c3.id)
c3.permissionOverwrites.create(own, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
c3.permissionOverwrites.create(client.guilds.cache.get(ur_server).roles.everyone, {
SEND_MESSAGES: false,
VIEW_CHANNEL: false,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: false,
USE_APPLICATION_COMMANDS: false
})
c3.setParent("1072196343600267405");
let embed = new Discord.MessageEmbed()
.setColor("#9b0e09")
.setDescription(`**لقد انتهي اشتراكك في روم خاصة يمكنك التجديد الروم فقط بـ\`50الف\` .**`)
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew1_${pr.pr}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`canceldel_${pr.pr}`))
c3.send({content: `<@!${own.id}>`, embeds: [embed], components: [row]}).then(async msg1 => {
await db.set(`privr_${pr.pr}.msgw2`, msg1.id)
})
await db.set(`privr_${pr.pr}.statw`,`on`)
})
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
}
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
if (err) console.error(err);
})                                                 

  fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
})
}, 8000)
setInterval(async () => {
let channel_log = client.channels.cache.get(process.env.log_channels);
if(!channel_log) return;
let discount_mode = await db.get(`discount_${ur_server}.mode`)
if(discount_mode !== "on") return;
let discount_time = await db.get(`discount_${ur_server}.time`)
let discount = await db.get(`discount_${ur_server}.discount`)
if(discount_time == timestamp(moment(Date.now())) || discount_time < timestamp(moment(Date.now()))) {
let embed = new Discord.MessageEmbed()
.setColor("YELLOW")
.setTitle("Ended Discount")
.setDescription(`\`🔔\` **لقد تم انتهاء مدة الخصم التي كانت __<t:${discount_time}:R>__** **وكان الخصم قيمته** __${discount * 100}%__`)
channel_log.send({embeds: [embed]})
await db.set(`discount_${ur_server}`, {
time: null,
mode: "off",
discount: null
})
}
}, 8000)
setInterval(async () => {
let mode = await db.get(`privcountmsg_${ur_server}`)
if(!mode) return;
let count = await db.get(`privcountmsg_${ur_server}.count`)
if(!count) return;
let privscount = await db.get(`privaterooms_${ur_server}`)
if(!privscount) return;
if((15 - privscount) == count) return;
let msgID = await db.get(`privcountmsg_${ur_server}.msgID`)
if(!msgID) return;
let channelID = await db.get(`privcountmsg_${ur_server}.channelID`)
if(!channelID) return;
let embed = new Discord.MessageEmbed()
.setColor("#047d50")
.setDescription(`عدد الرومات الخاصة المتوفره : \`${15 - privscount}\`

**اخر تحديث في** __<t:${timestamp(moment(Date.now()))}:f>__`)
await db.set(`privcountmsg_${ur_server}.count`, 15 - privscount)
client.channels.cache.get(channelID).messages.fetch(msgID).then(msg1 => msg1.edit({embeds: [embed]})).catch(async err => {
client.channels.cache.get(channelID).send({embeds: [embed]}).then(async msg => {
await db.set(`privcountmsg_${ur_server}.msgID`, msg.id)
})
})
}, 8000)
})





let price_pr = process.env.price_pr
let price_posthe = process.env.price_post_here
let price_postev = process.env.price_post_everyone
let price_orderhe = process.env.price_order_here
let price_orderev = process.env.price_order_everyone
let price_role1 = process.env.price_role1
let price_role2 = process.env.price_role2
let price_role3 = process.env.price_role3
let price_role4 = process.env.price_role4
let price_role5 = process.env.price_role5
let price_role6 = process.env.price_role6
let price_role7 = process.env.price_role7
let price_role8 = process.env.price_role8
let channel_post = process.env.channel_post
let channel_order = process.env.channel_order
let owner_t = process.env.transfer_owner
let probotID = process.env.probotID




client.on("interactionCreate", async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'private-room') {
if(!owner.includes(interaction.user.id)) return;
let us = interaction.options.getUser('user');
const user = interaction.guild.members.cache.find(r => r.id == us)
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **انا لا استطيع العثور على الشخص**`)
if(!user) return interaction.reply({embeds: [embed_error1]})
setTimeout(async () => { interaction.deleteReply() }, 3000)
if(!privr[user.id])
privr[user.id] = {
privroom: "off",
id: null,
};

var privroom = privr[user.user.id].privroom;
var private_room1 = privr[user.user.id];
let time = interaction.options.getString('time');
let embed_error2 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء وضع وقت صحيح**`)
if(!time.endsWith("y") && !time.endsWith("d")) return interaction.reply({embeds: [embed_error2]})
let privatecountrooms = await db.get(`privaterooms_${ur_server}`)
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **ليس يوجد رومات متوفره حاليا .**`)
if(privatecountrooms == 15) return interaction.reply({embeds: [embed_error]})
let channel_log = interaction.guild.channels.cache.find(c => c.id == process.env.log_channels) 
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done create private room to ${user.user.username}**`)
interaction.reply({embeds: [embed_done]})

interaction.guild.channels.create(`↬・${user.user.username}`, "text").then(async c => {
setTimeout(async () => {
c.permissionOverwrites.create(interaction.guild.roles.everyone, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
});    
c.permissionOverwrites.create(user.user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
}, 1000)
c.setParent("1009148206887731210");
let embed1 = new Discord.MessageEmbed()
.setTitle(`روم خاصة جديدة ✅`)
  .setDescription(`
**__مالك الروم الخاصة :__** ${user.user}

<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f> **__: تنتهي في__**

<t:${timestamp(moment(ms(time)) + Date.now())}:R> **__: الوقت__**
`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
c.send({embeds: [embed1]}).then(async msg_c => {
msg_c.pin()
private_room1.privroom = "on"
private_room1.id = c.id
var embed2 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__New Buying Private Room__**`)
  .setDescription(`**Name Room :** __\`${c.name}\`__
  **Name Buyed a Room :** __\`${user.user.tag}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f>__`)
  channel_log.send({embeds: [embed2]})
await db.add(`privaterooms_${ur_server}`, 1)
await db.set(`privateroom_${user.user.id}`, c.id)
await db.set(`privatemessage_${c.id}`, msg_c.id)
await db.set(`privr_${c.id}`, {
msgID: msg_c.id,
time : timestamp(moment((ms(time)) + c.createdTimestamp)),
owner: user.user.id
})
let alt = {      
  "pr" : `${c.id}`
}
priv.push(alt)
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
    if (err) console.error(err);
            
          
          
        })
fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
            
          
          
        })
})
    })
    
  }
                  
});



client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == prefix + "come") {
let role = message.member.roles.cache.find(q => q.id == "1071828804269527162")
if(!role) return;
let args = message.content.split(" ")
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **Please [mention user] __or__ [put user ID]**`)
if(!args[1]) return message.reply({embeds: [embed_error]}).then(msg => setTimeout(async () => { msg.delete() && message.delete() }, 3000))
let user = message.mentions.users.first() || message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **I can't find this user**`)
if(!user) return message.reply({embeds: [embed_error1]}).then(msg => setTimeout(async () => { msg.delete() && message.delete() }, 3000))
client.users.cache.find(r => r.id == user.id).send({content: `**ينادولك** ${user}
<#${message.channel.id}>`}).then(e => {
message.react("✅");
}).catch(() => {
return message.channel.send().catch(() => {
return message.react("❎");
});
});
}
})








client.on("ready", async () => {
let status = await db.get(`statusrooms_${ur_server}`)
if(status == "close") return;
client.channels.cache.forEach(async rooms => {
if(rooms.parentId !== "979715163219435580") return;
if(rooms.id == "979718010946338836") return;
setInterval(async () => {
let message = await db.get(`roommsg_${rooms.id}`)
if(!message) {
rooms.send({content: `**بنفكرك قبل م تشتري شي من شخص اتاكد انك تجيب وسيط من عندنا**
        لحمايتك من النصب :shield:
        https://discord.gg/ytBpMcfVQg`}).then(async msg => {
await db.set(`roommsg_${rooms.id}`, msg.id)
})
} else {
client.channels.cache.get(rooms.id).messages.fetch(message).then(async peter => peter.delete()).catch(err => console.error(err))
rooms.send({content: `**بنفكرك قبل م تشتري شي من شخص اتاكد انك تجيب وسيط من عندنا**
        لحمايتك من النصب :shield:
        https://discord.gg/ytBpMcfVQg`}).then(async msg => {
await db.set(`roommsg_${rooms.id}`, msg.id)
})
}
}, ms("5m"))
})
})





client.on("interactionCreate", async button => {
let own = button.user.id;
if(!privr[own]) return privr[own] = {
id: null,
privroom: null,
}
let privroom = privr[own].id
let owner = await db.get(`privr_${privroom}.owner`)
if (button.isCommand()) return;
if(button.customId === `cancel_${privroom}` || !button.customId.includes("renew_")) return;
if(owner !== button.user.id) return;
let chrenew = await db.get(`privr_${privroom}.chrenew`)
let channel_buy = client.channels.cache.get(chrenew)
if(!channel_buy) return;
if(chrenew !== button.channel.id) return;
if(!privroom) return;
let priroom = client.channels.cache.find(a => a.id == privroom)
if(!priroom) return;
let status1 = await db.get(`statusroom_${privroom}.warn1`)
if(status1 === "off" || !status1) return;
let user = client.guilds.cache.get(ur_server).members.cache.find(w => w.id == own)
if(!user) return;
let time = await db.get(`privr_${priroom.id}.time`)
if(!time) return;
await button.reply({ content: `\`\`\`\n#credit ${owner_t} ${price_pr}\n\`\`\`` });
setTimeout(async () => {
button.fetchReply().then(async reply => {
await db.delete(`buyer_${button.user.id}`)
button.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
var check = await client.probot.collect(button, {
probotId: `282859044593598464`,
owners: ["1021742894182305803"],
time: 1000 * 60 * 5,
userId: button.user.id,
price: 1,
fullPrice: false,
});
if(check.status) {
button.deleteReply()
let role1 = client.guilds.cache.get(ur_server).roles.cache.find(s => s.name == "@everyone");
let channel_log = client.channels.cache.get(process.env.log_channels);
client.channels.cache.get(chrenew).delete().catch(err => console.error(err))
var private_room1 = privr[own];
let msg_renew = await db.get(`privr_${priroom.id}.msgID`)
let mess = client.channels.cache.get(privroom).messages.fetch(msg_renew)
if(!mess || !msg_renew) {
priroom.permissionOverwrites.edit(user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
priroom.permissionOverwrites.edit(role1, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
}); 
     private_room1.privroom = "on"
  let embed_done = new Discord.MessageEmbed()
.setTitle(`Room Has Been Renewal ✅`)
  .setDescription(`
**__Room Owner :__** ${user}

**__End At :__** <t:${timestamp(moment((ms("7d")))) + time}:f>

**__Time :__** <t:${timestamp(moment((ms("7d")))) + time}:R>
`)
.setFooter(button.guild.name, button.guild.iconURL({dynamic: true}))
  client.channel.cache.get(privroom).send({embeds: [embed_done]}).then(async msg => {
  msg.pin()
  var embed_done1 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__Renew Private Room__**`)
  .setDescription(`**Name Room :** __\`${priroom.name}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms("7d")))) + time}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms("7d")))) + time}:f>__`)
  channel_log.send({embeds: [embed_done1]})
await db.set(`privr_${priroom.id}`, {
msgID: msg.id,
time : timestamp((ms("7d")) + time),
owner: user
})
db.set(`statusroom_${priroom.id}.warn1`, "off")
var privroom = privr[user.id];
privroom.privroom = "on"
    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
return;
  })
}
client.channels.cache.get(privroom).messages.fetch(msg_renew).then(async msg => {
priroom.permissionOverwrites.edit(user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
priroom.permissionOverwrites.edit(role1, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
}); 
     private_room1.privroom = "on"
  let embed_done = new Discord.MessageEmbed()
.setTitle(`Room Has Been Renewal ✅`)
  .setDescription(`
**__Room Owner :__** ${user}

**__End At :__** <t:${timestamp(moment((ms("7d")))) + time}:f>

**__Time :__** <t:${timestamp(moment((ms("7d")))) + time}:R>
`)
.setFooter(button.guild.name, button.guild.iconURL({dynamic: true}))
  msg.edit({embeds: [embed_done]})
  var embed_done1 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__Renew Private Room__**`)
  .setDescription(`**Name Room :** __\`${priroom.name}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms("7d")))) + time}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms("7d")))) + time}:f>__`)
  channel_log.send({embeds: [embed_done1]})
await db.set(`privr_${priroom.id}`, {
msgID: msg.id,
time: timestamp(moment((ms("7d")))) + time,
owner: user
})
db.delete(`statusroom_${priroom.id}.warn1`)
var privroom = privr[user.id];
privroom.privroom = "on"
    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
})
button.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
button.channel.delete() 
}, 3000)
}
})






client.on('interactionCreate', async button => {
let own = button.user.id;
let privroom = privr[own].id
if (button.isCommand()) return;
if(button.customId === `renew_${privroom}` || !button.customId.includes("cancel_")) return;
let owner = await db.get(`privr_${privroom}.owner`)
if(owner !== button.user.id) return;
let chrenew = await db.get(`privr_${privroom}.chrenew`)
let channel_buy = client.channels.cache.find(r => r.id == chrenew)
if(!channel_buy) return;
if(channel_buy.id !== button.channel.id) return;
if(!privroom) return;
let priroom = client.channels.cache.find(a => a.id == privroom)
if(!priroom) return;
let status1 = await db.get(`statusroom_${privroom}.warn1`)
if(status1 === "off" || !status1) return;
let status = await db.get(`statusroom_${privroom}.warn`)
if(status && status === "on") return;
let msg_warn = await db.get(`privr_${privroom}.msgw1`)
let mess = client.channels.cache.get(chrenew).messages.fetch(msg_warn)
if(!msg_warn || !mess) {
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew_${privroom}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`cancelwarn1_${privroom}`))
let embed_warn = new Discord.MessageEmbed()
.setColor("YELLOW")
.setDescription('**هل انت متاكد بعدم التجديد؟ سعر التجديد فقط `50الف`**')
await button.channel.send({embeds: [embed_warn], components: [row]}).then(msg => {
const filter = i => {
return i.user.id === button.user.id
}
const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', filter });
collector.on('collect', i => {
if(i.customId === `cancelwarn1_${privroom}`) {
channel_buy.delete()
db.set(`privr_${privroom}.timewarn`, timestamp(moment((ms("2d")) + Date.now())))
db.set(`statusroom_${privroom}.warn`, `on`)
        }
    })
})
fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
if (err) console.error(err);
})
return;
} 
let embed_end = new Discord.MessageEmbed()
.setDescription(`انتهت صلاحية اشتراك الروم ، إذا كنت ترغب في تجديدها ، فلديك يومان لتجديده أو ستحذف الروم`)
.setColor("#9b0e09")
client.channels.cache.get(chrenew).messages.fetch(msg_warn).then(async msg => {
msg.edit({content: `<@!${own}>`, embeds: [embed_end], components: []})
}).catch(err => console.error(err))
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew_${privroom}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`cancelwarn1_${privroom}`))
let embed_warn = new Discord.MessageEmbed()
.setColor("YELLOW")
.setDescription(`**هل انت متاكد بعدم التجديد؟ سعر التجديد فقط \`50الف\`**`)
await button.channel.send({embeds: [embed_warn], components: [row]}).then(async msg => {
const filter = i => {
return i.user.id === button.user.id
}
const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', filter, time: 15000 });
collector.on('collect', i => {
if(i.customId === `cancelwarn1_${privroom}`) {
i.channel.delete()
db.set(`privr_${privroom}.timewarn`, timestamp(moment((ms("2d")) + Date.now())))
db.set(`statusroom_${privroom}.warn`, `on`)
        }
    })
})
fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
if (err) console.error(err);
})
})





client.on("interactionCreate", async button => {
let own = button.user.id;
if(!privr[own]) return privr[own] = {
id: null,
privroom: null,
}
let privroom = privr[own].id
let owner = await db.get(`privr_${privroom}.owner`)
if(button.customId === `renew_${privroom}` || button.customId === `cancel_${privroom}` || button.customId === `canceldel_${privroom}` || button.customId !== `renew1_${privroom}`) return;
if(owner !== button.user.id) return;
let chrenew = await db.get(`privr_${privroom}.chrenew2`)
let channel_buy = client.channels.cache.find(w => w.id == chrenew)
if(!channel_buy) return;
if(chrenew !== button.channel.id) return;
if(!privroom) return;
let priroom = client.channels.cache.find(a => a.id == privroom)
if(!priroom) return;
await button.reply({ content: `\`\`\`\n#credit ${owner_t} ${price_pr}\n\`\`\`` })
setTimeout(async () => {
button.fetchReply().then(async reply => {
await db.delete(`buyer_${button.user.id}`)
button.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
let user = client.guilds.cache.get(ur_server).members.cache.find(w => w.id == own)
if(!user) return;
let time = await db.get(`privr_${priroom.id}.time`)
if(!time) return;
  let role1 = client.guilds.cache.get(ur_server).roles.cache.find(s => s.name == "@everyone");
let channel_log = client.channels.cache.get(process.env.log_channels);
var check = await client.probot.collect(button, {
probotId: `282859044593598464`,
owners: ["1021742894182305803"],
time: 1000 * 60 * 5,
userId: button.user.id,
price: 1,
fullPrice: false,
});
if(check.status) {
button.deleteReply()
channel_buy.delete()
var private_room1 = privr[own];
let msg_private = await db.get(`privr_${priroom.id}.msgID`)
let mess = client.channels.cache.get(privroom).messages.fetch(msg_private)
if(!mess || !msg_private) {
priroom.permissionOverwrites.edit(user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
priroom.permissionOverwrites.edit(role1, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
}); 
     private_room1.privroom = "on"
  let embed_done = new Discord.MessageEmbed()
.setTitle(`Room Has Been Renewal ✅`)
  .setDescription(`
**__Room Owner :__** ${user}

**__End At :__** <t:${timestamp((ms("7d") + Date.now()))}:f>

**__Time :__** <t:${timestamp((ms("7d") + Date.now()))}:R>
`)
.setFooter(button.guild.name, button.guild.iconURL({dynamic: true}))
  client.channel.cache.get(privroom).send({embeds: [embed_done]}).then(async msg => {
  msg.pin()
  var embed_done1 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__Renew Private Room__**`)
  .setDescription(`**Name Room :** __\`${priroom.name}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms("7d") + Date.now())))}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms("7d") + Date.now())))}:f>__`)
  channel_log.send({embeds: [embed_done1]})
await db.set(`privr_${priroom.id}`, {
msgID: msg.id,
time : timestamp(moment((ms("7d") + Date.now()))),
owner: user
})
var privroom = privr[user.id];
privroom.privroom = "on"
    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
return;
  })
}
client.channels.cache.get(privroom).messages.fetch(msg_private).then(async msg => {
priroom.permissionOverwrites.edit(user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
priroom.permissionOverwrites.edit(role1, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
}); 
     private_room1.privroom = "on"
  let embed_done = new Discord.MessageEmbed()
.setTitle(`Room Has Been Renewal ✅`)
  .setDescription(`
**__Room Owner :__** ${user}

**__End At :__** <t:${timestamp(moment((ms("7d") + Date.now())))}:f>

**__Time :__** <t:${timestamp(moment((ms("7d") + Date.now())))}:R>
`)
.setFooter(button.guild.name, button.guild.iconURL({dynamic: true}))
  msg.edit({embeds: [embed_done]})
  var embed_done1 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__Renew Private Room__**`)
  .setDescription(`**Name Room :** __\`${priroom.name}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms("7d") + Date.now())))}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms("7d") + Date.now())))}:f>__`)
  channel_log.send({embeds: [embed_done1]})
await db.set(`privr_${priroom.id}`, {
msgID: msg.id,
time : timestamp(moment(ms("7d") + Date.now())),
owner: user
})
await db.set(`statusroom_${priroom.id}`,{
warn: "off",
warn1: "off"
})
var privroom = privr[user.id];
privroom.privroom = "on"
    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
})
button.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
button.channel.delete() 
}, 3000)
}
})


client.on("interactionCreate", async button => {
let own = button.user.id;
let privroom = privr[own].id
let owner = await db.get(`privr_${privroom}.owner`)
if(button.customId === `renew1_${privroom}` || button.customId === `renew_${privroom}` || button.customId === `cancel_${privroom}` || button.customId !== `canceldel_${privroom}`) return;
if(owner !== button.user.id) return;
let chrenew = await db.get(`privr_${privroom}.chrenew2`)
let channel_buy = client.channels.cache.find(w => w.id == chrenew)
if(!channel_buy) return;
if(channel_buy.id !== button.channel.id) return;
if(!privroom) return;
let priroom = client.channels.cache.find(a => a.id == privroom)
if(!priroom) return;
let msg_warn = await db.get(`privr_${privroom}.msgw2`)
let mess = client.channels.cache.get(chrenew).messages.fetch(msg_warn)
if(!msg_warn || !mess) {
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew1_${privroom}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`canceldel1_${privroom}`))
let embed_warn = new Discord.MessageEmbed()
.setColor("YELLOW")
.setDescription('**هل انت متاكد بعدم التجديد؟ سعر التجديد فقط `50الف`**')
await button.channel.send({embeds: [embed_warn], components: [row]}).then(async msg => {
const filter = i => {
return i.user.id === button.user.id
}
const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', filter });
collector.on('collect', async i => {
if(i.customId === `canceldel1_${privroom}`) {
channel_buy.delete()
priroom.delete()
await db.delete(`privr_${privroom}`)
await db.delete(`privr_${privroom}`)
await db.delete(`statusroom_${privroom}`)
await db.delete(`privateroom_${owner}`)
await db.delete(`privatemessage_${privroom}`)
await db.add(`privaterooms_${ur_server}`, -1)
delete priv[privroom]
delete privr[owner]

    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
    fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
    if (err) console.error(err);
  });
        }
  })
    })
return;
}
let embed_end = new Discord.MessageEmbed()
.setColor("#9b0e09")
.setDescription(`**لقد انتهي اشتراكك في روم خاصة يمكنك التجديد الروم فقط بـ\`50الف\` .**`)
client.channels.cache.get(chrenew).messages.fetch(msg_warn).then(async msg => {
msg.edit({content: `<@!${own}>`, embeds: [embed_end], components: []})
}).catch(err => console.error(err))
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setStyle('SUCCESS')
.setLabel("تجديد")
.setCustomId(`renew1_${privroom}`),
new MessageButton()
.setStyle('DANGER')
.setLabel("عدم التجديد")
.setCustomId(`canceldel1_${privroom}`))
let embed_warn = new Discord.MessageEmbed()
.setColor("YELLOW")
.setDescription('**هل انت متاكد بعدم التجديد؟ سعر التجديد فقط `50الف`**')
await button.channel.send({embeds: [embed_warn], components: [row]}).then(async msg => {
const filter = i => {
return i.user.id === button.user.id
}
const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', filter });
collector.on('collect', async i => {
if(i.customId === `canceldel1_${privroom}`) {
channel_buy.delete()
priroom.delete()
await db.delete(`privr_${privroom}`)
await db.delete(`privr_${privroom}`)
await db.delete(`statusroom_${privroom}`)
await db.delete(`privateroom_${owner}`)
await db.delete(`privatemessage_${privroom}`)
delete priv[privroom]
delete privr[owner]

    fs.writeFile("./privateroom.json", JSON.stringify(privr), err => {
    if (err) console.error(err);
  });
    fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
    if (err) console.error(err);
  });
        }
  })
    })
})



client.on("messageCreate", async message => {
if(message.author.bot) return;
if(message.channel.parentId !== "1009148206887731210") return;
let own = message.author.id;
if(!privr[own]) return privr[own] = {
id: null,
privroom: null
}
let privroom = privr[own].id;
if(!privroom) return;
let owner = await db.get(`privr_${privroom}.owner`)
if(!owner) return;
var priroom = privr[owner].privroom
if(!priroom) return;
if(message.channel.id !== privroom) return;
if(owner !== message.author.id) return;
if(priroom == "privateroom") return;
message.channel.send({files: ["line.png"]})
})




client.on("messageCreate", async message => {
if(message.author.bot) return;
if(message.channel.parentId !== "979715163219435580") return;
let status = await db.get(`statusrooms_${ur_server}`)
if(status == "close") return;
message.channel.send({files: ["line.png"]})
})





client.on("interactionCreate", async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'buy') {
if(interaction.channel.parentId !== "979716191159472168") return;
let buy = await db.get(`buyer_${interaction.user.id}`)
let ch = await db.get(`buyer_${interaction.user.id}.channel`)
if(interaction.channel.id === ch) return;
if(!buy) {
await interaction.deferReply()
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('. انقر لشراء الشيء الذي تريده')
					.addOptions([
						{
							label: 'رتب بائعين',
							description: '. يظهر لك قائمة لأختيار الرتبة المناسبة لك',
							value: 'option1',
						},
           	{
							label: 'رتب نادرة',
							description: '. من هنا يمكنك شراء رتب نادرة ب مميزات قوية',
							value: 'option6',
						},
						{
							label: 'روم خاصة',
							description: '. من هنا يمكنك شراء روم خاصة باسمك',
							value: 'option2',
						},
           	{
							label: 'منشورات مميزة',
							description: '. من هنا يكمنك شراء منشور مميز',
							value: 'option3',
						},
          	{
							label: 'طلبات مميزة',
							description: '. من هنا يكمنك شراء طلب مميز مع منشن',
							value: 'option4',
						},
           	{
							label: 'إزالة التحذيرات',
							description: '. من هنا يكمنك إزالة جميع تحذيراتك',
							value: 'option5',
						},
					]),
			);
await interaction.channel.send({content: `**مرحبا ${interaction.user} 👋 

من فضلك قم باختيار الذي تريده من الاسفل. **`, components: [row]}).then(async msg => {
interaction.deleteReply()
await db.set(`buyer_${interaction.user.id}`, {
status: "on",
channel: interaction.channel.id,
msgID: msg.id,
user: interaction.user.id
})
})
return;
}
let status = await db.get(`buyer_${interaction.user.id}.status`)
let embed_status = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لديك عملية شراء متاحة الأن ، لا يمكن اجراء اخرى**`)
if(status == "on") return interaction.reply({embeds: [embed_status]})
await interaction.deferReply()
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('. انقر لشراء الشيء الذي تريده')
					.addOptions([
						{
							label: 'رتب بائعين',
							description: '. يظهر لك قائمة لأختيار الرتبة المناسبة لك',
							value: 'option1',
						},
           	{
							label: 'رتب نادرة',
							description: '. من هنا يمكنك شراء رتب نادرة ب مميزات قوية',
							value: 'option6',
						},
						{
							label: 'روم خاصة',
							description: '. من هنا يمكنك شراء روم خاصة باسمك',
							value: 'option2',
						},
           	{
							label: 'منشورات مميزة',
							description: '. من هنا يكمنك شراء منشور مميز',
							value: 'option3',
						},
          	{
							label: 'طلبات مميزة',
							description: '. من هنا يكمنك شراء طلب مميز مع منشن',
							value: 'option4',
						},
           	{
							label: 'ازالة التحذيرات',
							description: '. من هنا يمكنك ازالة جميع التحذيرات',
							value: 'option5',
						},
					]),
			);
await interaction.channel.send({content: `**مرحبا ${interaction.user} 👋 

من فضلك قم باختيار الذي تريده من الاسفل. **`, components: [row]}).then(async msg => {
interaction.deleteReply()
db.set(`buyer_${interaction.user.id}.msgID`, msg.id)
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
})
}
})


client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option1") {
let status = await db.get(`buyer_${interaction.user.id}.status`)
if(status == "off") return;
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`<:s_:1078044783836155945> **Roles'S〡معلومات الرتب**
<:3_:1078029951644749824><:2_:1078029979855634452><:2_:1078029979855634452><:2_:1078029979855634452><:2_:1078029979855634452><:2_:1078029979855634452><:2_:1078029979855634452><:2_:1078029979855634452><:1_:1078030013070315603>

<:0_:1078044791952113734> **Mythic Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 150K ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
النشر بكل الرومات<:4_:1077984131541110864>
امكانية المنشن في الورمات<:4_:1077984131541110864>
نشر صور بكل الرومات<:4_:1077984131541110864>

<:0_:1078044791952113734> **Special  Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 100K ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
النشر في جميع الرومات باستثناء [التصاميم والمبرمجين]<:4_:1077984131541110864>
نشر الصور بكل الرومات<:4_:1077984131541110864>
امكانية المنشن بكل الرومات<:4_:1077984131541110864>

<:0_:1078044791952113734> **Great Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 80k ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
النشر في جميع الرومات باستثناء [التصاميم والمبرمجين]<:4_:1077984131541110864>
لا يمكن نشر صور<:4_:1077984131541110864>
امكانية المنشن بكل الرومات<:4_:1077984131541110864>

<:0_:1078044791952113734> **Demon Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 45K ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
النشر في جميع الرومات باستثناء [التصاميم والمبرمجين]<:4_:1077984131541110864>
لا يمكن نشر صور<:4_:1077984131541110864>
لا يمكنه المنشن<:4_:1077984131541110864>

<:0_:1078044791952113734> **Designer Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 50K ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
امكانية نشر بروم تصاميم<:4_:1077984131541110864>
تقدر تنشر صور بروم تصاميم<:4_:1077984131541110864>
منشن بروم تصاميم<:4_:1077984131541110864>

<:0_:1078044791952113734> **Developer Role**
<:l_:1078045936971939860><:m_:1078044787376140328> [ Price : 50K ]
<:n_:1078044789066436678> **\`Perms'الخصائص\`**
نشر بروم المبرمجين<:4_:1077984131541110864>
تقدر تنشر صور بروم المبرمجين<:4_:1077984131541110864>
منشن هير بروم المبرمجين<:4_:1077984131541110864>`)
.setImage("https://i.im.ge/2023/02/12/a3BzUc.20220422-194538.png")
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('. انقر واختر الرتبة المناسبة لك')
					.addOptions([
						{
							label: '@Mythic    = 130K',
							value: 'role1',
						},
						{
							label: '@Special  = 100k',
							value: 'role2',
						},
        		{
							label: '@Great    = 80k',
							value: 'role3',
						},
           	{
							label: '@Demon    = 45k',
							value: 'role4',
						},
          	{
							label: '@Designer    = 50k',
							value: 'role5',
						},
          	{
							label: '@Developer    = 50k',
							value: 'role6',
						},
					]),
			);
interaction.channel.send({embeds:[embed], components: [row]}).then(async msg => {
await db.set(`buyer_${interaction.user.id}.msgID`, msg.id)
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
})
}
})




client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role1`) {
let roleid1 = await db.get(`roles_${ur_server}.Mythic`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role1
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role1 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role1 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role1 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Mythic")
let role1 = interaction.guild.roles.cache.get(roleid1)
if(!role1) return;
interaction.member.roles.add(role1.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Mythic Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role1} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role1}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role1,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Mythic")
let role1 = interaction.guild.roles.cache.get(roleid1)
if(!role1) return;
interaction.member.roles.add(role1.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Mythic Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})




client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role2`) {
let roleid2 = await db.get(`roles_${ur_server}.Special`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role2
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role2 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role2 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role2 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Special")
let role2 = interaction.guild.roles.cache.get(roleid2)
if(!role2) return;
interaction.member.roles.add(role2.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Special Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role2} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role2}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role2,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Special")
let role2 = interaction.guild.roles.cache.get(roleid2)
if(!role2) return;
interaction.member.roles.add(role2.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Special Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})





client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role3`) {
let roleid3 = await db.get(`roles_${ur_server}.Great`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role3
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role3 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role3 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role3 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Great")
let role3 = interaction.guild.roles.cache.get(roleid3)
if(!role3) return;
interaction.member.roles.add(role3.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Great Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role3} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role3}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role3,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Great")
let role3 = interaction.guild.roles.cache.get(roleid3)
if(!role3) return;
interaction.member.roles.add(role3.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Great Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})




client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role4`) {
let roleid4 = await db.get(`roles_${ur_server}.Demon`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role4
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role4 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role4 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role4 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Demon")
let role4 = interaction.guild.roles.cache.get(roleid4)
if(!role4) return;
interaction.member.roles.add(role4.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Demon Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role4} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role4}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role4,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Demon")
let role4 = interaction.guild.roles.cache.get(roleid4)
if(!role4) return;
interaction.member.roles.add(role4.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Demon Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})





client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role5`) {
let roleid5 = await db.get(`roles_${ur_server}.Designer`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role5
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role5 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role5 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role5 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Designer")
let role5 = interaction.guild.roles.cache.get(roleid5)
if(!role5) return;
interaction.member.roles.add(role5.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Designer Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role5} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role5}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role5,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Designer")
let role5 = interaction.guild.roles.cache.get(roleid5)
if(!role5) return;
interaction.member.roles.add(role5.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Designer Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})




client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role6`) {
let roleid6 = await db.get(`roles_${ur_server}.Developer`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_role6
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role6 - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role6 - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role6 - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Developer")
let role6 = interaction.guild.roles.cache.get(roleid6)
if(!role6) return;
interaction.member.roles.add(role6.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Developer Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role6} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role6}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role6,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Developer")
let role6 = interaction.guild.roles.cache.get(roleid6)
if(!role6) return;
interaction.member.roles.add(role6.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Developer Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})


client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option2") {
let privatecountrooms = await db.get(`privaterooms_${ur_server}`)
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let urpr = privr[interaction.user.id].privroom;
let chpr = privr[interaction.user.id].id;
let urchpr = interaction.guild.channels.cache.find(h => h.id == chpr)
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لديك روم بالفعل ، لا يمكنك شراء اخرى .**`)
if(urpr == "on" && urchpr) return interaction.channel.send({embeds: [embed_error]})&& await db.delete(`buyer_${interaction.user.id}`);
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **ليس يوجد رومات متوفره حاليا .**`)
if(privatecountrooms == 15) return interaction.channel.send({embeds: [embed_error1]}) && await db.delete(`buyer_${interaction.user.id}`);
if(!privr[interaction.user.id])
privr[user.id] = {
privroom: "off",
id: null,
};
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_pr
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_pr - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_pr - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_pr - fake_price,
fullPrice: false,
});
if(check.status) {
let privatecount = await db.get(`privaterooms_${ur_server}`)
if(privatecount) {
await db.add(`privaterooms_${ur_server}`, 1)
} else {
await db.set(`privaterooms_${ur_server}`, 1)
}
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
var privroom = privr[interaction.user.id].privroom;
var private_room1 = privr[interaction.user.id];
let time = "7d"
let channel_log = interaction.guild.channels.cache.find(c => c.id == process.env.log_channels) 
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed private room by ${interaction.user.username}**`)
interaction.channel.send({embeds: [embed_done]})

interaction.guild.channels.create(`↬・${interaction.user.username}`, "text").then(async c => {
setTimeout(async () => {
c.permissionOverwrites.create(interaction.guild.roles.everyone, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
});    
c.permissionOverwrites.create(interaction.user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
}, 1000)
c.setParent("1009148206887731210");
let embed1 = new Discord.MessageEmbed()
.setTitle(`روم خاصة جديدة ✅`)
  .setDescription(`
**__مالك الروم الخاصة :__** ${interaction.user}

<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f> **__: تنتهي في__**

<t:${timestamp(moment(ms(time)) + Date.now())}:R> **__: الوقت__**
`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
c.send({embeds: [embed1]}).then(async msg_c => {
msg_c.pin()
private_room1.privroom = "on"
private_room1.id = c.id
var embed2 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__New Buying Private Room__**`)
  .setDescription(`**Name Room :** __\`${c.name}\`__
  **Name Buyed a Room :** __\`${interaction.user.tag}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f>__`)
  channel_log.send({embeds: [embed2]})
await db.set(`privateroom_${interaction.user.id}`, c.id)
await db.set(`privatemessage_${c.id}`, msg_c.id)
      await db.set(`privr_${c.id}`, {
msgID: msg_c.id,
time : timestamp(moment((ms(time)) + c.createdTimestamp)),
owner: interaction.user.id
})
let alt = {      
  "pr" : `${c.id}`
}
priv.push(alt)
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
    if (err) console.error(err);
            
          
})
})
})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_pr} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_pr}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_pr,
fullPrice: false,
});
if(check.status) {
let privatecount = await db.get(`privaterooms_${ur_server}`)
if(privatecount) {
await db.add(`privaterooms_${ur_server}`, 1)
} else {
await db.set(`privaterooms_${ur_server}`, 1)
}
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
var privroom = privr[interaction.user.id].privroom;
var private_room1 = privr[interaction.user.id];
let time = "7d"
let channel_log = interaction.guild.channels.cache.find(c => c.id == process.env.log_channels) 
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed private room by ${interaction.user.username}**`)
interaction.channel.send({embeds: [embed_done]})

interaction.guild.channels.create(`↬・${interaction.user.username}`, "text").then(async c => {
setTimeout(async () => {
c.permissionOverwrites.create(interaction.guild.roles.everyone, {
SEND_MESSAGES: false,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
});    
c.permissionOverwrites.create(interaction.user, {
SEND_MESSAGES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES_IN_THREADS: false,
CREATE_PUBLIC_THREADS: false,
CREATE_PRIVATE_THREADS: false,
ADD_REACTIONS: false,
READ_MESSAGE_HISTORY: true,
USE_APPLICATION_COMMANDS: false
})
}, 1000)
c.setParent("1009148206887731210");
let embed1 = new Discord.MessageEmbed()
.setTitle(`روم خاصة جديدة ✅`)
  .setDescription(`
**__مالك الروم الخاصة :__** ${interaction.user}

<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f> **__: تنتهي في__**

<t:${timestamp(moment(ms(time)) + Date.now())}:R> **__: الوقت__**
`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
c.send({embeds: [embed1]}).then(async msg_c => {
msg_c.pin()
private_room1.privroom = "on"
private_room1.id = c.id
var embed2 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(`**__New Buying Private Room__**`)
  .setDescription(`**Name Room :** __\`${c.name}\`__
  **Name Buyed a Room :** __\`${interaction.user.tag}\`__
  **Subscribe Time The Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:R>__
  **Ends at Time Room :** __<t:${timestamp(moment((ms(time)) + c.createdTimestamp))}:f>__`)
  channel_log.send({embeds: [embed2]})
await db.set(`privateroom_${interaction.user.id}`, c.id)
await db.set(`privatemessage_${c.id}`, msg_c.id)
      await db.set(`privr_${c.id}`, {
msgID: msg_c.id,
time : timestamp(moment((ms(time)) + c.createdTimestamp)),
owner: interaction.user.id
})
let alt = {      
  "pr" : `${c.id}`
}
priv.push(alt)
fs.writeFile("./privaterooms.json", JSON.stringify(priv), err => {
    if (err) console.error(err);
            
          
})
})
})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})

const { Modal, TextInputComponent, showModal  } = require('discord-modals')
const modal = new Modal()
.setCustomId('modalop3')
.setTitle('منشورات مميزة')
.addComponents([
  new TextInputComponent()
  .setCustomId('textinputop3')
  .setLabel('ضع منشورك اسفل')
  .setStyle('LONG')
  .setMinLength(10)
  .setMaxLength(400)
  .setPlaceholder('. من فضلك ضع رساله منشورك هنا')
  .setRequired(true)
]);
client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option3") {
showModal(modal, {
client: client,
interaction: interaction
})
}
})


let badwords = ["👉👌",
  "🖕",
 "احا",
 "احه",
 "اير",
 "لعين",
 "واطي",
  "ال",
  "المرا",
  "المره",
  "النيك",
  "عاهر",
  "كلب",
  "احيه",
  "اخو ال",
  "اخو القحبه",
  "افسخك",
  "اقلب وجهك",
  "الخرائ",
  "الزب",
  "السافل",
  "الساقط",
  "العايب",
  "العربان",
  "العرص",
  "العمى",
  "القحبه",
  "الكحبه",
  "الكحبه",
  "الكس",
  "الكلب",
  " ياخ",
  "انذال",
  "انذل",
  "انكح",
  "انيك",
  "انيكك",
  "اهبل",
  "اونطه",
  "اونطه",
  "اونطي",
  "ايري",
  "ايور",
  "بزاز",
  "بعبص",
  "بعص",
  "بغاي",
  "بندوق",
  "بهيمه",
  "تافه",
  "تجليخ",
  "ترهيط",
  "تزغيب",
  "تسد بوزك",
  "تفو",
  "جلخ",
  "جلق",
  "حرامي",
  "حقير",
  "حلبتها",
  "حلبتو",
  "حلمات",
  "حمير",
  "حيوان",
  "خرا",
  "خراء",
  "خراي عل",
  "خراي",
  "خره",
  "خرى",
  "خري",
  "خسيس",
  "خنيث",
  "خوازيق",
  "خول",
  "داشر",
  "داعر",
  "دعاره",
  "دلخ",
  "ديوث",
  "ديود",
  "زامل",
  "زب",
  "زبار",
  "زبر",
  "زبه",
  "زبي",
  "زراط",
  "زق",
  "زناه",
  "زناطير",
  "ساذج",
  "سارموتا",
  "سافل",
  "سربوط",
  "سرموتا",
  "سفاله",
  "سكسي",
  "سيكس",
  "سيكسي",
  "شرمها",
  "شرموط",
  "شرموطه",
  "شرموطه",
  "شلقه",
  "شلكه",
  "صايع",
  "صياعه",
  "ضرب عشره",
  "طز في",
  "طيز",
  "عاهر",
  "عاهره",
  "عايبه",
  "عبيط",
  "عرص",
  "عكروت",
  "غبي",
  "غتصب",
  "فاجر",
  "فاسق",
  "فجور",
  "فسختها",
  "قحاب",
  "قحب",
  "قحبه",
  "قذر",
  "قضيب",
  "قضيبي",
  "كحبه",
  "كذاب",
  "كس",
  "كسا",
  "كسمك",
  "كسمكم",
  "كسها",
  "كلاب",
  "كلب",
  "كلخر",
  "لحس",
  "لعنه",
  "لقحاب",
  "لوطي",
  "مأجور",
  "مبعوص",
  "متخوزق",
  "متناك",
  "مجنون",
  "مخانيث",
  "مخنث",
  "مدلس",
  "معوهر",
  "مفسوخ",
  "مكسكس",
  "مكوتها",
  "ملعون",
  "ممحون",
  "منايك",
  "منيك",
  "منيوك",
  "ناكك",
  "نجس",
  "نذل",
  "نفضك",
  "نفظك",
  "نكت",
  "نياكه",
  "نياكه",
  "وسخ",
  "يتناك",
  "يزغب",
  "يفضح",
  "يفظح",
  "يولاد ال",
  "يلعن",
  "سكس",
  "طيزي",
  "طيزو",
  "شرج",
  "لعق",
  "لحس",
  "مص",
  "تمص",
  "بيضان",
  "ثدي",
  "بز",
  "بزاز",
  "حلمه",
  "مفلقسه",
  "بظر",
  "كس",
  "كسي",
  "فرج",
  "شهوه",
  "شاذ",
  "مبادل",
  "عاهره",
  "جماع",
  "قضيب",
  "زب",
  "لوطي",
  "لواط",
  "سحاق",
  "سحاقيه",
  "اغتصاب",
  "خنثي",
  "احتلام",
  "نيك",
  "متناك",
  "متناكه",
  "شرموطه",
  "عرص",
  "خول",
  "قحبه",
  "لبوه",
  "السكس",
  "الطيز",
  "الطيزي",
  "الطيزو",
  "الشرج",
  "اللعق",
  "اللحس",
  "المص",
  "التمص",
  "البيضان",
  "الثدي",
  "البز",
  "البزاز",
  "الحلمه",
  "المفلقسه",
  "البظر",
  "الكس",
  "الكسي",
  "الفرج",
  "الشهوه",
  "الشاذ",
  "المبادل",
  "العاهره",
  "الجماع",
  "القضيب",
  "الزب",
  "اللوطي",
  "اللواط",
  "السحاق",
  "السحاقيه",
  "الاغتصاب",
  "الخنثي",
  "الاحتلام",
  "النيك",
  "المتناك",
  "المتناكه",
  "الشرموطه",
  "العرص",
  "الخول",
  "القحبه",
  "اللبوه",
  "الفشخه",
  "فشخه",
  "هنيكك",
  "الممحونه",
  "ممحونه",
  "ايري",
  "الاير",
  "بخش",
  "البخش",
  "بخشي",
  "طيزا",
  "عكروت",
  "نايك",
  "انكحك",
  "انتاك",
  "خرايا",
  "ديوث",
  "قواد",
  "يلعن",
  "يلعنك",
  "ملحات",
  "زاكا",
  "صرمك يا خول"
]

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true
    }
    return false;
}

client.on('modalSubmit', async (modal) => {
if(modal.customId === 'modalop3'){
let msgID = await db.get(`buyer_${modal.user.id}.msgID`)
let mess = modal.channel.messages.fetch(msgID)
let owner = await db.get(`buyer_${modal.user.id}.user`)
if(owner !== modal.user.id) return;
let firstResponse = modal.getTextInputValue('textinputop3')
client.channels.cache.get(modal.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
await modal.deferReply()
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('انقر لختيار نوع المنشن')
					.addOptions([
						{
							label: `@Everyone = 100K`,
							value: `everyonepost`,
						},
          	{
							label: '@Here = 50K',
							value: 'herepost',
						},
					]),
			);
await modal.channel.send({content: `**من فضلك قم بختيار نوع المنشن من الاسفل**`, components: [row]}).then(async msg => {
await db.set(`buyer_${modal.user.id}.msgID`, msg.id)
await db.set(`post_${modal.user.id}.msg`, firstResponse)
modal.deleteReply()
})
}  
});


client.on("interactionCreate", async (i) => {
if(i.values == "everyonepost") {
let msgID = await db.get(`buyer_${i.user.id}.msgID`)
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = price_postev * discount_num
let owner = await db.get(`buyer_${i.user.id}.user`)
if(owner !== i.user.id) return;
let firstResponse = await db.get(`post_${i.user.id}.msg`)
if(!firstResponse) return;
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_postev - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_postev - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds:[embed]})

setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_postev - fake_price,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(firstResponse.slice(split), ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_postev} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_postev}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds:[embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_postev,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(firstResponse.slice(split), ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
}
})



client.on("interactionCreate", async (i) => {
if(i.values == "herepost") {
let msgID = await db.get(`buyer_${i.user.id}.msgID`)
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = price_posthe * discount_num
let owner = await db.get(`buyer_${i.user.id}.user`)
if(owner !== i.user.id) return;
let firstResponse = await db.get(`post_${i.user.id}.msg`)
if(!firstResponse) return;
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_posthe - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_posthe - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds:[embed]})

setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
const firstResponse = i.getTextInputValue('textinputop3')
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_posthe - fake_price,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(firstResponse.slice(split), ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_posthe} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_posthe}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds:[embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_posthe,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(firstResponse.slice(split), ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر منشورك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_post).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
}
})


const modal1 = new Modal()
.setCustomId('modalop4')
.setTitle('طلبات مميزة')
.addComponents([
  new TextInputComponent()
  .setCustomId('textinputop4')
  .setLabel('ضع طلبك اسفل')
  .setStyle('LONG')
  .setMinLength(10)
  .setMaxLength(400)
  .setPlaceholder('. من فضلك ضع رساله طلبك هنا')
  .setRequired(true)
]);
client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option4") {
showModal(modal1, {
client: client,
interaction: interaction
})
}
})


client.on('modalSubmit', async (modal) => {
if(modal.customId === 'modalop4'){
let msgID = await db.get(`buyer_${modal.user.id}.msgID`)
let owner = await db.get(`buyer_${modal.user.id}.user`)
if(owner !== modal.user.id) return;
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let firstResponse = modal.getTextInputValue('textinputop4')
client.channels.cache.get(modal.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
await modal.deferReply()
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('انقر لختيار نوع المنشن')
					.addOptions([
						{
							label: `@Everyone = 100K`,
							value: `everyoneorder`,
						},
          	{
							label: '@Here = 50K',
							value: 'hereorder',
						},
					]),
			);
await modal.channel.send({content: `**من فضلك قم بختيار نوع المنشن من الاسفل**`, components: [row]}).then(async msg => {
await db.set(`buyer_${modal.user.id}.msgID`, msg.id)
await db.set(`order_${modal.user.id}.msg`, firstResponse)
modal.deleteReply()
})
}
});
client.on("interactionCreate", async (i) => {
if(i.values == "everyoneorder") {
let msgID = await db.get(`buyer_${i.user.id}.msgID`)
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = price_orderev * discount_num
let owner = await db.get(`buyer_${i.user.id}.user`)
if(owner !== i.user.id) return;
let firstResponse = await db.get(`order_${i.user.id}.msg`)
if(!firstResponse) return;
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_orderev - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_orderev - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds: [embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_orderev - fake_price,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(`${firstResponse.slice(split)}`,``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
return;
}
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_orderev - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_orderev - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds: [embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_order,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(`${firstResponse.slice(split)}`,``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
}
})
client.on("interactionCreate", async (i) => {
if(i.values == "hereorder") {
let msgID = await db.get(`buyer_${i.user.id}.msgID`)
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = price_orderhe * discount_num
let owner = await db.get(`buyer_${i.user.id}.user`)
if(owner !== i.user.id) return;
let firstResponse = await db.get(`order_${i.user.id}.msg`)
if(!firstResponse) return;
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_orderhe - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_orderhe - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds: [embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_orderhe - fake_price,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(`${firstResponse.slice(split)}`,``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@here`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
return;
}
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_orderhe - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_orderhe - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await i.reply({embeds: [embed]})
setTimeout(async () => {
i.fetchReply().then(async reply => {
await db.delete(`buyer_${i.user.id}`)
i.channel.delete().catch(err => console.error(err))
return;
}).catch(console.error);
}, 240000)
client.channels.cache.get(i.channel.id).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
var check = await client.probot.collect(i, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: i.user.id,
price: price_orderhe,
fullPrice: false,
});
if(check.status) {
i.deleteReply()
await db.delete(`buyer_${i.user.id}`)
let split = firstResponse.search("https://") && firstResponse.search("http://") && firstResponse.search("discord.gg")
if(!split) {
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
return;
}
let msg = firstResponse.replace("@everyone", ``).replace("@here", ``).replace(`${firstResponse.slice(split)}`,``)
if(msg == `  ` || msg == ``) return i.user.send(`**لقد وضعت رساله مخالفه لقوانين السيرفر لهذا السبب لم انشر طلبك**`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send(`${msg}
**تواصل مع:** <@!${i.user.id}>
@everyone`)
client.guilds.cache.get(ur_server).channels.cache.get(channel_order).send({files: ["line.png"]})
i.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
i.channel.delete() 
}, 3000)
}
}
})

let warn1_role = process.env.warn1_role;
let warn2_role = process.env.warn2_role;
let price_warn = process.env.price_warn;

client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option5") {
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg1 => msg1.delete()).catch(err => console.error(err))
let roles = interaction.member.roles.cache.find(y => y.id == "977936842039111701") && interaction.member.roles.cache.find(y => y.id == "977936985001967636") && interaction.member.roles.cache.find(y => y.id == "977936991071141968") && interaction.member.roles.cache.find(y => y.id == "977936995005386792") && interaction.member.roles.cache.find(y => y.id == "977937276061487184") && interaction.member.roles.cache.find(y => y.id == "977937272517308466") && interaction.member.roles.cache.find(y => y.id == "1076535228119650435")
await db.delete(`buyer_${interaction.user.id}`)
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **انت لست بائـ3 لإزالة التحذيرات .**`)
if(!roles) return interaction.channel.send({embeds: [embed_error]})
let role1 = interaction.member.roles.cache.find(t => t.id == warn1_role)
let role2 = interaction.member.roles.cache.find(t => t.id == warn2_role)
let embed_dont_have = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **ليس لديك تحذيرات لإزالتها .**`)
if(!role1 && !role2) return interaction.channel.send({embeds: [embed_dont_have]})
if(role1 && role2) {
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * (price_warn * 2)
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${(price_warn * 2) - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${(price_warn * 2) - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: (price_warn * 2) - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role1.id)
interaction.member.roles.remove(role2.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 1")
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 2")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة جميع التحذيرات التي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_warn * 2} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_warn * 2}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_warn * 2,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role1.id)
interaction.member.roles.remove(role2.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 1")
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 2")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة جميع التحذيرات التي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
if(role1) {
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_warn
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_warn - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_warn - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_warn - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role1.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 1")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة التحذير الذي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_warn} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_warn}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_warn,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role1.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 1")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة التحذير الذي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
if(role2) {
let discount_mode = await db.get(`discount_${ur_server}.mode`)
let discount_num = await db.get(`discount_${ur_server}.discount`)
let fake_price = discount_num * price_warn
if(discount_mode == "on") {
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_warn - fake_price} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_warn - fake_price}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_warn - fake_price,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role2.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 2")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة التحذير الذي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_warn} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_warn}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
interaction.channel.send({embeds: [embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_warn,
fullPrice: false,
});
if(check.status) {
msg.delete()
interaction.member.roles.remove(role2.id)
await db.pull(`rank_${interaction.user.id}.roles`, "S.Warn 2")
let embed_done1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم ازالة التحذير الذي لديك .**`)
interaction.channel.send({embeds: [embed_done1]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
return;
}
}
})




client.on("interactionCreate", async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'discount') {
if(!owner.includes(interaction.user.id)) return;
let value = interaction.options.getNumber('value')
let time = interaction.options.getString('time')
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم عمل خصم على جميع الأشياء بنسبة __${value}%__ .**`)
interaction.reply({embeds:[embed_done]})
let discount = value / 100
console.log(discount)
db.set(`discount_${ur_server}`, {
mode: "on",
time: timestamp(moment((ms(time) + Date.now()))),
discount: discount
})
let channel_log = client.channels.cache.get("1078437170613862452");
if(!channel_log) return;
let embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Created Discount")
.setDescription(`\`🔔\` قيمة الخصم : __${value}%__
\`⏰\` مدة الخصم : __<t:${timestamp(moment((ms(time) + Date.now())))}:R>__
\`⌛\` ينتهي الخصم في : __<t:${timestamp(moment((ms(time) + Date.now())))}:f>__`)
channel_log.send({embeds: [embed]})
}
})






client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == prefix + "rank") {
let ranks = await db.get(`rank_${message.author.id}`)
if(ranks) {
let roles = await db.get(`rank_${message.author.id}.roles`)
let Mythic = await db.get(`roles_${ur_server}.Mythic`)
let Special = await db.get(`roles_${ur_server}.Special`)
let Great = await db.get(`roles_${ur_server}.Great`)
let Demon = await db.get(`roles_${ur_server}.Demon`)
let Developer = await db.get(`roles_${ur_server}.Developer`)
let Designer = await db.get(`roles_${ur_server}.Designer`)
let KingPlace = await db.get(`roles_${ur_server}.KingPlace`)
let Executive = await db.get(`roles_${ur_server}.Executive`)
let Warn1 = await db.get(`roles_${ur_server}.Warn1`)
let Warn2 = await db.get(`roles_${ur_server}.Warn2`)
if(roles.includes("Mythic")) {
message.member.roles.add(Mythic).catch(err => console.error(err))
}
if(roles.includes("Special")) {
message.member.roles.add(Special).catch(err => console.error(err))
}
if(roles.includes("Great")) {
message.member.roles.add(Great).catch(err => console.error(err))
}
if(roles.includes("Demon")) {
message.member.roles.add(Demon).catch(err => console.error(err))
}
if(roles.includes("Developer")) {
message.member.roles.add(Developer).catch(err => console.error(err))
}
if(roles.includes("Designer")) {
message.member.roles.add(Designer).catch(err => console.error(err))
}
if(roles.includes("KingPlace")) {
message.member.roles.add(KingPlace).catch(err => console.error(err))
}
if(roles.includes("Warn1")) {
message.member.roles.add(Warn1).catch(err => console.error(err))
}
if(roles.includes("Warn2")) {
message.member.roles.add(Warn2).catch(err => console.error(err))
}
if(roles.includes("Executive")) {
message.member.roles.add(Executive).catch(err => console.error(err))
}
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم منحك جميع رتبك السابقة .**`)
message.channel.send({embeds: [embed]})
} else {
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **ليس لديك رتب لأسترجاعها .**`)
return message.reply({embeds: [embed_error]})
}
}
})




client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == "r") {
let role1 = message.member.roles.cache.find(r => r.id == "1071828804269527162")
if(!role1) return;
let args = message.content.split(" ")
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن البائـ3 أو وضع المعرف الخاص به .**`)
if(!args[1]) return message.reply({embeds: [embed_error]})
let user = message.mentions.members.first() || message.mentions.users.first() || message.guild.members.cache.find(t => t.id == args[1])
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على البائـ3 .**`)
if(!user) return message.reply({embeds: [embed_error1]})
let embed_error2 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن الرتبة أو وضع المعرف الخاص بها .**`)
if(!args[2]) return message.reply({embeds: [embed_error2]})
let role = message.guild.roles.cache.find(w => w.name == args[2]) || message.mentions.roles.first() || message.guild.roles.cache.find(t => t.id == args[2])
let embed_error3 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على الرتبة .**`)
if(!role) return message.reply({embeds: [embed_error3]})
let embed_error4 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **من فضلك حدد رتبة من رتب البائـ3ـين فقط .**`)
if(!role.name.includes("Special") && !role.name.includes("Demon") && !role.name.includes("King Role") && !role.name.includes("Special") && !role.name.includes("Mythic") && !role.name.includes("Great") && !role.name.includes("Developer") && !role.name.includes("Designer")) return message.reply({embeds: [embed_error4]})
message.member.roles.remove(role.id)
await db.pull(`rank_${interaction.user.id}.roles`, role.name)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم إزالة الرتبة من البائـ3 .**`)
message.reply({embeds: [embed_done]})
}
})

client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == "w") {
let role1 = message.member.roles.cache.find(r => r.id == "1071828804269527162")
if(!role1) return;
let args = message.content.split(" ")
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن البائـ3 أو وضع المعرف الخاص به .**`)
if(!args[1]) return message.reply({embeds: [embed_error]})
let user = message.mentions.members.first() || message.mentions.users.first() || message.guild.members.cache.find(t => t.id == args[1])
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على البائـ3 .**`)
if(!user) return message.reply({embeds: [embed_error1]})
let embed_error2 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن الرتبة أو وضع المعرف الخاص بها .**`)
if(!args[2]) return message.reply({embeds: [embed_error2]})
let role = message.guild.roles.cache.find(w => w.name == args[2]) || message.mentions.roles.first() || message.guild.roles.cache.find(t => t.id == args[2])
let embed_error3 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على الرتبة .**`)
if(!role) return message.reply({embeds: [embed_error3]})
let embed_error4 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **من فضلك حدد رتبة تحذير من رتب التحذيرات فقط .**`)
if(!role.name.includes("S.Warn 1") && !role.name.includes("S.Warn 2")) return message.reply({embeds: [embed_error4]})
message.member.roles.add(role.id)
await db.push(`rank_${interaction.user.id}.roles`, role.name)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم إضافة التحذير إلى البائـ3 .**`)
message.reply({embeds: [embed_done]})
}
})




client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == prefix + "addall") {
let args = message.content.split(" ")
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن الرتبة أو وضع المعرف الخاص بها .**`)
if(!args[1]) return message.reply({embeds: [embed_error]})
let role = message.guild.roles.cache.find(y => y.id == args[1]) || message.mentions.roles.first() || message.guild.roles.cache.find(u => u.name == args[1])
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على الرتبة .**`)
if(!role) return message.reply({embeds: [embed_error1]})
role.members.map(async m => {
await db.push(`rank_${m.user.id}.roles`, role.name)
})
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم حفظ جميع رتب البائـ3ـين في الداتا .**`)
message.reply({embeds: [embed_done]})
}
})




client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == prefix + "add") {
let args = message.content.split(" ")
let embed_error = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء كتابة اسم الرتبة الذي تريد استبدالها .**`)
if(!args[1]) return message.reply({embeds: [embed_error]})
let embed_error1 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **من فضلك قم بكتابة اسم رتبة البائـ3ين التي تريد استبدالها .**`)
if(!args[1].includes("Special") && !args[1].includes("Demon") && !args[1].includes("King Role") && !args[1].includes("Special") && !args[1].includes("Mythic") && !args[1].includes("Great") && !args[1].includes("Developer") && !args[1].includes("Designer") && !args[1].includes("Warn")) return message.reply({embeds: [embed_error1]})
let embed_error2 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **برجاء منشن الرتبة أو وضع المعرف الخاص بها .**`)
if(!args[2]) return message.reply({embeds: [embed_error2]})
let role1 = message.guild.roles.cache.find(y => y.id == args[1]) || message.mentions.roles.first()
let embed_error3 = new Discord.MessageEmbed()
.setColor("#b10707")
.setDescription(`\`❎\` **لم اعثر على الرتبة .**`)
if(!role1) return message.reply({embeds: [embed_error3]})
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **تم استبدال الرتبة بنجاح .**`)
message.reply({embeds: [embed_done]})
if(args[1].includes("Special")) {
return await db.set(`roles_${ur_server}.Special`, role1.id);
}
if(args[1].includes("Mythic")) {
return await db.set(`roles_${ur_server}.Mythic`, role1.id);
}
if(args[1].includes("Demon")) {
return await db.set(`roles_${ur_server}.Demon`, role1.id);
}
if(args[1].includes("Great")) {
return await db.set(`roles_${ur_server}.Great`, role1.id);
}
if(args[1].includes("KingPlace")) {
return await db.set(`roles_${ur_server}.KingPlace`, role1.id);
}
if(args[1].includes("Designer")) {
return await db.set(`roles_${ur_server}.Designer`, role1.id);
}
if(args[1].includes("Developer")) {
return await db.set(`roles_${ur_server}.Developer`, role1.id);
}
if(args[1].includes("Warn 1")) {
return await db.set(`roles_${ur_server}.Warn1`, role1.id);
}
if(args[1].includes("Warn 2")) {
return await db.set(`roles_${ur_server}.Warn2`, role1.id);
}
}
})




client.on("messageCreate", async message => {
if(message.content.split(" ")[0] == "ph") {
if(!message.member.permissions.has("ADMINISTRATOR")) return;
message.delete()
let count = await db.get(`privaterooms_${ur_server}`)
let embed = new Discord.MessageEmbed()
.setColor("#047d50")
.setDescription(`عدد الرومات الخاصة المتوفره : \`${15 - count}\`

**اخر تحديث في** __<t:${timestamp(moment(Date.now()))}:f>__`)
message.channel.send({embeds:[embed]}).then(async msg => {
await db.set(`privcountmsg_${ur_server}`, {
count: 15 - count,
channelID: message.channel.id,
msgID: msg.id,
})
})
}
})




client.on("interactionCreate", async (interaction) => {
if(interaction.values == "option6") {
let status = await db.get(`buyer_${interaction.user.id}.status`)
if(status == "off") return;
let msgID = await db.get(`buyer_${interaction.user.id}.msgID`)
let owner = await db.get(`buyer_${interaction.user.id}.user`)
if(owner !== interaction.user.id) return;
client.channels.cache.get(interaction.channel.id).messages.fetch(msgID).then(msg => msg.delete()).catch(err => console.error(err))
let embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`**هوب شوب يقدم لكم رتب حصرية .! <:nc:1079080867550462012> **

<:0_:1078044791952113734> **KingPlace Role**
<:l_:1078045936971939860><:m_:1078044787376140328> **[ Price : 500K ]**
<:n_:1078044789066436678> **Perms'الخصائص**
**النشر بكل الرومات** <:reho:1077984131541110864> 
**امكانية المنشن في الورمات**<:reho:1077984131541110864> 
**نشر صور بكل الرومات** <:reho:1077984131541110864> 
**امكانية نشر و طلب في روم #Executive**<:reho:1077984131541110864> 
<:noway:1078029951644749824><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:hos55:1078029979855634452><:bro:1078030013070315603>
<:0_:1078044791952113734> **Executive Role**
<:l_:1078045936971939860><:m_:1078044787376140328> **[ Price : 1M ]**
<:n_:1078044789066436678> **Perms'الخصائص**
**امكانية نشر طلب في روم #Executive**<:reho:1077984131541110864> 
**يمكنك نشر في جمع الرومات**<:reho:1077984131541110864> 
**امكانية منشن افري وان كل يوم مره**<:reho:1077984131541110864>  
**نشرو صور في كل الرومات**<:reho:1077984131541110864>
**لون مميز مثل الادارة وفوق كل الرتب**<:reho:1077984131541110864>`)
.setImage("https://i.im.ge/2023/02/12/a3BzUc.20220422-194538.png")
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('. انقر واختر الرتبة المناسبة لك')
					.addOptions([
      			{
							label: `@KingPlace'S = 500K`,
							value: 'role8',
						},
						{
							label: `@Executive'S = 1M`,
							value: 'role7',
						},
					]),
			);
interaction.channel.send({embeds:[embed], components: [row]}).then(async msg => {
await db.set(`buyer_${interaction.user.id}.msgID`, msg.id)
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
})
}
})




client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role7`) {
let roleid7 = await db.get(`roles_${ur_server}.Executive`)
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role7} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role7}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role7,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "Executive")
let role6 = interaction.guild.roles.cache.get(roleid6)
if(!role6) return;
interaction.member.roles.add(role6.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __Executive Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})





client.on('interactionCreate', async (interaction) => {
if(interaction.values == `role8`) {
let roleid7 = await db.get(`roles_${ur_server}.KingPlace`)
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`قم بتحويل ${price_role7} إالى <@!${owner_t}>
\`\`\`#credit <@!${owner_t}> ${price_role7}\`\`\``)
.setFooter(`لديك 4 دقائق للتحويل`)
await interaction.channel.send({embeds:[embed]}).then(async msg => {
setTimeout(async () => {
let mess = interaction.channel.messages.fetch(msg.id)
if(mess) {
await db.delete(`buyer_${interaction.user.id}`)
interaction.channel.delete().catch(err => console.error(err))
} else {
return;
}
}, 240000)
var check = await client.probot.collect(interaction, {
probotId: `282859044593598464`,
owners: [owner_t],
time: 1000 * 60 * 5,
userId: interaction.user.id,
price: price_role7,
fullPrice: false,
});
if(check.status) {
msg.delete()
await db.delete(`buyer_${interaction.user.id}`)
await db.push(`rank_${message.author.id}.roles`, "KingPlace")
let role6 = interaction.guild.roles.cache.get(roleid6)
if(!role6) return;
interaction.member.roles.add(role6.id)
let embed_done = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`\`✅\` **Done buyed __KingPlace Role__**`)
interaction.channel.send({embeds:[embed_done]})
interaction.channel.send({content: `**تم عمالية الشراء سيتم قفل تكت بعد 3 ثواني .**`})
setTimeout(async () => {
interaction.channel.delete() 
}, 3000)
}
})
}
})


client.login(process.env.token)