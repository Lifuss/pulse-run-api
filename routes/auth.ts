import express from "express";
import validateBody from "../middlewares/validateBody";
import { schemaSignup } from "../schemas/joi/joiValidator";
import signup from "../controllers/auth/signup";

const router = express.Router();

router.post("/signup", validateBody(schemaSignup), signup);

export default router;
