import * as nodemailer from "nodemailer";
import {MailOptions} from "nodemailer/lib/json-transport";
import {LocationLiaison} from "../core/location";

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

    public acceptLocationOccupation(email: string, from: string, to: string, locationName: string, state_place: string) {
        this.sendEmail(acceptLocationOccupationTemplate(email, from, to, locationName, state_place));
    }

    public PrestateConfirmation(email: string, date: string, price: number, address: string) {
        this.sendEmail(PrestateConfirmationTemplate(email, date, price, address));
    }
}

export const emailer = new Emailer();

export const acceptLocationOccupationTemplate = (email: string, from: string, to: string, locationName: string, state_place: string) => {
    return {
        from: process.env.GMAIL_USER,
        to: email,
        subject: `${locationName} PCS`,
        html: `
        <h1>PCS</h1>
        <p>Your location occupation request has been accepted.</p>
        <p>From: ${from}</p>
        <p>To: ${to}</p>
        <p>We'll meet again on ${state_place} for the inventory</p>
        <p>Thank you for using PCS</p>
        <h2>You can make payment on your reservation page for the first month, and send a CEPA direct debit request in your documents</h2>
    `,
    } as MailOptions;
};

export const PrestateConfirmationTemplate = (email: string, date: string, price: number, address: string) => {
    return {
        from: process.env.GMAIL_USER,
        to: email,
        subject: `Services PCS`,
        html: `
        <h1>PCS</h1>
        <p>Your service has been reserved.</p>
        <p>Date: ${date}</p>
        <p>Price: ${price}</p>
        <p>Location: ${address}</p>
        <p>Thank you for using PCS</p>
    `,
    } as MailOptions;
};
