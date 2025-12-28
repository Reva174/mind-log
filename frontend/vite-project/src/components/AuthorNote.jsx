import { useState } from "react";

const AuthorNote = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="author-note">
      <p>
        This space is meant to be quiet. Write freely.
        Nothing here is shared.
      </p>
      <button onClick={() => setVisible(false)}>Hide</button>
    </div>
  );
};

export default AuthorNote;
