import "./UserRegister.css"
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff } from 'lucide-react'
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {

    const [fullName, setFullName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [typeUser, setTypeUser] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/user/register", {
                fullName,
                cpfCnpj,
                email,
                password,
                typeUser
            })
            navigate("/");
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            console.log(error.response.data.message);
        }
    }


    useEffect(() => {
        if (password === passwordCheck && password.length !== 0) {
            setDisableButton(false);
            setErrorMessage("");
        } else if (password !== passwordCheck) {
            setErrorMessage("Password don't match.");
            setDisableButton(true);
        }
        else {
            setDisableButton(true);
        }
    }, [password, passwordCheck])

    return (
        <>
            <div className="titulo">
                <h1 className="letreiro">
                    Página de registro
                </h1>
            </div>
            <div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>Nome Completo</label>
                    <input type="text" onChange={e => setFullName(e.target.value)} />

                    <label>CPF ou CNPJ</label>
                    <input type="text" onChange={e => setCpfCnpj(e.target.value)} />

                    <label>E-mail</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} />

                    <label>Senha</label>
                    <div className="password-input">
                        <input id="password"
                            type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} />
                        <button type="button" className='hide-button' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <label>Repita sua senha</label>
                    <input type={showPassword ? "text" : "password"} onChange={e => setPasswordCheck(e.target.value)} />

                    <select onChange={e => setTypeUser(String(e.target.value))}>
                        <option value="user">Usuário Comum</option>
                        <option value="shopkeeper">Usuário Lojista</option>
                    </select>
                    <p>Já tem uma conta?<Link to="/"> Login</Link></p>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button disabled={disableButton} type="submit">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default UserRegister