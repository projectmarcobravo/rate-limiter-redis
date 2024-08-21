import { Request, Response, NextFunction } from "express";
import { redisClient } from "../database/RedisClient";

export const publicRatelimiter = (weight: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers["x-forwarded-for"];
    const key = `rate_limit:${ip}`;

    const currentUsage = await redisClient.hGet(key, "usage");
    const expiry = await redisClient.hGet(key, "expiry");

    const usage = currentUsage ? parseInt(currentUsage, 10) + weight : weight;
    const maxLimit = parseInt(process.env.IP_RATE_LIMIT || "100", 10);
    const duration = parseInt(process.env.IP_LIMIT_DURATION || "3600", 10);

    if (!expiry || parseInt(expiry, 10) < Date.now()) {
      await redisClient.hSet(key, "usage", weight);
      await redisClient.hSet(key, "expiry", Date.now() + duration * 1000);
      await redisClient.expire(key, duration);
    } else if (usage > maxLimit) {
      const resetIn = (parseInt(expiry, 10) - Date.now()) / 1000;
      return res.status(429).json({
        error: "Rate limit exceeded",
        limit: maxLimit,
        usage,
        resetIn,
      });
    } else {
      await redisClient.hSet(key, "usage", usage);
    }

    next();
  };
};
