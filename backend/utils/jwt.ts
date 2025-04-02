import jwt from "jsonwebtoken";
import { getJwtSecret } from "./getSecrets";

const TOKEN_EXPIRY = "24h";
const ALGORITHM = "HS256";

interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const getToken = (userId: string): string => {
  try {
    const secret = getJwtSecret();
    const payload: TokenPayload = { userId };

    const token = jwt.sign(payload, secret, {
      expiresIn: TOKEN_EXPIRY,
      algorithm: ALGORITHM,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate authentication token");
  }
};

export const getUserId = (token: string): string => {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret, {
      algorithms: [ALGORITHM],
    }) as TokenPayload;

    if (!decoded || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    return decoded.userId;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Authentication token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid authentication token");
    } else {
      console.error("Token verification error:", error);
      throw new Error("Authentication failed");
    }
  }
};
