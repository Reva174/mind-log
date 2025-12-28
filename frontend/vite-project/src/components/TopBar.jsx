import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TopBar = ({ search, setSearch }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      <input
        placeholder="Search entries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default TopBar;
