const TelegramBot = require('node-telegram-bot-api');
// const QRCode = require('qrcode');

require('dotenv').config();
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

// async function generateQRCode(url) {
//   return new Promise((resolve, reject) => {
//     QRCode.toBuffer(url, function (err, buffer) {
//       if (err) reject(err);
//       resolve(buffer);
//     });
//   });
// }

// Handle /start 
bot.onText(/\/start/, async(msg) => {
  const chatId = msg.chat.id;
  let reffralId = msg.text.split(' ');
  let url = ''
  if(reffralId.length > 1) {
    url = `${process.env.URL}?search=${reffralId[1]}`
  } else {
    url = `${process.env.URL}`
  }
  // const isDesktop = msg.web_app || true;  // Replace this condition as per your needs

  // if (isDesktop) {
  //   // Generate a QR code linking to your bot's URL (for mobile scanning)
  //   const mobileBotURL = `https://t.me/JobMiningbot`;
  //   const qrCodeBuffer = await generateQRCode(mobileBotURL);

  //   // Send message and QR code image
  //   const messageText = "Please switch to your mobile and scan the QR code to play!";
  //   bot.sendMessage(chatId, messageText);
  //   bot.sendPhoto(chatId, qrCodeBuffer);
  // } else {
    bot.sendMessage(chatId, `Hello, ${msg.from.first_name}!!\n\nWelcome to LinkingJobs!!.\n\nLinkingJobs is building the Web3 Future of Work'—a world of shared opportunities, collective ownership, and earning potential for everyone.\n\nA unique profit-sharing project where you can earn not only tokens but also real cash.\n\nJoin the community and be part of the largest airdrop in history!`, {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Open App', web_app: { url: url } },
          { text: 'Join Community', url: 'https://t.me/hrrkoinofficial' }
        ]],
        resize_keyboard: true, // Optional: makes the keyboard smaller
        one_time_keyboard: true // Optional: keyboard hides after pressing a button
      }
    });
  // }
});

// incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Check if t
  if (msg.text === 'Join Community') {
    bot.sendMessage(chatId, `You pressed Button 1!`);
  } else {
    if (msg.web_app_data) {
      // Process data sent from the Web App
      const receivedData = JSON.parse(msg.web_app_data.data);
      bot.sendMessage(chatId, `Received data from Web App: ${JSON.stringify(receivedData)}`);
    }
  }
});

console.log('Bot is running...');