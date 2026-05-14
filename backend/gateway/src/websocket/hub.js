export class EventHub {
  constructor() {
    this.clients = new Set();
  }

  attach(server) {
    server.on("connection", (client) => {
      this.clients.add(client);
      client.on("close", () => {
        this.clients.delete(client);
      });
    });
  }

  publish(event, payload) {
    const message = JSON.stringify({ event, payload, timestamp: new Date().toISOString() });
    this.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }
}

export const eventHub = new EventHub();
