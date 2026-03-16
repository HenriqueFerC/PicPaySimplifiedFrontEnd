import type { FormEvent } from "react";
import api from "../../services/api"
import { useState } from "react";
import "./Transaction.css"
import { useNavigate } from "react-router-dom";

function Transaction() {

    const [key, setKey] = useState("");
    const [keyValue, setKeyValue] = useState("");
    const [value, setValue] = useState(0);
    const [idPayee, setIdPayee] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const getUserIdPayee = async (userKey: string) => {
        if (userKey === "cpfCnpj") {
            try {
                const response = await api.get(`/user/findUserByCpfCnpj/${keyValue}`);
                setIdPayee(response.data.id);
                setErrorMessage("");
            } catch (error: any) {
                setErrorMessage(error.response.data.message);
                return;
            }
        } else if (userKey === "email") {
            try {
                const response = await api.get(`/user/findUserByEmail/${keyValue}`);
                setIdPayee(response.data.id);
                setErrorMessage("");
            } catch (error: any) {
                setErrorMessage(error.response.data.message)
                return;
            }
        } else {
            return;
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        getUserIdPayee(key);

        try {
            await api.post("/transaction", {
                value,
                idPayee
            })
        } catch (error: any) {
            setErrorMessage(error.response.data.message)
            return;
        }

        navigate
    }

    return (
        <>
            <h1>Transferência</h1>
            <form className="transaction-form" onSubmit={handleSubmit}>
                <label>Chave do Destinatário</label>
                <select onChange={e => setKey(e.target.value)}>
                    <option disabled selected>Selecione</option>
                    <option value="cpfCnpj">CPF/CNPJ</option>
                    <option value="email">E-mail</option>
                </select>
                <input onChange={e => setKeyValue(e.target.value)}></input>
                <label>Valor:</label>
                <input onChange={e => setValue(Number(e.target.value))}></input>
                <button type="submit">Enviar</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </>
    )
}

export default Transaction;