import express from "express";
import cors from "cors";
import plantRouter from "./routes/PlantRoutes";
import AppDataSource from "./data-source";
import path = require("path");

AppDataSource.initialize().then(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*", // 'http://localhost:3000'
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.use("/api/plant", plantRouter);
app.use("/assets", express.static(path.join(__dirname,"../public/assets")));
  app.listen(process.env.PORT, () => {
    console.log(`L'api est en route sur l'adresse: ${process.env.PORT}`);
  });
});