import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEntries, createEntry, deleteEntry } from "../api/entries";
import TopBar from "../components/TopBar";
import AuthorNote from "../components/AuthorNote";
import EntryCard from "../components/EntryCard";
import { enablePrivateSpace } from "../api/private";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [showPrivatePrompt, setShowPrivatePrompt] = useState(false);

  const loadEntries = async () => {
    const res = await getEntries(token);
    setEntries(res.data);
  };

  const addEntry = async () => {
    if (!text.trim()) return;
    await createEntry(token, { content: text });
    setText("");
    loadEntries();
  };

  const removeEntry = async (id) => {
    await deleteEntry(token, id);
    loadEntries();
  };

  const setupPrivate = async () => {
  await enablePrivateSpace(token, {
    trigger: "unlock",
    pin: "1234"
  });
  alert("Private space enabled");
};

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
  // example trigger, later user-defined
  if (search.trim().toLowerCase() === "unlock") {
    setShowPrivatePrompt(true);
    setSearch(""); // clear immediately
  }
}, [search]);

{showPrivatePrompt && (
  <PrivatePrompt
    onClose={() => setShowPrivatePrompt(false)}
    onSuccess={() => {
      setShowPrivatePrompt(false);
      console.log("Private space unlocked (for now)");
    }}
  />
)}

  const filtered = entries.filter(e =>
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <TopBar search={search} setSearch={setSearch} />
      <AuthorNote />

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write something..."
      />
      <button onClick={addEntry}>Save</button>

      {filtered.map(e => (
        <EntryCard key={e._id} entry={e} onDelete={removeEntry} />
      ))}
    </div>
  );
};

export default Dashboard;
