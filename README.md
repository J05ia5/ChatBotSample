# ChatBot ThreadMap
## Creacion de un chat bot con Node.js. 

Primeramente, se tiene que instalar Node.js, puedes hacerlo desde su pagina oficial en:
https://nodejs.org/en/download

y ejecutar el siguiente comando en la terminal:

    node .\server.js
ejemplo (estando dentro de la carpeta server):
<pre>
PS C:\Users\josia\Proyects\ChatBotSample\server> node .\server.js
[dotenv@17.2.3] injecting env (1) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
Servidor Gemini corriendo en http://localhost:3000
</pre>

y entrar a la direccion del servidor.

---
> En este ejemplo se uso variables de entorno por seguridad, puedes ver como añadir variables de entorno en la documentación de google:
https://ai.google.dev/gemini-api/docs/api-key?hl=es-419#set-api-env-var

---
<u> ***Para prubeas rapidas*** </u>, puedes modificar el archivo [.env](server/.env):

    OPENAI_API_KEY = "aqui deveria ir tu llave API, sin comillas"

> En este proyecto se uso la API key de Google Gemini
puedes optener la tuya solo con una cuenta de google en el siguiente enlcae:
https://aistudio.google.com/api-keys

luego:

en "segmento variable", linea 26 del archivo [server.js](server/server.js):
se debe modificar con:

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

---
## Errores que me pasaron
al instalar Node.js, *npm* (gestor de paquetes del ecosistema Node.js) viene incluido por defecto, y tube el siguiente problema:
<pre>
PS C:\Users\josia\Proyects\ChatBotSample\server> node --version
v24.12.0
PS C:\Users\josia\Proyects\ChatBotSample\server> npm --version
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information,
see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm --version
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
</pre>

y el problema radica en:

> running scripts is disabled on this system

En Windows, PowerShell bloquea por defecto la ejecución de scripts (.ps1) por motivos de seguridad.
El comando npm en Windows se ejecuta a través del archivo:
        
    C:\Program Files\nodejs\npm.ps1

PowerShell usa una política llamada Execution Policy
puedes ver el estado con el comando:

    Get-ExecutionPolicy

<pre>
PS C:\Users\josia\Proyects\ChatBotSample\server> Get-ExecutionPolicy
Restricted
</pre>

> puedes saber mas del significado de los estados, y todo sobre *Execution Policy* en:
> https://learn.microsoft.com/es-es/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5

y la solucion directa es aplicar el siguiente comando para cambiar la politica a una que si permite ejecutar scripts locales (como npm).

    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
y eso soluciona el problema de **nppm**

---
Otro error que tube fue el siguiente:
<pre>
PS C:\Users\josia\Proyects\ChatBotSample\server> node .\server.js
[dotenv@17.2.3] injecting env (1) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
Servidor Gemini corriendo en http://localhost:3000
Error: Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.
</pre>

y este fue por que habia hecho todos los cambios de la variable de entorno mientra mi secion de powershell estaba activa, en la misma documentacion indica lo siguiente luego de añadir una variable de entorno:
> Open a new terminal session (cmd or Powershell) to get the new variable.
> (Abre una nueva sesión de terminal (cmd o Powershell) para obtener la nueva variable.)

entonces, como no encontro mi variable de entorno google está intentando usar credenciales de Google Cloud (ADC) (lo que no tenemos para este ejemplo)

y la solucion fue solo salirse y volver a entrar, y todo funciono perfectamente

## Como se ve
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e956ecc9-0176-48dd-9609-aed7031da175" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/13fcade0-c857-4c72-9a36-d10a924467de" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5fb1b9d2-4e0d-41a8-a256-79a1f3ccb66b" />


