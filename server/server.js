import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// helpers de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../client")));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userMessage,
        });

        res.json({ reply: result.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Error al generar respuesta" });
    }
});

app.listen(port, () => {
    console.log(`Servidor Gemini corriendo en http://localhost:${port}`);
});
