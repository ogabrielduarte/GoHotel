const sqlite = require('sqlite3');
const db = new sqlite.Database('./gohotel_db.db');

function criarTabelas() {
    try {
        db.serialize(() => {
            db.run(`
            CREATE TABLE usuarios (
                id INTEGER PRIMARY KEY,
                nome TEXT(50) NOT NULL,
                email TEXT NOT NULL,
                senha TEXT NOT NULL,
                telefone TEXT
            );
            `)

            db.run(`
                CREATE TABLE telefones_usuarios (
                    id_usuario INTEGER,
                    telefone TEXT,

                    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
                );
                `)

            db.run(`
                CREATE TABLE hoteis (
                    id INTEGER PRIMARY KEY,
                    CNPJ INTEGER(14) UNIQUE NOT NULL,
                    FANTASIA TEXT(50) NOT NULL,
                    LOCALIZACAO,
                    QTD_QUARTOS INTEGER NOT NULL
                );
                `)

            db.run(`
                CREATE TABLE reserva (
                    id INTEGER,
                    data_entrada TEXT ,
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
