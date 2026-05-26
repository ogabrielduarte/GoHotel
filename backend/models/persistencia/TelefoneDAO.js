import sqlite3 from 'sqlite3';

export class TelefoneDAO {
    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db')
    }

    cadastrar(telefone) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
        INSERT INTO telefones_usuarios (id_usuario, telefone) VALUES (?, ?)
        `;

            db.run(
                sql,

                [
                    telefone.id_usuario,
                    telefone.telefone
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


    buscaPorId(id) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM telefones_usuarios
                WHERE id = ?
            `

            db.get(
                sql,

                [id],

                function (err, row) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!row) {
                        reject('Telefone não encontrado');
                        return;
                    }

                    resolve(row);
                }
            )
        });
    }

    listarTelefonesUsuario(idUsuario) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT telefone
                FROM telefones_usuarios
                WHERE id_usuario = ?
                ORDER BY id
            `

            db.run(
                sql,

                [idUsuario],

                function (err, row) {
                    if (err, row) {
                        reject(err);
                    }

                    if (!row) {
                        reject('Lista de telefones do usuário não foi encontrada');
                    }

                    resolve(row);
                }
            )
        });
    }

    atualizarNum(num, id) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
            UPDATE telefones_usuarios
            SET telefone = ?
            WHERE id = ?
            `;

            db.run(
                sql,
                [
                    num,
                    id
                ],

                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject("Telefone não encontrado");
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
            DELETE FROM telefones_usuarios
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
                        reject('Telefone não encontrado');
                        return;
                    }

                    resolve('Telefone deletado com sucesso');
                }
            )
        });
    }


}