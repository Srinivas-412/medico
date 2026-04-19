const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    doe: {
      type: Date,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    purchaseRate: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true },
);

// unique per user + name + batch
medicineSchema.index({ user: 1, name: 1, batchNo: 1 }, { unique: true });

module.exports = mongoose.model("Medicine", medicineSchema);
