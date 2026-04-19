const express = require("express");
const router = express.Router();

const {
  login,
  register,
  createMedicine,
  getAllMedicines,
  getMedicineByBatch,
  updateMedicine,
  deleteMedicine,
  searchMedicineByName,
  getExpiredMedicines,
  getExpiringSoonMedicines,
} = require("../controllers/medicineController");

const auth = require("../middleware/auth");

router.post("/create", auth, createMedicine);
router.get("/", auth, getAllMedicines);
router.get("/search", auth, searchMedicineByName);
router.get("/expired", auth, getExpiredMedicines);
router.get("/expiring-soon", auth, getExpiringSoonMedicines);
router.get("/:batchNo", auth, getMedicineByBatch);

router.put("/:id", auth, updateMedicine);
// CREATE

router.delete("/name/:name/batch/:batchNo", deleteMedicine);
module.exports = router;
