import type { FormEvent } from "react";
import api from "../../services/api"
import { useState } from "react";
import "./Transaction.css"
import { useNavigate } from "react-router-dom";
import bank from "../../assets/bank.png"

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
                transfer:"transfer"
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
            <div className="container">
                <div className="left-side">
                    <div className="form">
                        <h1 className="title">Transferência</h1>
                        <form className="transaction-form" onSubmit={handleSubmit}>
                            <label>Chave do Destinatário</label>
                            <select onChange={e => setKey(e.target.value)}>
                                <option disabled selected>Selecione</option>
                                <option value="cpfCnpj">CPF/CNPJ</option>
                                <option value="email">E-mail</option>
                            </select>
                            <input placeholder={key && `Insira o ${key}`} onChange={e => setKeyValue(e.target.value)}></input>
                            <label>Valor:</label>
                            <input placeholder="Insira o valor" onChange={e => setValue(Number(e.target.value))}></input>
                            <button type="submit">Enviar</button>
                            {errorMessage && <p>{errorMessage}</p>}
                        </form>
                    </div>
                </div>
                <div className="right-side">
                    <img src={bank} className="bankAccountImage"></img>
                </div>
            </div>
        </>
    )
}

export default Transaction;