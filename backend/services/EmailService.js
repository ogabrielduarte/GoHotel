import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

require('dotenv').config({ path: resolve(__dirname, '../.env') });

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

export async function sendEmail(to, subject, html) {
    return await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to,
        subject,
        html
    });
}