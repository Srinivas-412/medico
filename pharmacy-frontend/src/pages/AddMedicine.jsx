import { useState } from "react";
import { createMedicine } from "../api/medicineApi";

export default function AddMedicine() {
  const [form, setForm] = useState({
    name: "",
    batchNo: "",
    stockQuantity: "",
    doe: "",
    mrp: "",
    purchaseRate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMedicine(form);
    alert("Medicine added");
    setForm({
      name: "",
      batchNo: "",
      stockQuantity: "",
      doe: "",
      mrp: "",
      purchaseRate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Batch No"
        value={form.batchNo}
        onChange={(e) => setForm({ ...form, batchNo: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={form.stockQuantity}
        onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
      />
      <input
        type="date"
        value={form.doe}
        onChange={(e) => setForm({ ...form, doe: e.target.value })}
      />
      <input
        type="number"
        placeholder="MRP"
        value={form.mrp}
        onChange={(e) => setForm({ ...form, mrp: e.target.value })}
      />
      <input
        type="number"
        placeholder="Purchase Rate"
        value={form.purchaseRate}
        onChange={(e) => setForm({ ...form, purchaseRate: e.target.value })}
      />

      <button className="bg-green-500 text-white p-2 rounded">Add</button>
    </form>
  );
}