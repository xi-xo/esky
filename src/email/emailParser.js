import { simpleParser } from 'mailparser';
export async function parseEmail(rawEmail) {
    try {
        const parsedEmail = await simpleParser(rawEmail);
        console.log("Parsed email subject:", parsedEmail.subject);
        return parsedEmail;
    }
    catch (error) {
        console.error("Error parsing email:", error);
    }
}
//# sourceMappingURL=emailParser.js.map