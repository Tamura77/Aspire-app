import axios from 'axios';

export const verifyLogin = (navigate) => {
    return () => {
        const token = sessionStorage.getItem('token');
        axios.post("/admin/login/verify", { "token": token }).catch((e) => {
            navigate("/admin");
        });
    }
}