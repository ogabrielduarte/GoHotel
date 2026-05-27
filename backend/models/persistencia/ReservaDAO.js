import sqlite3 from 'sqlite3';

export class ReservaDAO {

    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db');
    }

    cadastrar(reserva) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO reservas
                (data_entrada, data_saida, id_usuario, id_hotel)
                VALUES (?, ?, ?, ?)
            `;

            db.run(
                sql,
                [
                    reserva.getDataEntrada(),
                    reserva.getDataSaida(),
                    reserva.getIdUsuario(),
                    reserva.getIdHotel()
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
                SELECT *
                FROM reservas
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
                        reject('Reserva não encontrada');
                        return;
                    }

                    resolve(row);
                }
            );

        });
    }

    listarPorUsuario() {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM reservas
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

    atualizar(dados, id) {
        const db = this.iniciar();

        const sql = `
            UPDATE reservas
            SET id_usuario = ?,
                id_quarto = ?,
                data_checkin = ?,
                data_checkout = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [
                    dados.id_usuario,
                    dados.id_quarto,
                    dados.data_checkin,
                    dados.data_checkout,
                    id
                ],
                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject('Reserva não encontrada');
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
            DELETE FROM reservas
            WHERE id = ?
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
                        reject('Reserva não encontrada');
                        return;
                    }

                    resolve('Reserva deletada com sucesso');
                }
            );

        });
    }

}
