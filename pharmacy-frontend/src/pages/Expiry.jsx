import { useEffect, useState } from "react";
import { getExpired, getExpiringSoon } from "../api/medicineApi";

export default function Expiry() {
  const [expired, setExpired] = useState([]);
  const [soon, setSoon] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const e = await getExpired();
      const s = await getExpiringSoon();
      setExpired(e.data);
      setSoon(s.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-red-500 font-bold">Expired</h2>
      {expired.map((m) => (
        <div key={m._id}>{m.name} - {m.batchNo}</div>
      ))}

      <h2 className="text-yellow-500 font-bold mt-4">Expiring Soon</h2>
      {soon.map((m) => (
        <div key={m._id}>{m.name} - {m.batchNo}</div>
      ))}
    </div>
  );
}