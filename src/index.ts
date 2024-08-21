import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { Server } from "./Server";

const server = new Server();

server.start();
