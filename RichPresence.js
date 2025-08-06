const { Client, RichPresence, CustomStatus, SpotifyRPC } = require('discord.js-selfbot-v13');
const client = new Client();

const statuses = [
  "𝕽𝖊𝖒𝖊𝖒𝖇𝖊𝖗 𝖒𝖊, 𝖜𝖍𝖊𝖓 𝖞𝖔𝖚 𝖑𝖔𝖔𝗄 𝖆𝖙 𝖙𝖍𝖊 𝖒𝖔𝖔𝖓",
  "﷽",
  "𝓨𝗼𝘂'𝗿𝗲 𝗽𝗲𝗿𝗳𝗲𝗰𝘁 !",
  "𝗖𝗘𝗢 𝗢𝗙 𝗢𝗛𝗜𝗢",
  "𝕯𝖊𝖆𝖙𝖍",
  "愛してます",
  "𝐒𝐭✪𝐫𝐛𝐨𝐲",
  "𝕴 𝕾𝖊𝖊 𝕯𝖊𝖆𝖉 𝕻𝖊𝖔𝖕𝖑𝖊",
];

let richPresenceActivity;
let spotifyActivity;

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  // Setup Rich Presence
  const getExtendURL = await RichPresence.getExternal(
    client,
    '367827983903490050',
    'https://i.imgur.com/0SxzVty.jpeg',
  );

  richPresenceActivity = new RichPresence(client)
    .setApplicationId('367827983903490050')
    .setType('PLAYING')
    .setURL('https://www.youtube.com/watch?v=5icFcPkVzMg')
    .setState('𝙏𝙤𝙧𝙢𝙚𝙣𝙩𝙞𝙣𝙜 𝙎𝙡𝙖𝙫𝙚𝙨')
    .setName('𝕽𝖊𝖆𝖕𝖊𝖗 𝖔𝖋 𝕾𝖔𝖚𝖑𝖘')
    .setDetails('I Can make money from the comfort of my sofa')
    .setParty({ max: 666, current: 69 })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(getExtendURL[0].external_asset_path)
    .setAssetsLargeText('𝕊ℍ𝕀ℕ𝔻𝔸')
    .setAssetsSmallImage('373370493127884800')
    .setAssetsSmallText('𝘼𝙡𝙡𝙎𝙚𝙚𝙞𝙣𝙜𝙀𝙮𝙚𓂀')
    .setPlatform('desktop')
    .addButton('TryHackMe', 'https://tryhackme.com/p/Th3j4far1');

  // Setup Spotify presence
  spotifyActivity = new SpotifyRPC(client)
    .setAssetsLargeImage('spotify:ab67616d00001e02768629f8bc5b39b68797d1bb')
    .setAssetsSmallImage('spotify:ab6761610000f178049d8aeae802c96c8208f3b7')
    .setAssetsLargeText('Hurry Up Tomorrow')
    .setState('Oppai Hentai')
    .setDetails('Tbon Mok Bl Caramel')
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + 1_000 * 224)
    .setSongId('3AWDeHLc88XogCaCnZQLVI')
    .setAlbumId('6AAmvxoPoDbJAwbatKwMb9')
    .setArtistIds('1Xyo4u8uXC1ZmMpatF05PJ');

  // Initial presence set with both activities (rich + spotify + first custom)
  const initialCustomStatus = new CustomStatus(client)
    .setEmoji(':skull:')
    .setState(statuses[Math.floor(Math.random() * statuses.length)]);

  client.user.setPresence({
    activities: [richPresenceActivity, spotifyActivity, initialCustomStatus]
  });

  // Start the custom status update loop
  const updateCustomStatus = () => {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const customStatus = new CustomStatus(client)
      .setEmoji(':skull:')
      .setState(randomStatus);

    // Always update presence with all activities combined
    client.user.setPresence({
      activities: [richPresenceActivity, spotifyActivity, customStatus]
    });

    setTimeout(updateCustomStatus, Math.floor(Math.random() * 19000) + 5000);
  };

  updateCustomStatus();
});

client.login(process.env.DISCORD_TOKEN);
