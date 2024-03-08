import config from './utils/config';
import createServer from './utils/create-server';

const app = createServer();

const main = async () => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

main();
