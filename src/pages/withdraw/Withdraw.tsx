import api from "../../services/api"
import { useState, type FormEvent } from "react"
import bank from "../../assets/bank.png"
import "./Withdraw.css"
import { useNavigate } from "react-router-dom";

function Deposit() {

    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/transaction/withdraw", null, {
                params: {
                    amount:amount
                }
            })
            const id = response.data.id;
            navigate("/myBankAccount/transactionDetails", {
                state:{
                    idTransaction:id
                }
            })
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message)
        }
    }

    return (
        <>
            <div className="container">
                <div className="left-side">
                    <div className="withdraw-form">
                        <h1>Depositar</h1>
                        <form className="" onSubmit={handleSubmit}>
                            <label>Saque a quantidade desejada:</label>
                            <input placeholder="Insira a quantidade" onChange={e => setAmount(Number(e.target.value))}></input>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                            <button type="submit">Sacar</button>
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

export default Deposit;