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
                (nome, email, senha)
                VALUES (?, ?, ?)
            `;

            db.run(
                sql,
                [
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getSenha()
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

    atualizar(dados, id) {

        const db = this.iniciar();

        const sql = `
        UPDATE usuarios
        SET nome = ?,
            email = ?
        WHERE id = ?
    `;

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [
                    dados.nome,
                    dados.email,
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
