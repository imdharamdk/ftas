import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { eventHub } from "./websocket/hub.js";
import { logger } from "./utils/logger.js";

const app = createApp();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws/events" });

eventHub.attach(wss);

server.listen(env.port, () => {
  logger.info("FTAS AI Gateway started", {
    port: env.port,
    mode: env.nodeEnv,
  });
});
