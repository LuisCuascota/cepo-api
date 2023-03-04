import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import entryRoutes from "./controller/entry.controller";
import personRoutes from "./controller/person.controller";
import loanRoutes from "./controller/loan.controller";

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
app.use("/api/loan", loanRoutes);

export default app;
