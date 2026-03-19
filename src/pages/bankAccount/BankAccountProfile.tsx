import { useEffect, useState } from "react";
import api from '../../services/api'
import '../bankAccount/BankAccountProfile.css'
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";

function BankAccountProfile() {

    const [fullName, setFullName] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBankAccount = async () => {
            const response = await api.get("/bankAccount/myBankAccount")
            setFullName(response.data.userDto.fullName);
            setBalance(response.data.balance);
            console.log(balance);
            console.log(response.data)
        }

        fetchBankAccount();
    }, [])

    useEffect(() => {
        const nameArray = fullName.split(" ");
        setFullName(nameArray[0]);
    }, [fullName])

    return (
        <>
            <div className="bank-profile">
                <div className="user-info">
                    <div>
                        <img src={logo} className="logo"></img>
                    </div>
                    <div>
                        <div className="username">
                            {fullName && <h1>Olá, {fullName}</h1>}
                        </div>
                        <div>
                            {balance && <h2>Saldo: {balance}</h2>}
                        </div>
                    </div>
                    <div>
                        <img src={logo} className="logo"></img>
                    </div>
                </div>
                <div className="bank-options">
                    <div className="buttons">
                        <Link className="bank-functions" to="/myBankAccount/transaction">Realizar Transação</Link>
                        <Link className="bank-functions" to="/myBankAccount/deposit">Depositar</Link>
                        <Link className="bank-functions" to="/myBankAccount/withdraw">Sacar</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankAccountProfile;