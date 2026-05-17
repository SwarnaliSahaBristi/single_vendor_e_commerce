import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET as string,
  node_env: process.env.NODE_ENV as string,
  database_url: process.env.DATABASE_URL as string,
};

export default env;
