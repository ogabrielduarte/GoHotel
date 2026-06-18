import * as Minio from "minio";

export const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "admin",
    secretKey: "12345678"
});