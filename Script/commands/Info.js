module.exports.config = {
 name: "info",
 version: "2.0.0",
 hasPermssion: 0,
 credits: "Siyam Hasan Chat Bot",
 description: "Bot information command",
 commandCategory: "For users",
 hide: true,
 usages: "",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, Threads }) {
 const { threadID, messageID } = event;
 const moment = require("moment-timezone");
 const axios = require("axios");

 const { configPath } = global.client;
 delete require.cache[require.resolve(configPath)];
 const config = require(configPath);

 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(threadID))).data || {};
 const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

 const uptime = process.uptime();
 const hours = Math.floor(uptime / 3600);
 const minutes = Math.floor((uptime % 3600) / 60);
 const seconds = Math.floor(uptime % 60);

 const totalUsers = global.data.allUserID.length;
 const totalThreads = global.data.allThreadID.length;

 const now = moment().tz("Asia/Dhaka");
 const time = now.format("h:mm:ss A");
 const date = now.format("DD/MM/YYYY");

 const groupName = event.threadName || "Unknown Group";

 // 🎥 YOUR VIDEO
 const videoLink = "https://files.catbox.moe/g5vr8h.mp4";

 const msg = `
╔═━━━✦ 👑 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 👑 ✦━━━═╗

👑 ╭─❖ OWNER ❖─╮
   ╰➤ 『UDAY HOSSEIN SIYAM』

🤖 ╭─❖ BOT NAME ❖─╮
   ╰➤ 『Siyam Chat Bot』

🎂 ╭─❖ AGE ❖─╮
   ╰➤ 『16』

🚻 ╭─❖ GENDER ❖─╮
   ╰➤ 『Male』

☪ ╭─❖ RELIGION ❖─╮
   ╰➤ 『Islam』

🌐 ╭─❖ FACEBOOK ❖─╮
   ╰➤ 『https://www.facebook.com/photo.php?fbid=122172272774613710&set=a.122097678158613710&type=3』

💬 ╭─❖ MESSENGER ❖─╮
   ╰➤ 『m.me/61568411310748』

📞 ╭─❖ WHATSAPP ❖─╮
   ╰➤ 『wa.me/+8801789138157』

👑 ╭─❖ GROUP ❖─╮
   ╰➤ 『${groupName}』

⚙️ ╭─❖ PREFIX ❖─╮
   ╰➤ 『${prefix}』

📦 ╭─❖ COMMANDS ❖─╮
   ╰➤ 『${commands.size}』

⏳ ╭─❖ UPTIME ❖─╮
   ╰➤ 『${hours}h ${minutes}m ${seconds}s』

👥 ╭─❖ USERS ❖─╮
   ╰➤ 『${totalUsers}』

🌐 ╭─❖ GROUPS ❖─╮
   ╰➤ 『${totalThreads}』

🕒 ╭─❖ TIME ❖─╮
   ╰➤ 『${time}』

📅 ╭─❖ DATE ❖─╮
   ╰➤ 『${date}』

🏠 ╭─❖ ADDRESS ❖─╮
   ╰➤ 『KISHOREGANJ, BANGLADESH』

🏫 ╭─❖ SCHOOL ❖─╮
   ╰➤ 『M A MANNAN MANIK HIGH SCHOOL』

💔 ╭─❖ RELATION ❖─╮
   ╰➤ 『SINGLE』

🔥 ╭─❖ ATTITUDE ❖─╮
   ╰➤ 『আমি ভদ্র, কিন্তু কেউ আমাকে হালকাভাবে নিতে পারবে না ✌️』
   ╰➤ 『আমি যেটা চাই তা অর্জন করি, কারো চাপে চলি না 💥』

╚═══━━━✦🔥
`;

 try {
   const res = await axios.get(videoLink, { responseType: "stream" });

   return api.sendMessage({
     body: msg,
     attachment: res.data
   }, threadID, messageID);

 } catch (e) {
   return api.sendMessage(msg, threadID, messageID);
 }
};
