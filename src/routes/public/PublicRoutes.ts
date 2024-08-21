import { Request, Response } from "express";
import { AuthRouter } from "../AuthRouter";
import { publicRatelimiter } from "../../middlewares/publicRateLimiter";

export class PublicRoutes extends AuthRouter {
  initializeRoutes() {
    this.router.get(
      "/endpoint-1",
      publicRatelimiter(1),
      (req: Request, res: Response) => {
        res.json({ message: "This is the first endpoint" });
      }
    );
    this.router.get(
      "/endpoint-2",
      publicRatelimiter(2),
      (req: Request, res: Response) => {
        res.json({ message: "This is the second endpoint" });
      }
    );
    this.router.get(
      "/endpoint-3",
      publicRatelimiter(5),
      (req: Request, res: Response) => {
        res.json({ message: "This is the third endpoint" });
      }
    );
  }
}
