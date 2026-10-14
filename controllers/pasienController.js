import mongoose from "mongoose";
import Pasien from "../models/Pasien.js";

const idValid = (id) => mongoose.Types.ObjectId.isValid(id);

const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: "Input tidak valid", errors });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Tipe data untuk field '${error.path}' tidak valid`,
    });
  }
  return res.status(500).json({ success: false, message: "Terjadi kesalahan server", error: error.message });
};

// POST /api/pasien
export const createPasien = async (req, res) => {
  try {
    const { nama_pasien, umur, jenis_kelamin } = req.body;
    const pasien = await Pasien.create({ nama_pasien, umur, jenis_kelamin });
    res.status(201).json({ success: true, message: "Data pasien berhasil ditambahkan", data: pasien });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/pasien
export const getAllPasien = async (req, res) => {
  try {
    const pasien = await Pasien.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Data pasien berhasil ditampilkan",
      count: pasien.length,
      data: pasien,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/pasien/:id
export const getPasienById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValid(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const pasien = await Pasien.findById(id);
    if (!pasien) {
      return res.status(404).json({ success: false, message: "Data pasien tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Detail pasien berhasil ditampilkan", data: pasien });
  } catch (error) {
    handleError(res, error);
  }
};

// PUT /api/pasien/:id
export const updatePasien = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValid(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const { nama_pasien, umur, jenis_kelamin } = req.body;
    const pasien = await Pasien.findByIdAndUpdate(
      id,
      { nama_pasien, umur, jenis_kelamin },
      { new: true, runValidators: true }
    );
    if (!pasien) {
      return res.status(404).json({ success: false, message: "Data pasien tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Data pasien berhasil diperbarui", data: pasien });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE /api/pasien/:id
export const deletePasien = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValid(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const pasien = await Pasien.findByIdAndDelete(id);
    if (!pasien) {
      return res.status(404).json({ success: false, message: "Data pasien tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Data pasien berhasil dihapus", data: pasien });
  } catch (error) {
    handleError(res, error);
  }
};
