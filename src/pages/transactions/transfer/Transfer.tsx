import type { FormEvent } from "react";
import api from "../../../services/api"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Transaction() {

    const [key, setKey] = useState("");
    const [keyValue, setKeyValue] = useState("");
    const [value, setValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const getUserIdPayee = async (userKey: string) => {
        if (userKey === "cpfCnpj") {
            try {
                const response = await api.get(`/user/findUserByCpfCnpj/${keyValue}`);
                return response.data.id;
            } catch (error: any) {
                setErrorMessage(error.response?.data?.message || "Erro inesperado");
                throw error;
            }
        } else if (userKey === "email") {
            try {
                const response = await api.get(`/user/findUserByEmail/${keyValue}`);
                return response.data.id;
            } catch (error: any) {
                setErrorMessage(error.response?.data?.message || "Erro inesperado");
                throw error;
            }
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        try {
            const idPayee = await getUserIdPayee(key);
            const response = await api.post("/transaction", {
                value,
                idPayee,
                transactionType: "transfer"
            })
            const id = response.data.id;
            navigate("/myBankAccount/transactionDetails", {
                state: {
                    idTransaction: id
                }
            })
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Erro inesperado");
            throw error;
        }

    }

    return (
        <>
            <div className="flex">
                <div className="flex-1 flex flex-col justify-center items-center gap-10 bg-gray-100">
                    <h1 className="font-bold text-3xl">Transferência</h1>
                    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                        <label className="text-[1.1rem]">Chave do Destinatário</label>
                        <select className="border p-2 bg-white w-80" onChange={e => setKey(e.target.value)}>
                            <option disabled selected>Selecione</option>
                            <option value="cpfCnpj">CPF/CNPJ</option>
                            <option value="email">E-mail</option>
                        </select>
                        <input className="border p-1.5 rounded-sm bg-white w-80" placeholder={key && `Insira o ${key}`} onChange={e => setKeyValue(e.target.value)}></input>
                        <label className="text-[1.1rem]">Valor:</label>
                        <input className="border rounded-sm p-1.5 bg-white" placeholder="Insira o valor" onChange={e => setValue(Number(e.target.value))}></input>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button className="border bg-purple-700 hover:bg-purple-800 p-1.5 rounded-sm cursor-pointer mt-3" type="submit">Enviar</button>
                    </form>
                    <Link className="border rounded-sm p-1.5 bg-blue-300 hover:bg-blue-400" to={"/myBankAccount"}>Retornar</Link>

                </div>
                <div className="flex-1 bg-[linear-gradient(rgba(0,0,0,0.3)),url('/assets/bank.png')] bg-cover h-screen w-full shadow-[1rem_0_3rem_rgba(0,0,0,0.3)]">
                </div>
            </div>
        </>
    )
}

export default Transaction;