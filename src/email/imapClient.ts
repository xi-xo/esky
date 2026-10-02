import { ImapFlow } from 'imapflow';
import { configEnv } from '../env.js';
import { parseEmail } from './emailParser.js';

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
        let uids = await client.search({ seen: false }, { uid: true });
        console.log("Unread message UIDs:", uids);

        if (!client.mailbox || client.mailbox.exists === 0) {
            console.log("No messages in mailbox");
            return;
        }

        // Fetch the most recent messages
        if (!uids || uids.length === 0) {
            console.log("No unread messages found");
            return;
        }
        for await (let message of client.fetch(uids, {
            source: true,
            envelope: true,
            uid: true
        })) {
            if (!message || !message.envelope) {
                console.log("No message or envelope found for UID:", message?.uid);
                continue;
            }
            // const parsedEmail = await parseEmail(message.toString());
            // console.log("Parsed email:", parsedEmail);
        }
        
    } finally {
        lock.release();
    }
    await client.logout();
}

main().catch(console.error)
