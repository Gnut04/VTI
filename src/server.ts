import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`─────────────────────────────────────────────`);
    console.log(`🚀 Server running at  http://localhost:${PORT}`);
    console.log(`📡 API available at   http://localhost:${PORT}/api/v1`);
    if (NODE_ENV === "production") {
      console.log(`🌐 Frontend served at http://localhost:${PORT}`);
    } else {
      console.log(`⚙️  Mode: ${NODE_ENV} (frontend served separately)`);
    }
    console.log(`─────────────────────────────────────────────`);
  });
};

startServer();