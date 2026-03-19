import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../../services/api'
import bank from '../../assets/bank.png'
import "./TransactionDetails.css"

function TransactionDetails() {

    const location = useLocation();
    const { idTransaction } = location.state;

    const [transactionDate, setTransactionDate] = useState(Date);
    const [consistency, setConsistency] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [value, setValue] = useState(0);
    const [payerFullName, setPayerFullname] = useState("");
    const [payeeFullName, setPayeeFullname] = useState("");

    const transactionDateFormated = new Date(transactionDate)
        .toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });

    useEffect(() => {
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
    }, [idTransaction])

    return (
        <>
            <div className="container">
                <div className="left-side">
                    <div className="transfer">
                        {transactionType === "deposit" && <h1 className="transfer-title">Comprovante de {transactionType === "deposit" && "depósito"}</h1>}
                        {transactionType === "transfer" && <h1 className="transfer-title">Comprovante de {transactionType === "transfer" && "transferência"}</h1>}
                        {transactionType === "withdraw" && <h1 className="transfer-title">Comprovante de {transactionType === "withdraw" && "saque"}</h1>}
                        {value &&
                            <ul className="list">
                                <li>Nome: {payerFullName}</li>
                                <li>Valor: R${value}</li>
                                <li>Data: {transactionDateFormated}</li>
                                {payeeFullName && <li>Nome do Destinatário: {payeeFullName}</li>}
                                <li>Status: {consistency}</li>
                            </ul>
                        }
                    </div>
                </div>
                <div className="right-side">
                    <img src={bank} className="bankAccountImage"></img>
                </div>
            </div>
        </>
    )
}

export default TransactionDetails;