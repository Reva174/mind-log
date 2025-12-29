import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { markAuthorNoteSeen } from "../api/private";

const PrivateAuthorNote = ({ onClose }) => {
  const { token } = useContext(AuthContext);

  const acknowledge = async () => {
    await markAuthorNoteSeen(token);
    onClose();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <p>
        This space is yours alone.
        No reminders. No filters.
        Write what never leaves this room.
      </p>
      <button onClick={acknowledge}>I understand</button>
    </div>
  );
};

export default PrivateAuthorNote;
