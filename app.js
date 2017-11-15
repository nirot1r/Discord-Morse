/* 初期化処理 */
    const FS = require("fs");
    const Discord = require("discord.js");
    const Token = require("./config/Token.js")
    const Client = new Discord.Client();

/* モールス信号リスト代入 */
    const morseEnglish = JSON.parse(FS.readFileSync("./assets/english.json"), "utf8");
    const morseJapanese = JSON.parse(FS.readFileSync("./assets/japanese.json"), "utf8");

    console.log(morseEnglish);
    console.log(morseJapanese);
    
/* ログイン処理 */
    Client.login(Token.discord);

/* メッセージ受信処理 */
    Client.on("ready", () => {
        console.log(`[Discord.js][ログイン通知] ${Client.user.tag} としてログインしました。`);
    });
  
    Client.on("message", message => {
        if (message.content === "関口!" || message.content === "キャプテン!") {
            message.reply("翼!");
        } else if(message.content === "益若!") {
            message.reply("つばさ!");
        }
    });