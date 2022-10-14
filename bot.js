// this line is required for when I run the bot locally for debugging
require("dotenv").config();

const { GatewayIntentBits} = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const emotes = {
    panlijah: "<:Panlijah:1005333329660362762>"
}

const roles = {
    self: "<@1024409224400351274>",
    elijah: "<@&1024472122896167018>",
    bensBoyfriend: "<@&1025084954352291950>"
}

const channels = {
    rules: "<#968645464457101362>",
    roles: "<#975894238254465104>"
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

// responds to users' (not bots') messages with various behaviors
client.on("messageCreate", msg => {
    var channelPerms = client.channels.cache.get(msg.channelId).permissionsFor(client.user).toArray()
    
    // prevents the bot from trying to post in channels where it doesn't have permission
    var canSendMessages = channelPerms.includes("SendMessages");

    if (!(msg.author.bot) && canSendMessages) {

        if (msg.content.toLowerCase().includes("belijah")) {
            msg.reply(`Yes ${emotes.panlijah}`)
        }
        
        else if (msg.content.includes("Ben") || msg.content.includes("BEN")) {
            msg.reply(emotes.panlijah)
        }
        
        // responds when he is mentioned
        else if (
            (msg.content.toLowerCase().includes("elijah")) ||
            (msg.content.includes(roles.self)) ||
            (msg.content.includes(roles.elijah)) ||
            (msg.content.includes(roles.bensBoyfriend))
        ) {
            msg.reply("That's me!")
        }

        // responds to mentions of debate with his catchphrase
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
    client.channels.cache.get(member.guild.systemChannelId).send(`Ayo <@${member.user.id}>, welcome to the Fiction Fortress! Don't forget to read the rules in ${channels.rules} and check out ${channels.roles} to get some roles!`)
})

client.login(process.env.DISCORD_TOKEN)