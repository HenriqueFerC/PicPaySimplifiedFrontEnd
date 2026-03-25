import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import RegisterBankACcount from "./pages/bankAccount/RegisterBankAccount";
import BankAccountProfile from "./pages/bankAccount/BankAccountProfile";
import Transaction from "./pages/transactions/transfer/Transfer";
import TransactionDetails from "./pages/transactions/TransactionDetails";
import Deposit from "./pages/transactions/deposit/Deposit";
import Withdraw from "./pages/transactions/withdraw/Withdraw";
import BankExtract from "./pages/extract/BankExtract";
import Profile from "./pages/profile/Profile";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<UserLogin />}></Route>
                <Route path="/register" element={<UserRegister />}></Route>
                <Route path="/registerBankAccount" element={<RegisterBankACcount/>}></Route>
                <Route path="/myBankAccount" element={<BankAccountProfile/>}></Route>
                <Route path="/myBankAccount/transfer" element={<Transaction/>}></Route>
                <Route path="/myBankAccount/transactionDetails" element={<TransactionDetails/>}></Route>
                <Route path="/myBankAccount/deposit" element={<Deposit/>}></Route>
                <Route path="/myBankAccount/withdraw" element={<Withdraw/>}></Route>
                <Route path="/myBankAccount/bankExtract" element={<BankExtract/>}></Route>
                <Route path="/myProfile" element={<Profile/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;