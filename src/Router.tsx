import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import RegisterBankACcount from "./pages/bankAccount/RegisterBankAccount";
import BankAccountProfile from "./pages/bankAccount/BankAccountProfile";
import Transaction from "./pages/transactions/Transaction";
import TransactionDetails from "./pages/transactions/TransactionDetails";
import Deposit from "./pages/deposit/Deposit";
import Withdraw from "./pages/withdraw/Withdraw";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<UserLogin />}></Route>
                <Route path="/register" element={<UserRegister />}></Route>
                <Route path="/registerBankAccount" element={<RegisterBankACcount/>}></Route>
                <Route path="/myBankAccount" element={<BankAccountProfile/>}></Route>
                <Route path="/myBankAccount/transaction" element={<Transaction/>}></Route>
                <Route path="/myBankAccount/transactionDetails" element={<TransactionDetails/>}></Route>
                <Route path="/myBankAccount/deposit" element={<Deposit/>}></Route>
                <Route path="/myBankAccount/withdraw" element={<Withdraw/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;