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
            const errorsArray = error.response.data.errors;
            setErrorMessage(errorsArray[0]);
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
            <div className="flex">
                <div className="flex-1 flex flex-col gap-10 justify-center items-center bg-gray-100">
                    <h1 className="font-bold text-3xl">Registre-se</h1>
                    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                        <label className="text-[1.1rem]">Nome Completo:</label>
                        <input className="border rounded-md w-80 bg-white p-1.5" type="text" placeholder="Insira seu Nome Completo" onChange={e => setFullName(e.target.value)} />

                        <label className="text-[1.1rem]">CPF ou CNPJ:</label>
                        <input className="border rounded-md w-80 bg-white p-1.5" type="text" placeholder="Insira seu CPF ou CNPJ" onChange={e => setCpfCnpj(e.target.value)} />

                        <label className="text-[1.1rem]">E-mail:</label>
                        <input className="border rounded-md w-80 bg-white p-1.5" type="text" placeholder="Insira seu E-mail" onChange={e => setEmail(e.target.value)} />

                        <label className="text-[1.1rem]">Senha:</label>
                        <div className="relative">
                            <input className="border rounded-md w-80 bg-white p-1.5" autoComplete="new-password" id="password"
                                type={showPassword ? "text" : "password"} placeholder="Insira sua Senha" onChange={e => setPassword(e.target.value)} />
                            <button className='absolute -translate-x-10 translate-y-2 cursor-pointer' type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Repita sua senha:</label>
                        <input className="border rounded-md w-80 bg-white p-1.5" autoComplete="new-password" type={showPassword ? "text" : "password"} placeholder="Repita sua Senha" onChange={e => setPasswordCheck(e.target.value)} />

                        <label>Tipo de Usuário:</label>
                        <select className="border rounded-md w-80 bg-white p-2 cursor-pointer" onChange={e => setUserType(String(e.target.value))}>
                            <option value="user">Usuário Comum</option>
                            <option value="shopkeeper">Usuário Lojista</option>
                        </select>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button className="border rounded-md w-80 bg-purple-700 hover:bg-purple-800 cursor-pointer p-1.5" type="submit">Registrar</button>
                        <p>Já tem uma conta?<Link className="text-purple-800" to="/login"> Login</Link></p>
                    </form>
                </div>
                <div className="bg-[linear-gradient(rgba(0,0,0,0.3)),url('/assets/login.png')] bg-cover h-screen w-full flex-1 shadow-[1rem_0_3rem_rgba(0,0,0,0.5)]">
                </div>
            </div>
        </>
    )
}

export default UserRegister