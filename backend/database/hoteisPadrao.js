import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./gohotel_db.db');

const hoteis = [
    {
        cnpj: '12345678901234',
        fantasia: 'Pousada Pratagy',
        localizacao: 'Maceió, Brasil',
        descricao: 'A melhor casa de praia do Caribe Nordestino',
        qtd_quartos: 20,
        imagem: '../../frontend/assets/images/hoteis-padrao/thegreat.jpg'
    },

    {
        cnpj: '13579135791357',
        fantasia: 'O Pônei Saltitante',
        localizacao: 'Bree, Middle-earth',
        descricao: 'Uma casa agradável a olhos familiares',
        qtd_quartos: 20,
        imagem: '../../frontend/assets/images/hoteis-padrao/ponei.jpg'
    },

    {
        cnpj: '02468024680246',
        fantasia: 'The Great Hotel',
        localizacao: 'Budapest, Hungria',
        descricao: 'Ainda resta uma centelha fraca de civilização neste matadouro selvagem que já foi conhecido como humanidade.',
        qtd_quartos: 100,
        imagem: '../../frontend/assets/images/hoteis-padrao/thegreat.jpg'
    },

    {
        cnpj: '42424242424242',
        fantasia: 'Hotel Prefect',
        localizacao: 'England, United Kingdom',
        descricao: 'NÃO PERCA A SUA TOALHA',
        qtd_quartos: 42,
        imagem: '../../frontend/assets/images/hoteis-padrao/prefect.jpg'
    },

    {
        cnpj: '25713793791713',
        fantasia: 'Copacabana Palace',
        localizacao: 'Rio de Janeiro, Brasil',
        descricao: 'Sempre excelente',
        qtd_quartos: 200,
        imagem: '../../frontend/assets/images/hoteis-padrao/palace.jpg'
    }
];

function hoteisPadrao() {

    const sql = `
        INSERT INTO hoteis (
            cnpj,
            fantasia,
            localizacao,
            descricao,
            qtd_quartos,
            imagem
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.serialize(() => {

        hoteis.forEach(hotel => {

            db.run(sql, [
                hotel.cnpj,
                hotel.fantasia,
                hotel.localizacao,
                hotel.descricao,
                hotel.qtd_quartos,
                hotel.imagem
            ]);

        });

    });

}

hoteisPadrao();