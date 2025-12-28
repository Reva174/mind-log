import { useState, useEffect } from "react";

const AuthorNote = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("authorNoteDismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const hideNote = () => {
    localStorage.setItem("authorNoteDismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <p>
        This space is meant to be quiet. Write freely.
        Nothing here is shared.
      </p>
      <button onClick={hideNote}>Hide</button>
    </div>
  );
};

export default AuthorNote;
