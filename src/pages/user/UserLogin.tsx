import { useState, type FormEvent } from 'react'
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        rememberMe
      })
      setErrorMessage("");
      const status = response.status;
      if (status === 200) {
        navigate("/myBankAccount")
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message)
      console.log(error);
    }
  }


  return (
    <>
      <div className='flex'>
        <div className="bg-[linear-gradient(rgba(0,0,0,0.3)),url('/assets/login.png')] bg-cover h-screen w-full flex-1 shadow-[1rem_0_3rem_rgba(0,0,0,0.5)] relative z-10"> 
        </div>
        <div className='flex-1 flex flex-col justify-center items-center gap-10 bg-gray-100'> 
          <div>
            <h1 className="font-bold text-3xl">Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className="text-[1.1rem]">E-mail</label>
              <input className="border w-80 rounded-md bg-white p-1.5" type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />

              <label className="text-[1.1rem]">Password</label>
              <div className='relative'>
                <input  className="border w-80 rounded-md bg-white p-1.5" autoComplete="new-password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button type='button' className='absolute mr-100 -translate-x-11 translate-y-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <p>Lembrar de mim <input type="checkbox" className='cursor-pointer translate-y-0.5 mt-5 mb-5' onChange={e => setRememberMe(e.target.checked)} /></p>
              {errorMessage && <p className='text-red-500'>E-mail ou senha incorretos.</p>}
              <button className="border w-80 bg-purple-700 cursor-pointer hover:bg-purple-800 p-1.5 rounded-md" type="submit">Login</button>
              <p className='mt-3'>Não é cadastrado? <Link to="/register" className='text-purple-800'>Registre-se</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLogin
