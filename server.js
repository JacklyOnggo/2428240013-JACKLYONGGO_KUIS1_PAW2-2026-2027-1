import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import pasienRoutes from "./routes/pasienRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "REST API Manajemen Data Pasien - Jackly Onggo (2428240013)" });
});

app.use("/api/pasien", pasienRoutes);

// JSON body rusak
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "JSON request body tidak valid" });
  }
  next(err);
});

// Route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
});
