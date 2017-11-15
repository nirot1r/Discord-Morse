/* 初期化処理 */
    const FS = require("fs");
    const Discord = require("discord.js");
    const Token = require("./config/Token.js")
    const Client = new Discord.Client();

/* モールス信号リスト代入 */
    const morseEnglish = JSON.parse(FS.readFileSync("./assets/english.json"), "utf8");
    const morseJapanese = JSON.parse(FS.readFileSync("./assets/japanese.json"), "utf8");

/* ログイン処理 */
    Client.login(Token.discord);

/* メッセージ受信処理 */
    Client.on("ready", () => {
        console.log(`[Discord.js][ログイン通知] ${Client.user.tag} としてログインしました。`);
    });
  
    Client.on("message", message => {
        if(message.member.id != 380359638996090880) {
            let returnMessage = ""; // 返すメッセージ
            Object.keys(morseEnglish).forEach(function(key) {
                if(returnMessage === "") {
                    returnMessage = message.content.split(key).join(morseEnglish[key] + "　");
                } else {
                    returnMessage = returnMessage.split(key).join(morseEnglish[key] + "　");
                }
            });
            message.channel.send("`" + returnMessage + "`");
        }
    });