import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Importações corrigidas
import { toast } from 'sonner';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

import img from "../../assets/mascote.png";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  
  // Estados de Nome e Sobrenome
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  const showSucess = () => {
    toast.success('Cadastro realizado com sucesso!');
  };

  const showError2 = () => {
    toast.error('Senhas não são iguais!');
  };

  const showError = (error) => {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email já cadastrado!");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Email inválido!");
    } else if (error.code === "auth/weak-password") {
      toast.error("Senha deve conter mais de 6 caracteres!");
    } else {
      toast.error("Erro ao inserir o cadastro");
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validação extra para garantir que preencheram o nome
    if (!firstName || !lastName) {
      toast.error("Preencha seu Nome e Sobrenome!");
      return;
    }

    if (password !== confirmPassword) {
      showError2();
      return;
    }

    try { 
        // 1. Cria a conta do usuário
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Atualiza o perfil do Firebase com Nome + Sobrenome
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        });

        // 3. Salva os dados de acesso
        localStorage.setItem("token", user.accessToken);
        
        // Salvamos o currentUser atualizado (com o displayName preenchido) no localStorage
        localStorage.setItem("user", JSON.stringify(auth.currentUser)); 
        
        setLoggedIn(true);
        showSucess();
        
    } catch (error) {
        console.error(error);
        showError(error);
    }
  };

  return (
    <div className={`container ${theme}`}>
      <div className={`container-login ${theme}`}>
        <div className={`wrap-login ${theme}`}>
          <button onClick={toggleTheme} className="toggle-theme-btn">
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>
          <form className="login-form">
            <span className={`login-form-title ${theme}`}> Cadastrar-se </span>

            <span className={`login-form-title ${theme}`}>
              <img className="mascote" src={img} alt="Mascote" />
            </span>

            {/* --- NOVO CAMPO: NOME --- */}
            <div className={`wrap-input ${theme}`}>
              <input
                className={firstName !== "" ? `has-val input ${theme}` : `input ${theme}`}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className={`focus-input ${theme}`} data-placeholder="Nome"></span>
            </div>

            {/* --- NOVO CAMPO: SOBRENOME --- */}
            <div className={`wrap-input ${theme}`}>
              <input
                className={lastName !== "" ? `has-val input ${theme}` : `input ${theme}`}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className={`focus-input ${theme}`} data-placeholder="Sobrenome"></span>
            </div>

            <div className={`wrap-input ${theme}`}>
              <input
                className={email !== "" ? `has-val input ${theme}` : `input ${theme}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={`focus-input ${theme}`} data-placeholder="Email"></span>
            </div>

            <div className={`wrap-input ${theme}`}>
              <input
                className={password !== "" ? `has-val input ${theme}` : `input ${theme}`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={`focus-input ${theme}`} data-placeholder="Senha"></span>
              <button
                type="button"
                className={`show-password-button ${theme}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye/> : <EyeOff/>}
              </button>
            </div>
            
            <div className={`wrap-input ${theme}`}>
              <input
                className={confirmPassword !== "" ? `has-val input ${theme}` : `input ${theme}`}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className={`focus-input ${theme}`} data-placeholder="Confirme sua senha"></span>
              <button
                type="button"
                className={`show-password-button ${theme}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye/> : <EyeOff/>}
              </button>
            </div>

            <div className="container-login-form-btn">
              <button
                className="login-form-btn"
                type="button"
                onClick={handleSignup}
              >
                Criar
              </button>
            </div>

            <div className="text-center">
              <span className={`txt1 ${theme}`}>Já possui uma conta? </span>
              <Link className={`txt2 ${theme}`} to="/login"> 
                Logar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;