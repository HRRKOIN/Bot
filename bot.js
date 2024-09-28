const TelegramBot = require('node-telegram-bot-api');

// Create a bot 
const bot = new TelegramBot(token, { polling: true });

// Handle /start 
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let reffralId = msg.text.split(' ');
  let url = ''
  if(reffralId.length > 1) {
    url = `https://bot.linkingjobs.in/?search=${reffralId[1]}`
  } else {
    url = `https://bot.linkingjobs.in/`
  }
  bot.sendMessage(chatId, 'Welcome! Click the button below to open the web app.', {
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