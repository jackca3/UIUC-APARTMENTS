const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || '587');
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

console.log("Testing SMTP connection with:", { host, port, user, passLength: pass ? pass.length : 0 });

const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // for 587, it should be false
    auth: { user, pass },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
