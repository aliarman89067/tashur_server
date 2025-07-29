"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const lead_controller_1 = require("./controller/lead-controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("Origin", process.env.CLIENT_ENDPOINT);
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ENDPOINT,
}));
app.get("/test", (req, res) => {
    res.send("Hello World");
});
app.post("/generate-lead", lead_controller_1.generateLead);
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
