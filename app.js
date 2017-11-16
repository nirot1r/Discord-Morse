/* 初期化処理 */
    const FS = require("fs");
    const Discord = require("discord.js");
    const Token = require("./config/Token.js")
    const Client = new Discord.Client();

/* モールス信号リスト代入 */
    const morseEnglish = JSON.parse(FS.readFileSync("./assets/english.json"), "utf8");
    const morseJapanese = JSON.parse(FS.readFileSync("./assets/japanese.json"), "utf8");
    const morseNumber = JSON.parse(FS.readFileSync("./assets/number.json"), "utf8");


/* 関数定義 */
    const h2k = function(content) {
        return content.replace(/[\u3041-\u3096]/g, function(match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }

/* 変数定義 */
    const reactionCommand = /^M\s(.+)$/i;

/* ログイン処理 */
    Client.login(Token.discord);

/* メッセージ受信処理 */
    Client.on("ready", () => {
        console.log(`[Discord.js][ログイン通知] ${Client.user.tag} としてログインしました。`);
    });
  
    Client.on("message", message => {
        if(message.member.id != 380359638996090880) {
            if(reactionCommand.test(message.content)) {
                const rawMessage = message.content.match(reactionCommand)[1]; // 処理を行うメッセージ
                let processMessage; // 処理の一時使用変数
                let returnMessage; // 返すメッセージ

                /* 英語の置き換え処理 */ // リファクタリング必須
                    processMessage = rawMessage.toUpperCase();
                    returnMessage = "";
                    Object.keys(morseEnglish).forEach(function(key) {
                        if(returnMessage === "") {
                            returnMessage = processMessage.split(key).join(morseEnglish[key] + "　");
                        } else {
                            returnMessage = returnMessage.split(key).join(morseEnglish[key] + "　");
                        }
                    });
                
                /* 日本語の置き換え処理 */ // リファクタリング必須
                    processMessage = h2k(returnMessage);
                    returnMessage = "";
                    Object.keys(morseJapanese).forEach(function(key) {
                        if(returnMessage === "") {
                            returnMessage = processMessage.split(key).join(morseJapanese[key] + "　");
                        } else {
                            returnMessage = returnMessage.split(key).join(morseJapanese[key] + "　");
                        }
                    });

                /* 数字の置き換え処理 */ // リファクタリング必須
                    processMessage = returnMessage;
                    returnMessage = "";
                    Object.keys(morseNumber).forEach(function(key) {
                        if(returnMessage === "") {
                            returnMessage = processMessage.split(key).join(morseNumber[key] + "　");
                        } else {
                            returnMessage = returnMessage.split(key).join(morseNumber[key] + "　");
                        }
                    });

                message.channel.send("`" + returnMessage + "`");
            }
        }
    });