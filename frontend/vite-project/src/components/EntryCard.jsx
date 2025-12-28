const EntryCard = ({ entry, onDelete }) => {
  return (
    <div className="entry-card">
      <p>{entry.content}</p>
      <small>{new Date(entry.createdAt).toLocaleString()}</small>
      <button onClick={() => onDelete(entry._id)}>Delete</button>
    </div>
  );
};

export default EntryCard;
