const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

// Handle /start 
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let reffralId = msg.text.split(' ');
  let url = ''
  if(reffralId.length > 1) {
    url = `${process.env.URL}?search=${reffralId[1]}`
  } else {
    url = `${process.env.URL}`
  }
  if (msg.web_app) {
    bot.sendMessage(chatId, "Sorry, this bot is restricted to mobile usage.");
  } else {
    bot.sendMessage(chatId, `Hello, ${msg.from.first_name}!!\n\nWelcome to LinkingJobs!!.\n\nLinkingJobs is building the Web3 Future of Work'—a world of shared opportunities, collective ownership, and earning potential for everyone.\n\nA unique profit-sharing project where you can earn not only tokens but also real cash.\n\nJoin the community and be part of the largest airdrop in history!`, {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Open App', web_app: { url: url } }
        ]]
      }
    });
  }
});

// incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Check if t
  if (msg.web_app_data) {
    // Process data sent from the Web App
    const receivedData = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(chatId, `Received data from Web App: ${JSON.stringify(receivedData)}`);
  }
});

console.log('Bot is running...');