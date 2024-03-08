import supertest from 'supertest';
import createServer from '../utils/create-server';

const app = createServer();

describe('file', () => {
    describe('get file route', () => {
        describe('given the given file does not exist ', () => {
            it('should return 404', async () => {
                const fileId = 'fake';
                await supertest(app).get(`/file/${fileId}`).expect(404);
            });
        });
        describe('given the given file does exist ', () => {
            it('should return 404', async () => {
                const fileId = '12345';
                const { body, statusCode } = await supertest(app).get(
                    `/file/${fileId}`,
                );

                expect(statusCode).toBe(200);
                expect(body).toMatchObject({
                    file: 'uploads\\12345-test.txt',
                    success: true,
                });
            });
        });
    });
    describe('upload file', () => {
        it('should upload a file successfully', async () => {
            const response = await supertest(app)
                .post('/upload/uploads-test')
                .attach('file', '__files__\\1234-test.txt');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'File successfully uploaded',
                success: true,
            });
        });
        it('should return an error for invalid file type', async () => {
            const response = await supertest(app)
                .post('/upload/test')
                .attach('file', '__files__\\file.cpp');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: 'Invalid file type, only .docx, .pdf, .jpg, .png and .txt are allowed!',
                success: false,
            });
        });
    });
    describe('get files', () => {
        describe('invalid folder', () => {
            it('should return 500', async () => {
                const dirId = 'fake';
                await supertest(app).get(`/files/${dirId}`).expect(500);
            });
        });
        describe('get files from valid folder', () => {
            it('should return files and status code 200', async () => {
                const realDir = 'uploads-array';

                const files = [
                    'uploads\\array\\123-test.txt',
                    'uploads\\array\\321-test.txt',
                ];

                const response = await supertest(app).get(`/files/${realDir}`);
                expect(response.statusCode).toBe(200);
                expect(response.body).toMatchObject({ files, success: true });
            });
        });
    });
});
