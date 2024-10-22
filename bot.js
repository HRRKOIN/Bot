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
  bot.sendMessage(chatId, "Hello Welcome to LinkingJobs. LinkingJobs is building the Web3 Future of Work'—a world of shared opportunities, collective ownership, and earning potential for everyone. A unique profit-sharing project where you can earn not only tokens but also real cash. Join the community and be part of the largest airdrop in history!", {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Open Web App', web_app: { url: url } }
      ]]
    }
  });
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