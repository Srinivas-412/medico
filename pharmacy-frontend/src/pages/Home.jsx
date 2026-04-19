import { useEffect, useState } from "react";
import {
  getMedicines,
  deleteMedicine,
  searchMedicine,
  getByBatch,
  updateMedicine,
} from "../api/medicineApi";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const fetchData = async () => {
    const res = await getMedicines();
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (search.trim()) {
      const res = await searchMedicine(search);
      setMedicines(res.data);
    } else if (batch.trim()) {
      const res = await getByBatch(batch);
      setMedicines(res.data);
    } else {
      fetchData();
    }
  };

  const handleDelete = async (name, batchNo) => {
    await deleteMedicine(name, batchNo);
    fetchData();
  };

  const startEdit = (medicine) => {
    setEditingId(medicine._id);

    setForm({
      name: medicine.name,
      batchNo: medicine.batchNo,
      stockQuantity: medicine.stockQuantity,
      doe: medicine.doe?.split("T")[0],
      mrp: medicine.mrp,
      purchaseRate: medicine.purchaseRate,
      discountRate: medicine.discountRate,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateMedicine(editingId, form);

    setEditingId(null);
    fetchData();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  return (
    <div className="p-4">
      {/* Search */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          placeholder="Search by name"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Search by batchNo"
          className="border p-2 rounded"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Medicines */}
      <div className="grid gap-3">
        {medicines.map((m) => (
          <div
            key={m._id}
            className="border p-4 rounded shadow bg-white"
          >
            {editingId !== m._id ? (
              <>
                {/* Display Card */}
                <h2 className="font-bold text-lg">{m.name}</h2>
                <p>Batch: {m.batchNo}</p>
                <p>Stock: {m.stockQuantity}</p>
                <p>MRP: ₹{m.mrp}</p>
                <p>
                  Expiry: {new Date(m.doe).toLocaleDateString()}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(m)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(m.name, m.batchNo)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Update Form */}
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col gap-2"
                >
                  <input
                    value={form.name}
                    disabled
                    className="border p-2 rounded bg-gray-100"
                  />

                  <input
                    value={form.batchNo}
                    disabled
                    className="border p-2 rounded bg-gray-100"
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    value={form.stockQuantity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stockQuantity: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="date"
                    value={form.doe}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        doe: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="MRP"
                    value={form.mrp}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        mrp: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Purchase Rate"
                    value={form.purchaseRate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        purchaseRate: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Discount Rate"
                    value={form.discountRate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discountRate: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <div className="flex gap-2 mt-2">
                    <button className="bg-green-500 text-white px-3 py-2 rounded">
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-3 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}