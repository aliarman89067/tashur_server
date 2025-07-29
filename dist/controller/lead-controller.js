"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLead = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});
const htmlContent = ({ name, email, contact, message, }) => `
  <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">New Lead Notification</h2>
    </div>
    <div style="padding: 20px;">
      <p style="font-size: 16px;">You have received a new lead with the following details:</p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9f9f9; width: 30%;">Name:</td>
          <td style="padding: 10px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9f9f9;">Email:</td>
          <td style="padding: 10px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9f9f9;">Contact:</td>
          <td style="padding: 10px;">${contact}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9f9f9;">Message:</td>
          <td style="padding: 10px;">${message}</td>
        </tr>
      </table>

    </div>
  </div>
`;
const generateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contact, message } = req.body;
        if (!name || !email || !contact || !message) {
            res.status(404).json({ message: "Request body is not correct" });
            return;
        }
        yield transport.sendMail({
            from: '"Tashur Wholesale" <tim@tashurwholesale.com>',
            to: "tim@tashurwholesale.com",
            subject: `New Contact: ${name}`,
            html: htmlContent({ name, email, contact, message }),
        });
        res.status(201).json({ message: "Email send successfully" });
    }
    catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).json({ message: `Something went wrong` });
    }
});
exports.generateLead = generateLead;
