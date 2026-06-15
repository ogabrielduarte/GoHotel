import sqlite3 from 'sqlite3';

export class HotelDAO {

    iniciar() {
        return new sqlite3.Database('./database/gohotel_db.db');
    }

    cadastrar(hotel) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO hoteis (cnpj, fantasia, localizacao, descricao, qtd_quartos, imagem)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.run(
                sql,
                [
                    hotel.getCnpj(),
                    hotel.getFantasia(),
                    hotel.getLocalizacao(),
                    hotel.getDescricao(),
                    hotel.getQuartos(),
                    hotel.getImagem()
                ],

                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(this.lastId);
                }
            );
        });
    }

    listarTodos() {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM hoteis
            `;

            db.all(
                sql,
                [],

                function(err, rows) {
                    db.close;

                    if(err) {
                        reject(err);
                        return;
                    }

                    if(!rows) {
                        reject('Não há hoteis cadastrados');
                        return;
                    }

                    resolve(rows);
                }
            )
        });
    }

    buscarPorId(id) {
        const db = this.iniciar();

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM hoteis
                WHERE id = ?
            `;

            db.get(
                sql,

                [id],

                function(err, row) {

                    if(err) {
                        reject(err);
                        return;
                    } 

                    if(!row) {
                        reject('Hotel não encontrado');
                        return;
                    }

                    resolve(row);
                }
            );
        });
    }

    atualizar(id, dados) {

        const db = this.iniciar();

        const sql = `
        UPDATE hoteis
        SET cnpj = ?,
            fantasia = ?,
            localizacao = ?,
            qtd_quartos = ?,
            descricao = ?,
            imagem = ?
            WHERE id = ?
    `;

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [
                    dados.cnpj,
                    dados.fantasia,
                    dados.localizacao,
                    dados.quartos,
                    dados.descricao,
                    dados.imagem,
                    id
                ],

                function (err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if (this.changes === 0) {
                        reject("Hotel não encontrado");
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
            DELETE FROM hoteis
            WHERE ID = ?
        `;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                [id],
                function(err) {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    if(this.changes === 0) {
                        reject('Hotel não encontrado');
                        return;
                    }

                    resolve('Hotel deletado com sucesso');
                }
            );
        });
    }
}