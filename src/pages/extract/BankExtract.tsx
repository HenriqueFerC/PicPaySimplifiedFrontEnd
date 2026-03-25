import { useEffect, useState, type Key, type MouseEventHandler } from "react";
import api from "../../services/api"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface ITransaction {
    id: number,
    consistency: string,
    transactionDate: string,
    value: number,
    transactionType: string,

}

function BankExtract() {

    const [listTransaction, setListTransction] = useState<ITransaction[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const formateDate = (date: string) => {
        const formatedDate = new Date(date)
            .toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
        return formatedDate;
    }

    const formateTransactionType = (transactionType: string) => {
        if (transactionType === "deposit") {
            return "Depósito"
        } else if (transactionType === "transfer") {
            return "Transferência"
        } else {
            return "Saque"
        }
    }

    const formateConsistency = (consistency: string) => {
        if (consistency === "completed") {
            return "concluída"
        } else {
            "revertida"
        }
    }

    useEffect(() => {

        const fetchTransactions = async () => {
            try {

                const response = await api.get("/transaction/myTransactions");
                setListTransction(response.data?.content);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setErrorMessage("Network Error")
            }
        }

        fetchTransactions();
    }, []);


    const handleViewTransactionDetails = async (transactionId: number) => {
        navigate("/myBankAccount/transactionDetails", {
            state: {
                idTransaction: transactionId
            }
        })
    }

    const handleListTransactionBetweenDays = async (optionSelectedValue: number) => {
        const response = await api.get("/transaction/lastTransactions", {
            params: {
                days: optionSelectedValue
            }
        })
        setListTransction(response.data?.content);
    }


    return (
        <>
            <div className="bg-gray-100">
                <div className="flex justify-around mt-5">
                    <Link className="border rounded-sm bg-blue-300 hover:bg-blue-400 p-1.5" to={"/myBankAccount"}>Retornar</Link>
                    <h1 className="font-bold text-3xl">Extrato Bancário</h1>
                    <select className="border rounded-sm bg-white" onChange={e => handleListTransactionBetweenDays(Number(e.target.value))}>
                        <option selected disabled>Filtrar por data</option>
                        <option value={3}>Últimos 3 dias</option>
                        <option value={7}>Últimos 7 dias</option>
                        <option value={14}>Últimos 14 dias</option>
                        <option value={30}>Últimos 30 dias</option>
                    </select>
                </div>

                <div className="grid grid-cols-4 gap-10 mt-30">
                    {isLoading && <p>Carregando...</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                    {listTransaction && listTransaction.map((transaction: ITransaction) => {
                        return (
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center gap-2 border rounded-sm bg-white w-80">
                                    <p className="font-bold text-[1.1rem] mt-2">{formateTransactionType(transaction.transactionType)}</p>
                                    <p className="text-[1.1rem]">Valor: R${transaction.value}</p>
                                    <p className="text-[1.1rem]">Data: {formateDate(transaction.transactionDate)}</p>
                                    <p className="text-[1.1rem]">Transação {formateConsistency(transaction.consistency)}</p>
                                    <button className="cursor-pointer mb-2 border rounded-sm p-1.5 bg-purple-700 hover:bg-purple-800" onClick={() => handleViewTransactionDetails(transaction.id)}>Ver detalhes</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BankExtract;