import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLogin />}></Route>
                <Route path="/register" element={<UserRegister />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;