import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import entryRoutes from "./controller/entry.controller";
import personRoutes from "./controller/person.controller";

const app = express();

const corsOpts = {
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST"],
  origin: "*",
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
