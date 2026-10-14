import mongoose from "mongoose";

const pasienSchema = new mongoose.Schema(
  {
    nama_pasien: {
      type: String,
      required: [true, "nama_pasien wajib diisi"],
      trim: true,
    },
    umur: {
      type: Number,
      required: [true, "umur wajib diisi"],
      min: [0, "umur tidak boleh negatif"],
      max: [150, "umur tidak valid"],
    },
    jenis_kelamin: {
      type: String,
      required: [true, "jenis_kelamin wajib diisi"],
      enum: {
        values: ["Laki-laki", "Perempuan"],
        message: "jenis_kelamin harus 'Laki-laki' atau 'Perempuan'",
      },
    },
  },
  { timestamps: true }
);

// Nama collection: data_pasien
const Pasien = mongoose.model("Pasien", pasienSchema, "data_pasien");

export default Pasien;
