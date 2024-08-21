import { Request, Response, NextFunction } from "express";
import { redisClient } from "../database/RedisClient";

export const privateRateLimiter = (weight: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const key = "private";
    const currentUsage = await redisClient.hGet(key, "usage");
    const expiry = await redisClient.hGet(key, "expiry");

    const usage = currentUsage ? parseInt(currentUsage, 10) + weight : weight;
    const maxLimit = parseInt(process.env.TOKEN_RATE_LIMIT || "200", 10);
    const duration = parseInt(process.env.TOKEN_LIMIT_DURATION || "3600", 10);

    if (!expiry || parseInt(expiry, 10) < Date.now()) {
      await redisClient.hSet(key, "usage", weight);
      await redisClient.hSet(key, "expiry", Date.now() + duration * 1000);
      await redisClient.expire(key, duration);
    } else if (usage > maxLimit) {
      const resetIn = (parseInt(expiry, 10) - Date.now()) / 1000;
      const minutesLeftToReset = Math.ceil(resetIn / 60);
      return res.status(429).json({
        error: "Rate limit exceeded",
        limit: maxLimit,
        usage,
        minutesLeftToReset,
      });
    } else {
      await redisClient.hSet(key, "usage", usage);
    }

    next();
  };
};
