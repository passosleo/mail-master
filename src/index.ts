import { useServer } from './server';

const server = useServer({ port: 3000, name: 'My Server' });

server.start();
