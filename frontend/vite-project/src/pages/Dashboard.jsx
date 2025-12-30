import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getEntries,
  createEntry,
  deleteEntry,
  getLockedEntries,
} from "../api/entries";

import TopBar from "../components/TopBar";
import AuthorNote from "../components/AuthorNote";
import EntryCard from "../components/EntryCard";
import PrivateAuthorNote from "../components/PrivateAuthorNote";

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);

  const [entries, setEntries] = useState([]);
  const [lockedEntries, setLockedEntries] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [showPrivateNote, setShowPrivateNote] = useState(false);

  // 👇 Handle private author note properly
  useEffect(() => {
    if (user && !user.privateSpace?.hasSeenAuthorNote) {
      setShowPrivateNote(true);
    }
  }, [user]);

  const loadEntries = async () => {
    try {
      const res = await getEntries(token);
      setEntries(res.data);
    } catch {
      console.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  const loadLockedEntries = async () => {
    try {
      const res = await getLockedEntries(token);
      setLockedEntries(res.data);
    } catch {
      console.error("Failed to load locked entries");
    }
  };

  const saveEntry = async () => {
    if (!text.trim()) return;

    await createEntry(token, {
      content: text,
      isLocked: privateMode,
    });

    setText("");
    privateMode ? loadLockedEntries() : loadEntries();
  };

  const removeEntry = async (id) => {
    await deleteEntry(token, id);
    privateMode ? loadLockedEntries() : loadEntries();
  };

  useEffect(() => {
    if (token) loadEntries();
  }, [token]);

  useEffect(() => {
    if (token) {
      privateMode ? loadLockedEntries() : loadEntries();
    }
  }, [privateMode]);

  const filteredEntries = entries.filter((e) =>
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading…</p>;

  return (
    <div className="dashboard">
      <TopBar search={search} setSearch={setSearch} />

      <button onClick={() => setPrivateMode(!privateMode)}>
        {privateMode ? "Exit Private Space" : "Enter Private Space"}
      </button>

      <AuthorNote />

      {privateMode && showPrivateNote && (
        <PrivateAuthorNote onClose={() => setShowPrivateNote(false)} />
      )}

      <textarea
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={saveEntry}>
        {privateMode ? "Save to Private Space" : "Save"}
      </button>

      <div>
        {(privateMode ? lockedEntries : filteredEntries).map((entry) => (
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
