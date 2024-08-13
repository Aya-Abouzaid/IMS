import http from 'http';
import app from './app';
import Env from '../config';

const { NODE_PORT } = Env;

const server = http.createServer(app);
server.listen(NODE_PORT || 5000, () => {
  console.log(`Server is starting at port: ${NODE_PORT}`);
});

process.on('unhandledRejection', (err: any) => {
  console.log(`unhandledRejection Error: ${err?.message}`);
  server.close(() => {
    console.log('Shutting Down ...');
    process.exit(1);
  });
});
