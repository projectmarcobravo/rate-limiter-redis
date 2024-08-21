import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (error) => console.log("Redis Client Error", error));

redisClient.connect();
