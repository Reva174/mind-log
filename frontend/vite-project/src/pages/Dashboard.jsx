import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEntries, createEntry, deleteEntry } from "../api/entries";

import TopBar from "../components/TopBar";
import AuthorNote from "../components/AuthorNote";
import EntryCard from "../components/EntryCard";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const res = await getEntries(token);
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async () => {
    if (!text.trim()) return;
    await createEntry(token, { content: text, isLocked: false });
    setText("");
    loadEntries();
  };

  const removeEntry = async (id) => {
    await deleteEntry(token, id);
    loadEntries();
  };

  useEffect(() => {
    if (token) loadEntries();
  }, [token]);

  const filteredEntries = entries.filter((e) =>
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading…</p>;

  return (
    <div className="dashboard">
      <TopBar search={search} setSearch={setSearch} />
      <AuthorNote />

      <textarea
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addEntry}>Save</button>

      <div>
        {filteredEntries.map((entry) => (
          <EntryCard
            key={entry._id}
            entry={entry}
            onDelete={removeEntry}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
