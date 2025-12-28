import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", textAlign: "center" }}>
      <h1>Mind Log</h1>
      <p>A quiet place for your thoughts.</p>

      <div style={{ marginTop: "2rem" }}>
        <p>Already a user?</p>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <p style={{ marginTop: "1rem" }}>New here?</p>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
