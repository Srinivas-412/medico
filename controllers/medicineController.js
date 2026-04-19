const Medicine = require("../models/medicineModel");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" });

  res.json({ token });
};

exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ONLY LOGGED USER DATA
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user.id,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY BATCH (ONLY OWN DATA)
exports.getMedicineByBatch = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user.id,
      batchNo: req.params.batchNo,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ONLY OWN DATA
exports.updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { $set: req.body },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteMedicine = async (req, res) => {
  try {
    const { name, batchNo } = req.params;

    const deleted = await Medicine.findOneAndDelete({ name, batchNo });

    if (!deleted) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH ONLY OWN DATA
exports.searchMedicineByName = async (req, res) => {
  try {
    const { name } = req.query;

    const medicines = await Medicine.find({
      user: req.user.id,
      name: { $regex: name, $options: "i" },
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXPIRED ONLY OWN DATA
exports.getExpiredMedicines = async (req, res) => {
  try {
    const today = new Date();

    const medicines = await Medicine.find({
      user: req.user.id,
      doe: { $lt: today },
    }).sort({ doe: 1 });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXPIRING SOON ONLY OWN DATA
exports.getExpiringSoonMedicines = async (req, res) => {
  try {
    const today = new Date();

    const next3Months = new Date();
    next3Months.setMonth(next3Months.getMonth() + 3);

    const medicines = await Medicine.find({
      user: req.user.id,
      doe: {
        $gte: today,
        $lte: next3Months,
      },
    }).sort({ doe: 1 });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
