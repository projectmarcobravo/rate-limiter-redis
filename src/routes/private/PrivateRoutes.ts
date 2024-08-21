import { Request, Response } from "express";
import { privateRateLimiter } from "../../middlewares/privateRateLimiter";
import { AuthRouter } from "../AuthRouter";
import { checkAuth } from "../../middlewares/auth";

export class PrivateRoutes extends AuthRouter {
  initializeRoutes() {
    this.router.get(
      "/endpoint-1",
      [checkAuth, privateRateLimiter(1)],
      (req: Request, res: Response) => {
        res.json({ message: "This is the first endpoint" });
      }
    );
    this.router.get(
      "/endpoint-2",
      [checkAuth, privateRateLimiter(2)],
      (req: Request, res: Response) => {
        res.json({ message: "This is the second endpoint" });
      }
    );
    this.router.get(
      "/endpoint-3",
      [checkAuth, privateRateLimiter(5)],
      (req: Request, res: Response) => {
        res.json({ message: "This is the third endpoint" });
      }
    );
  }
}
