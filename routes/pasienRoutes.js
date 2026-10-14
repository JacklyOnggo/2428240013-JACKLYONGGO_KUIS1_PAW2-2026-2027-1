import express from "express";
import {
  createPasien,
  getAllPasien,
  getPasienById,
  updatePasien,
  deletePasien,
} from "../controllers/pasienController.js";

const router = express.Router();

router.post("/", createPasien);
router.get("/", getAllPasien);
router.get("/:id", getPasienById);
router.put("/:id", updatePasien);
router.delete("/:id", deletePasien);

export default router;
