import "./UserRegister.css"
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff } from 'lucide-react'
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";
import login from '../../assets/login.png'

function UserRegister() {

    const [fullName, setFullName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [userType, setUserType] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const rememberMe: Boolean = false;

        try {
            if (errorMessage === "Password don't match.") return;

            await api.post("/user/register", {
                fullName,
                cpfCnpj,
                email,
                password,
                userType
            });

            await api.post("/auth/login", {
                email,
                password,
                rememberMe
            });
            navigate("/registerBankAccount");
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            console.log(error.response.data.message);
        }
    }


    useEffect(() => {
        if (password === passwordCheck && password.length !== 0) {
            setErrorMessage("");
        } else if (password !== passwordCheck) {
            setErrorMessage("Password don't match.");
        }
    }, [password, passwordCheck])

    return (
        <>
            <div className="container">
                <div className="right-side">
                    <h1 className="titulo">Registre-se</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label>Nome Completo:</label>
                        <input type="text" onChange={e => setFullName(e.target.value)} />

                        <label>CPF ou CNPJ:</label>
                        <input type="text" onChange={e => setCpfCnpj(e.target.value)} />

                        <label>E-mail:</label>
                        <input type="email" onChange={e => setEmail(e.target.value)} />

                        <label>Senha:</label>
                        <div className="password-input">
                            <input autoComplete="new-password" id="password"
                                type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} />
                            <button type="button" className='hiden-button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Repita sua senha:</label>
                        <input autoComplete="new-password" type={showPassword ? "text" : "password"} onChange={e => setPasswordCheck(e.target.value)} />

                        <label>Tipo de Usuário:</label>
                        <select onChange={e => setUserType(String(e.target.value))}>
                            <option value="user">Usuário Comum</option>
                            <option value="shopkeeper">Usuário Lojista</option>
                        </select>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit" className="register-submit">Registrar</button>
                        <p>Já tem uma conta?<Link to="/"> Login</Link></p>
                    </form>
                </div>
                <div className="left-side">
                    <img className="login-image" src={login}></img>
                </div>
            </div>
        </>
    )
}

export default UserRegister