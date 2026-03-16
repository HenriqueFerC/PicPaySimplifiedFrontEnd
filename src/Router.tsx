import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import RegisterBankACcount from "./pages/bankAccount/RegisterBankAccount";
import BankAccountProfile from "./pages/bankAccount/BankAccountProfile";
import Transaction from "./pages/transactions/Transaction";
import TransactionDetails from "./pages/transactions/TransactionDetails";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLogin />}></Route>
                <Route path="/register" element={<UserRegister />}></Route>
                <Route path="/registerBankAccount" element={<RegisterBankACcount/>}></Route>
                <Route path="/myBankAccount" element={<BankAccountProfile/>}></Route>
                <Route path="/myBankAccount/transaction" element={<Transaction/>}></Route>
                <Route path="/myBankAccount/transactionDetails" element={<TransactionDetails/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;