import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./gohotel_db.db');

function criarTabelas() {
    try {
        db.serialize(() => {
            db.run(`                
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                genero TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL,
                termos INTEGER NOT NULL CHECK (termos IN (0, 1)),
                receber_emails INTEGER NOT NULL DEFAULT 0 CHECK (receber_emails IN (0, 1)),
                foto TEXT
            );
            `)

            db.run(`
                CREATE TABLE IF NOT EXISTS hoteis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    cnpj INTEGER UNIQUE NOT NULL,
                    fantasia TEXT NOT NULL,
                    localizacao TEXT NOT NULL,
                    descricao TEXT NOT NULL,
                    qtd_quartos INTEGER NOT NULL,
                    imagem TEXT NOT NULL
                );
                `)

            db.run(`
                CREATE TABLE IF NOT EXISTS reservas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    data_entrada TEXT,
                    data_saida TEXT,
                    id_usuario INTEGER,
                    id_hotel INTEGER,

                    FOREIGN KEY(id_usuario) REFERENCES usuarios (id),
                    FOREIGN KEY (id_hotel) REFERENCES hoteis (id)
                );
                `)

                db.run(`
                    CREATE TABLE IF NOT EXISTS pagamentos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        valor REAL NOT NULL,
                        status TEXT NOT NULL,
                        id_usuario INTEGER NOT NULL,
                        id_hotel INTEGER NOT NULL,

                        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
                        FOREIGN KEY (id_hotel) REFERENCES hoteis(id)
                    );
                    `)
        })
    } catch (e) {
        console.error(e.message);
    }
}

criarTabelas();