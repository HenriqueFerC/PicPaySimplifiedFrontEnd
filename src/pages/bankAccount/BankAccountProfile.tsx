import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserRound } from "lucide-react";

function BankAccountProfile() {

    const [fullName, setFullName] = useState("");
    const [balance, setBalance] = useState(0);
    const [openOptions, setOpenOptions] = useState(false);
    const [showBalance, setShowBalance] = useState(false);

    const navigate = useNavigate();

    const handleProfile = () => {
        navigate("/myProfile")
    }

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            navigate("/login");
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchBankAccount = async () => {
            const response = await api.get("/bankAccount/myBankAccount")
            setFullName(response.data.userDto.fullName);
            setBalance(response.data.balance);
        }

        fetchBankAccount();
    }, [])

    useEffect(() => {
        const nameArray = fullName.split(" ");
        setFullName(nameArray[0]);
    }, [fullName])

    return (
        <>
            <div>
                <header className="grid grid-cols-4 bg-gray-300">
                    <div>
                        <div className="bg-[linear-gradient(rgba(0,0,0,0.15)),url('/assets/logo.png')] bg-cover h-50 w-50"></div>
                    </div>
                    <div>
                        <div className="mt-15 text-3xl">
                            {fullName && <h1 className="font-bold">Olá, {fullName}</h1>}
                        </div>
                        <div className="flex">
                            {balance && <h2 className="text-[1.1rem]">Saldo: R${!showBalance && balance.toFixed(2)}{showBalance && '****,**'}</h2>}
                            <button className="cursor-pointer ml-3 translate-y-1" type="button" onClick={() => setShowBalance(!showBalance)}>
                                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end mt-10 relative h-44">
                        <UserRound className="absolute cursor-pointer" onClick={() => setOpenOptions(!openOptions)}></UserRound>
                        {openOptions &&
                            <ul className="mt-10 mb-15 border cursor-pointer">
                                <li className="hover:bg-gray-400 p-1.5" onClick={() => handleProfile()}>Meu perfil</li>
                                <li className="hover:bg-gray-400 p-1.5" onClick={() => handleLogout()}>Logout</li>
                            </ul>
                        }
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-[linear-gradient(rgba(0,0,0,0.15)),url('/assets/logo.png')] bg-cover h-50 w-50"></div>
                    </div>
                </header>
                <div className="bg-purple-700 w-screen h-screen">
                    <div className="grid grid-cols-4">
                        <div className="flex items-center justify-center p-20">
                            <Link className="flex justify-center p-20 w-70 border rounded-sm bg-blue-400 hover:bg-blue-500 font-bold text-[1.3rem]"
                                to="/myBankAccount/transfer">Transferência</Link>
                        </div>
                        <div className="flex items-center justify-center p-20">
                            <Link className="flex justify-center p-20 w-70 border rounded-sm bg-blue-400 hover:bg-blue-500 font-bold text-[1.3rem]"
                                to="/myBankAccount/deposit">Depositar</Link>
                        </div>
                        <div className="flex items-center justify-center p-20">
                            <Link className="flex justify-center p-20 w-70 border rounded-sm bg-blue-400 hover:bg-blue-500 font-bold text-[1.3rem]"
                                to="/myBankAccount/withdraw">Sacar</Link>
                        </div>
                        <div className="flex items-center justify-center p-20">
                            <Link className="flex justify-center p-20 w-70 border rounded-sm bg-blue-400 hover:bg-blue-500 font-bold text-[1.3rem]"
                                to="/myBankAccount/bankExtract">Extrato</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankAccountProfile;