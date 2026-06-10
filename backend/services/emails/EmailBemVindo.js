import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


// equivalente ao __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function criarMensagemBemVindo(nome) {

    // monta caminho absoluto do HTML
    const caminhoHtml = path.join(
        __dirname,
        '../html/bemVindo.html'
    );

    let html = await fs.readFile(caminhoHtml, 'utf-8');
    
    return {
        subject: 'Bem-vindo!',
        html
    };
}

