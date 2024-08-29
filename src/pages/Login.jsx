import { useState} from "react";
import {auth, googleProvider} from "../firebase/firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email, setEmail] = useState(null);
    const [psw, setPsw] = useState(null);
    const [psw2, setPsw2] = useState(null);
    const navigate = useNavigate()

    function handleToggle(x){
        const container = document.getElementById("container");
        if(x){
            container.classList.add("active");
        }else{
            container.classList.remove("active");
        }
    }

    async function registerEmailPsw(){
        navigate("/home");
        try {
            if(psw === psw2){
                const userCredential = await createUserWithEmailAndPassword(auth, email, psw);
                const user = userCredential.user;
                console.log("Utente registrato con successo:", user);
            }
        } catch (error) {
            console.error("Errore durante la registrazione: " + error)
        }
    }

    async function loginEmailPsw() {
        navigate("/home");
        try {
            await signInWithEmailAndPassword(auth, email, psw)
            console.log("Accesso eseguito")
        } catch (error) {
            console.error("Errore nell'accesso: " + error)
        }
    }

    async function loginGoogle(){
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/home");
        } catch (error) {
            console.error("errore nella fase di autenticazione: " + error)
        }
    }


    
    return(

        <div className="login-page">
            <div className="container-login" id="container">

                <section className="container-form registrati">
                    <form>
                        <h1>Registrati</h1>
                        <div className="social-icons">
                            <i className="fa-brands fa-google icon" onClick={() => loginGoogle()}></i>
                            <i className="fa-brands fa-apple icon"></i>
                        </div>
                        <p>oppure registrati con email e password</p>
                        <input type="email" id="email-r" name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}></input>
                        <input type="password" id="psw-r" name="psw" placeholder="Password" onChange={(e) => {setPsw(e.target.value)}}></input>
                        <input type="password" id="psw2" name="psw2" placeholder="Conferma Password" onChange={(e) => {setPsw2(e.target.value)}}></input>
                        <button onClick={() => {registerEmailPsw()}}>REGISTRATI</button>
                    </form>
                </section>

                <section className="container-form accedi">
                    <form>
                        <h1>Accedi</h1>
                        <div className="social-icons">
                            <i className="fa-brands fa-google icon" onClick={() => loginGoogle()}></i>
                            <i className="fa-brands fa-apple icon"></i>
                        </div>
                        <p>oppure entra con le tue credenziali</p>
                        <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}></input>
                        <input type="password" id="psw" name="psw" placeholder="Password" onChange={(e) => {setPsw(e.target.value)}}></input>
                        <p>Hai dimenticato la <a href="#recuperaPassword">Password</a></p>
                        <button onClick={() => loginEmailPsw()}>ACCEDI</button>
                    </form>
                </section>
        
                <section className="container-toggle">
                    <div className="toggle toggle-registrati">
                        <h1>Benvenuto!</h1>
                        <p>Registrati usando le tue informazioni per accedere alle funzionalità del sito</p>
                        <button className="hidden" id="btn-registrati" onClick={() => {handleToggle(true)}}>REGISTRATI</button>
                    </div>

                    <div className="toggle toggle-accedi">
                        <h1>Bentornato!</h1>
                        <p>Inserisci le tue credenziali per usare tutte le funzionalità del sito</p>
                        <button className="hidden" id="btn-accedi" onClick={() => {handleToggle(false)}}>ACCEDI</button>
                    </div>
                </section>
            </div>
        </div>
    )
}