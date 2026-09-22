import { ImapFlow } from 'imapflow';
import { configEnv } from '../env.js';
const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
        user: configEnv.USER_EMAIL,
        pass: configEnv.USER_PASSWORD
    }
});
async function main() {
    await client.connect();
    let lock = await client.getMailboxLock('INBOX');
    console.log("Connected to mailbox:", client.mailbox);
    try {
        if (!client.mailbox || client.mailbox.exists === 0) {
            console.log("No messages in mailbox");
            return;
        }
        // Fetch the most recent messages
        let message = await client.fetchOne('*', {
            envelope: true,
            bodyStructure: true
        });
        if (!message) {
            console.log("No messages found");
            return;
        }
        const msnSubject = message.envelope?.subject;
        console.log("Most recent message subject:", msnSubject);
        console.log("Here is the message header:", message);
    }
    finally {
        lock.release();
    }
    await client.logout();
}
main().catch(console.error);
//# sourceMappingURL=imapClient.js.map