import express, { Application, urlencoded, json } from "express";
import cors from "cors";
import * as http from "http";
import { PublicRoutes } from "./routes/public/PublicRoutes";
import { PrivateRoutes } from "./routes/private/PrivateRoutes";

export class Server {
  public app: Application;
  public httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.configServerlibraries();
    this.setupRoutes();
  }

  public async start() {
    return new Promise((resolve) => {
      const PORT = process.env.NODE_PORT || 3000;
      this.httpServer = this.app.listen(PORT, () => {
        console.log(`🚀 Server listening in ${PORT}`);
      });
      resolve("");
    });
  }

  public close() {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        console.log("❌ Server closed");
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve("");
        });
      }
      return resolve("");
    });
  }

  private configServerlibraries() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(cors());
  }

  private setupRoutes() {
    const userPublicRoutes = new PublicRoutes();
    const userPrivateRoutes = new PrivateRoutes();
    this.app.use("/public", userPublicRoutes.router);
    this.app.use("/private", userPrivateRoutes.router);
  }
}
