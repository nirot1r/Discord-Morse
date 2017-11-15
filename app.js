/* 初期化処理 */
const Discord = require("discord.js");
const Token = require("./config/Token.js")
const Client = new Discord.Client();

/* ログイン処理 */
    Client.login(Token.discord);

/* メッセージ受信処理 */
    Client.on("ready", () => {
        console.log(`[Discord.js][ログイン通知] ${Client.user.tag} としてログインしました。`);
    });
  
    Client.on("message", message => {
        if (message.content === "関口!") {
            message.reply("翼!");
        }
    });