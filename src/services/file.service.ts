import fs from 'fs';
import path from 'path';

class FileService {
    getAllFiles(dir: string = './uploads/'): string[] {
        let files: string[] = [];

        const list = fs.readdirSync(dir);

        list.forEach((file) => {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                files = files.concat(this.getAllFiles(fullPath));
            } else {
                files.push(fullPath);
            }
        });

        return files;
    }
    getFile(id: string, dir = './uploads/'): string {
        const list = fs.readdirSync(dir);

        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                const foundFile = this.getFile(id, fullPath);
                if (foundFile) {
                    return foundFile;
                }
            } else if (file.split('-')[0] === id) {
                return fullPath;
            }
        }

        return '';
    }
    deleteFile(id: string): void {
        return fs.unlinkSync(this.getFile(id));
    }
    getFiles(ids: string[]): string[] {
        const files: string[] = [];

        ids.forEach((id) => {
            files.push(this.getFile(id));
        });

        return files;
    }
}

export default new FileService();
