// 2. THE VALIDATION FACTORY FUNCTION
// This function takes RAW environment data from ANY source (Node or Cloudflare)
// and returns a verified, safely casted Configuration Object.
function createValidatedConfig(rawSourceInput) {
    const userEmail = rawSourceInput.USER_EMAIL;
    const userPassword = rawSourceInput.USER_PASSWORD;
    if (!userEmail) {
        throw new Error("Missing required environment variable: USER_EMAIL");
    }
    if (!userPassword) {
        throw new Error("Missing required environment variable: USER_PASSWORD");
    }
    return Object.freeze({
        USER_EMAIL: userEmail,
        USER_PASSWORD: userPassword
    });
}
export const configEnv = createValidatedConfig({
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD
});
//# sourceMappingURL=env.js.map