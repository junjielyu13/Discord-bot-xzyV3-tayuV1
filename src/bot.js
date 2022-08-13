var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// 日志设定
logger.remove(logger.transports.Console);

logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// 初始化 Discord Bot
var bot = new Discord.Client({
    // token: auth.token,
    autorun: true
});

//当BOT登录成功后运行的内容
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

//当BOT接收到信息后的处理逻辑
bot.on('message', function(user, userID, channelID, message, evt) {
    // BOT将检测接收到的信息是否以 '!' 开头
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                //发送 !pong
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
                // 照葫芦画瓢，添加其他的case..
        }
    }
});