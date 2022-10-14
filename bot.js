// this line is required for when I run the bot locally for debugging
// require('dotenv').config();

const { GatewayIntentBits} = require('discord.js');
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

// responds to users' (not bots') messages with various behaviors
client.on("messageCreate", msg => {
    var channelPerms = client.channels.cache.get(msg.channelId).permissionsFor(client.user).toArray()
    
    // prevents the bot from trying to post in channels where it isn't allowed
    var canSendMessages = channelPerms.includes("SendMessages");

    if (!(msg.author.bot) && canSendMessages) {

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

// sends a welcome message to new members that join the server
client.on('guildMemberAdd', member => {
    client.channels.cache.get(member.guild.systemChannelId).send(`Ayo <@${member.user.id}>, welcome to the Fiction Fortress! Don't forget to read the rules in <#968645464457101362> and check out <#975894238254465104> to get some roles!`)
})

client.login(process.env.DISCORD_TOKEN)