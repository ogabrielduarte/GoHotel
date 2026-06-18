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

    listarTodas() {
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

    verificarDisponibilidade(
        idHotel,
        dataEntrada,
        dataSaida,
        idReserva = null
    ) {

        const db = this.iniciar();

        let sql = `
        SELECT COUNT(*) AS total
        FROM reservas
        WHERE id_hotel = ?
        AND data_entrada <= ?
        AND data_saida >= ?
    `;

        const params = [
            idHotel,
            dataSaida,
            dataEntrada
        ];

        if (idReserva) {
            sql += ` AND id != ?`;
            params.push(idReserva);
        }

        return new Promise((resolve, reject) => {

            db.get(
                sql,
                params,
                function (err, row) {

                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(row.total);
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

    mudarData(id, dataEntrada, dataSaida) {
        const db = this.iniciar();

        const sql = `
            UPDATE reservas
            SET data_entrada = ?,
                data_saida = ?
            WHERE id = ?
        `

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [id, dataEntrada, dataSaida],
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

                    resolve('Reserva atualizada com sucesso');
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
