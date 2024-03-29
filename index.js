
const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    // intents: Sort through the data your bot might receive to only filter out the data that is useful for the purpose of the bot
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "n.",
    owners: ["615627520024510532"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot,reload)
client.loadCommands = (bot, reload) => require("./handlers/events")(bot,reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello World!")
    }
})


const welcomeChannelID = "984909200847167600"
// client.on("guildMemberAdd", (member) => {
//     member.guild.channels.cache.get(welcomeChannelID).send(`<@${member.id}> Welcome to the server!`)
// })
client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)

    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)
