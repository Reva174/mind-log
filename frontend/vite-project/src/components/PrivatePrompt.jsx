import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { verifyPin } from "../api/private";

const PrivatePrompt = ({ onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      await verifyPin(token, pin);
      onSuccess();
    } catch {
      setError("Wrong PIN");
    }
  };

  return (
    <div className="modal">
      <p>Enter PIN</p>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      {error && <small>{error}</small>}
      <button onClick={submit}>Unlock</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PrivatePrompt;
