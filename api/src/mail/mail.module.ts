import * as nodemailer from "nodemailer";
import {MailOptions} from "nodemailer/lib/json-transport";

export class Emailer {
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }

    public sendEmail(mailOptions: MailOptions) {
        return this.transporter.sendMail(mailOptions);
    }

    public notifyUserForSignup(email: string, username: string) {
        this.sendEmail(newUserEmailTemplate(email, username));
    }
}

export const emailer = new Emailer();

export const newUserEmailTemplate = (email: string, username: string) => {
    return {
        from: process.env.GMAIL_USER,
        to: email,
        subject: `${username}, Welcome to the our website`,
        text: "Welcome to the our website",
        html: `
      <h1>Welcome to our website!</h1>
      <p>We're glad you've decided to join us. We hope you find everything you're looking for here and enjoy using our site.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for signing up!</p>
    `,
    } as MailOptions;
};
