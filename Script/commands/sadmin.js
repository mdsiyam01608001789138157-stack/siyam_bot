const { writeFileSync, existsSync } = require("fs-extra");
const { resolve } = require("path");

module.exports.config = {
  name: "sadmin",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "Siyam Hasan Chat Bot",
  description: "👑 Siyam Hasan Chat Bot Admin System",
  commandCategory: "Admin",
  usages: "[list | add | remove | only | boxonly]",
  cooldowns: 0,
  usePrefix: true,
  dependencies: { "fs-extra": "" }
};

module.exports.languages = {
  en: {
    listAdmin: `
╔═══════════════👑 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 👑═══════════════╗

👑 🔰 ╔═══════【 🔐 𝐀𝐃𝐌𝐈𝐍 𝐋𝐈𝐒𝐓 🔐 】═══════╗ 🔰
┃ ✨ %1
╚══════════════════════════════════════╝

🔥🌟 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 🌟🔥

🧾 ╔═══════════════【 👤 𝐍𝐀𝐌𝐄 】═══════════════╗
┃ 💎 𝐔𝐝𝐨𝐲 𝐇𝐚𝐬𝐚𝐧 𝐒𝐢𝐲𝐚𝐦
╚════════════════════════════════════════════╝

🏠 ╔═══════════════【 🌍 𝐇𝐎𝐌𝐄 】═══════════════╗
┃ 📍 Kishoreganj, Bangladesh
╚════════════════════════════════════════════╝

🎓 ╔═══════════════【 📚 𝐒𝐓𝐔𝐃𝐘 】══════════════╗
┃ 🏫 Class 10
╚════════════════════════════════════════════╝

🎂 ╔═══════════════【 🎉 𝐀𝐆𝐄 】═══════════════╗
┃ 🎈 17+
╚════════════════════════════════════════════╝

💼 ╔═══════════════【 ⚙️ 𝐒𝐓𝐀𝐓𝐔𝐒 】══════════════╗
┃ 🧑‍💻 Student
╚════════════════════════════════════════════╝

❤️ ╔═══════════════【 💖 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍 】════════════╗
┃ 💔 Single
╚════════════════════════════════════════════╝

╚═══════════════⚡ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐈𝐘𝐀𝐌 ⚡═══════════════╝
`,

    noPermission: "❎ | You don't have permission!",

    addedAdmin: `
╔═━━━✦ ✅ ADMIN ADDED ✦━━━═╗
%2
╚━━━━━━━━━━━━━━━━━━━━━━━╝
`,

    removedAdmin: `
╔═━━━✦ ❌ ADMIN REMOVED ✦━━━═╗
%2
╚━━━━━━━━━━━━━━━━━━━━━━━╝
`,

    adminOnlyOn: "🔐 | Admin Only Mode ENABLED",
    adminOnlyOff: "🔓 | Admin Only Mode DISABLED",

    boxOnlyOn: "📦 | Group Admin Only Mode ENABLED",
    boxOnlyOff: "📦 | Group Admin Only Mode DISABLED"
  }
};

module.exports.onLoad = () => {
  const path = resolve(__dirname, "cache", "data.json");
  if (!existsSync(path)) writeFileSync(path, JSON.stringify({ adminbox: {} }, null, 4));
};

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
  const { threadID, messageID, mentions } = event;
  const content = args.slice(1);
  const mentionIDs = Object.keys(mentions);
  const { configPath } = global.client;

  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  const ADMINBOT = global.config.ADMINBOT || config.ADMINBOT || [];

  const getUIDs = () => {
    if (event.type === "message_reply") return [event.messageReply.senderID];
    if (mentionIDs.length) return mentionIDs;
    if (!isNaN(content[0])) return [content[0]];
    return [];
  };

  switch (args[0]) {

    case "list": {
      const msg = [];
      for (const id of ADMINBOT) {
        const name = (await Users.getData(id)).name;
        msg.push(`┃ 👑 ${name}\n┃ 🔗 fb.com/${id}`);
      }
      return api.sendMessage(getText("listAdmin", msg.join("\n━━━━━━━━━━━━━━\n")), threadID, messageID);
    }

    case "add": {
      if (permssion != 3) return api.sendMessage(getText("noPermission"), threadID, messageID);
      const ids = getUIDs();
      const added = [];

      for (const id of ids) {
        if (!ADMINBOT.includes(id)) {
          ADMINBOT.push(id);
          config.ADMINBOT.push(id);
          const name = (await Users.getData(id)).name;
          added.push(`┃ 👑 ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("addedAdmin", added.length, added.join("\n")), threadID, messageID);
    }

    case "remove": {
      if (permssion != 3) return api.sendMessage(getText("noPermission"), threadID, messageID);
      const ids = getUIDs();
      const removed = [];

      for (const id of ids) {
        const index = ADMINBOT.indexOf(id);
        if (index !== -1) {
          ADMINBOT.splice(index, 1);
          config.ADMINBOT.splice(index, 1);
          const name = (await Users.getData(id)).name;
          removed.push(`┃ ❌ ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("removedAdmin", removed.length, removed.join("\n")), threadID, messageID);
    }

    case "only": {
      if (permssion != 3) return api.sendMessage(getText("noPermission"), threadID, messageID);
      config.adminOnly = !config.adminOnly;
      writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(config.adminOnly ? getText("adminOnlyOn") : getText("adminOnlyOff"), threadID, messageID);
    }

    case "boxonly": {
      if (permssion != 3) return api.sendMessage(getText("noPermission"), threadID, messageID);
      const path = resolve(__dirname, "cache", "data.json");
      delete require.cache[require.resolve(path)];
      const database = require(path);

      database.adminbox[threadID] = !database.adminbox[threadID];
      writeFileSync(path, JSON.stringify(database, null, 4));

      return api.sendMessage(
        database.adminbox[threadID] ? getText("boxOnlyOn") : getText("boxOnlyOff"),
        threadID,
        messageID
      );
    }

    default:
      return;
  }
};
