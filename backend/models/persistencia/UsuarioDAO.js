import sqlite3 from 'sqlite3';

export class UsuarioDAO {

    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db');
    }

    cadastrar(usuario) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
            INSERT INTO usuarios
            (
                nome,
                genero,
                email,
                senha,
                termos,
                receber_emails
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

            db.run(
                sql,
                [
                    usuario.getNome(),
                    usuario.getGenero(),
                    usuario.getEmail(),
                    usuario.getSenha(),
                    usuario.getTermos(),
                    usuario.getReceberEmails()
                ],

                function (err) {

                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(this.lastID);

                }
            );

        });

    }

    login(email) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
            SELECT *
            FROM usuarios
            WHERE email = ?
        `;

            db.get(
                sql,
                [email],
                function (err, row) {

                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!row) {
                        reject('Usuário não encontrado');
                        return;
                    }

                    resolve(row);

                }
            );

        });

    }

    listarTodos() {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM usuarios
            `;

            db.all(
                sql, [],
                function (err, rows) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                }
            );
        });
    }

    buscaPorId(id) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM usuarios
                WHERE id = ?
            `;

            db.get(
                sql,
                [id],
                function (err, row) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!row) {
                        reject('Usuário não encontrado');
                        return;
                    }

                    resolve(row);
                }
            );

        });
    }

    listarReservas(id) {
        const db = this.iniciar();


        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u.id, h.fantasia, r.data_entrada, r.data_saida
                FROM usuarios u
                INNER JOIN reservas r ON u.id = r.id_usuario
                INNER JOIN hoteis h ON r.id_hotel = h.id
                WHERE u.id = ?
            `;

            db.all(
                sql,
                [id],
                function(err, rows) {
                    db.close();

                    if(err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                }
            );
        })

    }

    atualizar(dados, id) {

        const db = this.iniciar();

        const sql = `
        UPDATE usuarios
        SET nome = ?,
            genero = ?,
            email = ?,
            senha = ?
        WHERE id = ?
    `;

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [
                    dados.nome,
                    dados.genero,
                    dados.email,
                    dados.senha,
                    id
                ],

                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject("Usuário não encontrado");
                        return;
                    }

                    resolve(this.changes);
                }
            );

        });

    }

    deletar(id) {
        const db = this.iniciar();

        const sql = `
            DELETE FROM usuarios
            WHERE ID = ?
        `;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                [id],
                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject('Usuário não encontrado');
                        return;
                    }

                    resolve('Usuário deletado com sucesso');
                }
            )
        });
    }
}
