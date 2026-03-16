import { useState, type FormEvent } from "react";
import bank from "../../assets/bank.png"
import "./RegisterBankAccount.css"
import api from "../../services/api"
import { useNavigate } from "react-router-dom";

function RegisterBankACcount() {

    const [agency, setAgency] = useState(0);
    const [accountNumber, setAccountNumber] = useState(0);
    const [balance, setBalance] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/bankAccount/register", {
                agency,
                accountNumber,
                balance
            })
            navigate("/myBankAccount");
        } catch (error: any) {
            setErrorMessage(error.response.data.message)
            console.log(error)
        }
    }

    return (
        <>
            <div className="container">
                <div className="right-side">
                    <h1 className="titulo">Registro de Conta Bancária</h1>
                    <form className="register-bank" onSubmit={handleSubmit}>
                        <label>Agência:</label>
                        <input placeholder="Deve ter 4 números" type="number" onChange={e => setAgency(Number(e.target.value))}></input>
                        <label>Número da conta:</label>
                        <input placeholder="Deve ter 6 números" type="number" onChange={e => setAccountNumber(Number(e.target.value))}></input>
                        <label>Saldo:</label>
                        <input placeholder="Deve ser positivo" type="number" onChange={e => setBalance(Number(e.target.value))}></input>
                        {errorMessage && <p>{errorMessage}</p>}
                        <button>Registrar</button>
                    </form>
                </div>
                <div className="left-side">
                    <img src={bank} className="bankAccountImage"></img>
                </div>
            </div>
        </>
    )
}

export default RegisterBankACcount;