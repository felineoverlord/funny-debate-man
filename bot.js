// require('dotenv').config();
const { GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
    // console.log(msg);

    if (!(msg.author.bot)) {

        if (msg.content.toLowerCase().includes("belijah")) {
            msg.reply("Yes <:Panlijah:1005333329660362762>")
        }
        else if (
            (msg.content.toLowerCase().includes("elijah")) ||
            (msg.content.includes("<@1024409224400351274>")) ||
            (msg.content.includes("<@&1024472122896167018>")) ||
            (msg.content.includes("<@&1025084954352291950>"))

        ) {
            msg.reply("That's me!")
        }
        else if (msg.content.includes("Ben") || msg.content.includes("BEN")) {
            msg.reply("<:Panlijah:1005333329660362762>")
        }
        else if (msg.content.toLowerCase().includes("debating time")) {
            msg.reply("That's my line!")
        }
        else if (msg.content.toLowerCase().includes("debat")) {
            msg.reply("It's debating time")
        }
    }
})

client.on('guildMemberAdd', member => {
    client.channels.cache.get(member.guild.systemChannelId).send(`Ayo <@${member.user.id}>, welcome to the Fiction Fortress! Don't forget to read the rules in <#968645464457101362> and check out <#975894238254465104> to get some roles!`)
})

client.login(process.env.DISCORD_TOKEN)