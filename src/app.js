import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import entryRoutes from "./routes/entry.routes";
import personRoutes from "./routes/person.routes";

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/entry", entryRoutes);
app.use("/api/person", personRoutes);

export default app;
