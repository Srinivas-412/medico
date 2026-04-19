import { Link } from "react-router-dom";
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between">
      <h1>Pharmacy</h1>
      <div className="flex gap-3 text-sm">
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/expiry">Expiry</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}