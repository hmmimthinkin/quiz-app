import AuthCard from "../../components/AuthCard/AuthCard";
import formStyles from "../../components/AuthForm/AuthForm.module.scss";
import { playSound } from "../../utils/playSound";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IUser {
  name: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => user.name === name && user.password === password);

    if (!user) {
      alert("Wrong username or password");
      return;
    }
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/home");
    playSound("homepage");
  };

  return (
    <AuthCard title="QUIZ QUEST">
      <form onSubmit={handleLogin} className={formStyles.form}>
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

        <button type="submit" className={formStyles.button} onClick={() => {playSound("click")}}>
          START QUIZ
        </button>

        <p className={formStyles.text}>
          Don't have an account?
          <Link to="/register"className={formStyles.link} onClick={() => playSound("homepage")}>
            Register
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Login;