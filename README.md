# ChatBot
creacion de un chat bot con node js.

en este ejemplo se uso variables de entorno por seguridad, puedes ver como añadir variables de entorno en la documentación de google:
// https://ai.google.dev/gemini-api/docs/api-key?hl=es-419#set-api-env-var

para prubeas rapidas, puedes usar el documento ".env":
se tiene que revisar el archivo ".env" en la carpeta "server":

---
OPENAI_API_KEY = "aqui deveria ir tu llave, sin comillas"

// esto es un comentario:
en "segmento variable" del archivo "./server.js" 
se debe modificar con:

    "
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    "

