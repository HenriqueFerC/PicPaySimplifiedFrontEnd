import { useState, type FormEvent } from 'react'
import './UserLogin.css'
import api from '../../services/api'
import { Link } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", {
        email,
        password,
        rememberMe
      })
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      console.log(error);
    }
  }


  return (
    <>
      <div>
        <h1 className="titulo">Projeto PicPaySimplified</h1>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <input className="input-form" type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />

          <div className='password-input'>
            <input className="input-form" type={showPassword ? "text" : "password"} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button type='button' className='hide-button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p>Lembrar de mim<input type="checkbox" onChange={e => setRememberMe(e.target.checked)} /></p>
          {errorMessage && <p className='error'>E-mail ou senha incorretos.</p>}
          <button className="button-submit" type="submit">Login</button>
          <p>Não é cadastrado? <Link to="/register">Registre-se</Link></p>
        </form>
      </div>
    </>
  )
}

export default UserLogin
