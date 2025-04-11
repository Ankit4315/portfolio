import express from "express";
import {
  forgotPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  register,
  resetPassword,
  updatePasssword,
  updateProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  // (req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization"
  //   );
  //   next();
  // },
  login
);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePasssword);
router.get("/me/portfolio", getUserForPortfolio);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
