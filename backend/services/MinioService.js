services:
import Minio from "minio";

export const minioClient = new Minio.Client({
    endpoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "admin",
    secretKey: "12345678"
});