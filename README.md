# REST API Manajemen Data Pasien
Kuis 1 Pengembangan Aplikasi Web II - Jackly Onggo (2428240013)

## Menjalankan
1. `npm install`
2. Pastikan MongoDB berjalan (default `mongodb://127.0.0.1:27017`)
3. `npm start` (atau `npm run dev`)

Database : `jackly_onggo_manajemen_data_pasien`
Collection: `data_pasien`

## Endpoint
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | /api/pasien | Tambah data pasien |
| GET | /api/pasien | Tampilkan semua pasien |
| GET | /api/pasien/:id | Detail pasien |
| PUT | /api/pasien/:id | Update pasien |
| DELETE | /api/pasien/:id | Hapus pasien |

Contoh body:
```json
{ "nama_pasien": "Budi Santoso", "umur": 35, "jenis_kelamin": "Laki-laki" }
```
Postman Collection: `collection-api/pasien-api.postman_collection.json`
