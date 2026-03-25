import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../../services/api'
import { Link } from "react-router-dom";

function TransactionDetails() {

    const location = useLocation();
    const { idTransaction } = location.state;

    const [transactionDate, setTransactionDate] = useState("");
    const [consistency, setConsistency] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [value, setValue] = useState(0);
    const [payerFullName, setPayerFullname] = useState("");
    const [payeeFullName, setPayeeFullname] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const formateConsistency = (consistency: string) => {
        if (consistency === "completed") {
            return "concluída"
        } else {
            "revertida"
        }
    }

    const transactionDateFormated = new Date(transactionDate)
        .toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });

    useEffect(() => {
        try {
            const fetchTransaction = async () => {
                const response = await api.get(`transaction/${idTransaction}`);
                setTransactionDate(response.data.transactionDate);
                setConsistency(response.data.consistency);
                setValue(response.data.value);
                setPayerFullname(response.data.payer.fullName);
                setPayeeFullname(response.data.payee?.fullName);
                setTransactionType(response.data.transactionType);
            }
            fetchTransaction();
            setIsLoading(false);
        } catch (error: any) {
            setErrorMessage(error.response?.data);
        }
    }, [idTransaction])

    return (
        <>
            <div className="flex">
                <div className="flex-1 flex flex-col items-center justify-center gap-10 bg-gray-100">
                    {transactionType === "deposit" && <h1 className="font-bold text-3xl">Comprovante de {transactionType === "deposit" && "depósito"}</h1>}
                    {transactionType === "transfer" && <h1 className="font-bold text-3xl">Comprovante de {transactionType === "transfer" && "transferência"}</h1>}
                    {transactionType === "withdraw" && <h1 className="font-bold text-3xl">Comprovante de {transactionType === "withdraw" && "saque"}</h1>}
                    <div className="">
                        {isLoading && <p>Carregando...</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                        {value &&
                            <ul className="font-bold bg-white">
                                <li className="border rounded-sm p-3 flex justify-center w-80">Nome: {payerFullName}</li>
                                <li className="border rounded-sm p-3 flex justify-center w-80">Valor: R${value}</li>
                                <li className="border rounded-sm p-3 flex justify-center w-80">Data: {transactionDateFormated}</li>
                                {payeeFullName && <li className="border rounded-sm p-3 flex justify-center w-80">Nome do Destinatário: {payeeFullName}</li>}
                                <li className="border rounded-sm p-3 flex justify-center w-80">Status: {formateConsistency(consistency)}</li>
                            </ul>
                        }
                    </div>
                    <Link className="border rounded-sm bg-blue-300 hover:bg-blue-400 p-1.5" to={"/myBankAccount"}>Retornar</Link>
                </div>
                <div className="bg-[linear-gradient(rgba(0,0,0,0.3)),url('/assets/bank.png')] bg-cover h-screen w-full flex-1 shadow-[1rem_0_3rem_rgba(0,0,0,0.5)]">
                </div>
            </div>
        </>
    )
}

export default TransactionDetails;