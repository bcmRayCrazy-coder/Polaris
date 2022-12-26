import initDatabase from './db/init';
import initBot from './game/bot';

async function main() {
    await initDatabase();
    await initBot();
}

main();
