import { auth } from "../firebase/firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function User(){

    const navigate = useNavigate()

    async function logout() {
        try {
            await signOut(auth);
            navigate("/login")
        } catch (error) {
            console.error("Errore in fase di logout: " + error)
        }
    }

    return(
        <div className="user">
            <button onClick={() => logout()}>LOGUT</button>
        </div>
    )
}