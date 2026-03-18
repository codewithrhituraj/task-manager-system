import jwt from "jsonwebtoken";

const SECRET = "mysecret"; // later we move to .env

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};