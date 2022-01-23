const { uploaderAPI } = require("../../utils/uploader");

module.exports = {
    name: "upload",
    alias: ["upld"],
    use: "*<hosting>*\nSend/Reply to a message media with caption\n\n"
        + "*Hosting*\n- telegraph\n- uguu\n- anonfiles",
    category: "misc",
    async exec(msg, sock, args) {
        const { from, quoted } = msg;
        try {
            let host = args[0];
            if (host === "" || !host) host = "telegraph";

            if (quoted) {
                const resUrl = await uploaderAPI((await quoted.download()), host);
                await sock.sendMessage(from, { text: `*Host:* ${resUrl.host}\n*URL:* ${resUrl.data.url}\n*Name:* ${resUrl.data.name}\n*Size:* ${resUrl.data.size}` }, { quoted: msg });
            } else {
                const resUrl = await uploaderAPI((await msg.download()), host);
                await sock.sendMessage(from, { text: `*Host:* ${resUrl.host}\n*URL:* ${resUrl.data.url}\n*Name:* ${resUrl.data.name}\n*Size:* ${resUrl.data.size}` }, { quoted: msg });
            }
        } catch(e) {
            await msg.reply(`Error: ${e.message}`);
        }
    }
}