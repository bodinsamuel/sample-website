import closeWithGrace from "close-with-grace";
import fastify from "fastify";
import { PORT } from "./env.js";
import appService, { options } from "./app.js";

const app = fastify(options);

// Register your application as a normal plugin.
void app.register(appService);

process
  .on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at Promise', reason);
  })
  .on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown', err);
    process.exit(1);
  });

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: 500 },
  async function ({ err }: any) {
    if (err) {
      app.log.error(err);
    }

    await app.close();
  }
);

app.addHook('onClose', (_, done) => {
  try {
    closeListeners.uninstall();
  } catch (err) {
    console.error(err);
  }
  done();
});

// Start listening.
app.listen({ host: '0.0.0.0', port: PORT }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

void (async () => {
  console.log('🚀 Started', `http://localhost:${PORT}`);

})();
