import AuthCard from "../../components/AuthCard/AuthCard";
import formStyles from "../../components/AuthForm/AuthForm.module.scss";
import { playSound } from "../../utils/playSound";

import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IUser {
  name: string;
  /**
   * @deprecated The method should not be used
   */
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = (e: SubmitEvent) => {
    e.preventDefault();
    if (!name || !password || !repeatPassword) {
      alert("Fill all fields");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
    const alreadyExists = users.find((user) => user.name === name);

    if (alreadyExists) {
      alert("User already exists");
      return;
    }
    users.push({name,password});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <AuthCard title="QUIZ QUEST">
      <form onSubmit={handleRegister} className={formStyles.form}>
        <input
          className={formStyles.input}
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={formStyles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={formStyles.input}
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button type="submit" className={formStyles.button} onClick={() => {playSound("click")}}>
          CREATE ACCOUNT
        </button>

        <p className={formStyles.text}>
          Already have an account?
          <Link to="/" className={formStyles.link} onClick={() => playSound("homepage")}>
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Register;