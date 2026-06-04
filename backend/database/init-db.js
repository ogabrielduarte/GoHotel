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
                receber_emails INTEGER NOT NULL DEFAULT 0 CHECK (receber_emails IN (0, 1))
            );
            `)

            db.run(`
                CREATE TABLE IF NOT EXISTS telefones_usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,    
                    id_usuario INTEGER NOT NULL,
                    telefone TEXT not null,

                    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
                );
                `)

            db.run(`
                CREATE TABLE IF NOT EXISTS hoteis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    cnpj INTEGER UNIQUE NOT NULL,
                    fantasia TEXT NOT NULL,
                    localizacao TEXT,
                    QTD_QUARTOS INTEGER NOT NULL
                );
                `)

            db.run(`
                CREATE TABLE IF NOT EXISTS reserva (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    data_entrada TEXT,
                    data_saida TEXT,
                    id_usuario INTEGER,
                    id_hotel INTEGER,

                    FOREIGN KEY(id_usuario) REFERENCES usuarios (id),
                    FOREIGN KEY (id_hotel) REFERENCES hoteis (id)
                );
                `)
        })
    } catch (e) {
        console.error(e.message);
    }
}

criarTabelas();
