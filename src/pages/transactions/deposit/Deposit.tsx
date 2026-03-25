import api from "../../../services/api"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Deposit() {

    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/transaction/deposit", null, {
                params: {
                    amount: amount
                }
            })
            const id = response.data.id;
            navigate("/myBankAccount/transactionDetails", {
                state: {
                    idTransaction: id
                }
            })
        } catch (error: any) {
            setErrorMessage(error.response.data.message)
        }

    }

    return (
        <>
            <div className="flex">
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 gap-10">
                    <h1 className="font-bold text-3xl">Depositar</h1>

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <label className="text-[1.1rem]">Deposite a quantidade desejada:</label>
                        <input className="border rounded-sm p-1.5 bg-white w-70" placeholder="Insira a quantidade" onChange={e => setAmount(Number(e.target.value))}></input>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button className="border rounded-sm p-1.5 bg-purple-700 hover:bg-purple-800 cursor-pointer w-70" type="submit">Depositar</button>
                    </form>

                    <Link className="border p-1.5 bg-blue-300 hover:bg-blue-400" to={"/myBankAccount"}>Retornar</Link>
                </div>
                <div className="bg-[linear-gradient(rgba(0,0,0,0.3)),url('/assets/bank.png')] bg-cover h-screen w-full 
                shadow-[1rem_0_3rem_rgba(0,0,0,0.5)] flex-1">
                </div>
            </div>
        </>
    )
}

export default Deposit;