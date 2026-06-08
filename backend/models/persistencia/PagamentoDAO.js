import sqlite3 from 'sqlite3';

export class PagamentoDAO {

    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db');
    }

    cadastrar(pagamento) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO pagamentos
                (valor, status, id_usuario, id_hotel)
                VALUES (?, ?, ?, ?)
            `;

            db.run(
                sql,
                [
                    pagamento.getValor(),
                    pagamento.getStatus(),
                    pagamento.getIdUsuario(),
                    pagamento.getIdHotel()
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

    listarTodos() {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM pagamentos
            `;

            db.all(
                sql,
                [],
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
                SELECT *
                FROM pagamentos
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
                        reject('Pagamento não encontrado');
                        return;
                    }

                    resolve(row);

                }
            );

        });

    }

    atualizar(dados, id) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                UPDATE pagamentos
                SET valor = ?,
                    status = ?
                WHERE id = ?
            `;

            db.run(
                sql,
                [
                    dados.valor,
                    dados.status,
                    id
                ],
                function (err) {

                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject('Pagamento não encontrado');
                        return;
                    }

                    resolve(this.changes);

                }
            );

        });

    }

    deletar(id) {

        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                DELETE FROM pagamentos
                WHERE id = ?
            `;

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
                        reject('Pagamento não encontrado');
                        return;
                    }

                    resolve('Pagamento deletado com sucesso');

                }
            );

        });

    }

}