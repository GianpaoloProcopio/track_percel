import { useState} from "react";
import { firestore, auth} from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {corrieri} from './corrieri';

export default function Popup({setIsAddSpedizione, n, c, d}){

    const [numero, setNumero] = useState("");
    const [corriere, setCorriere] = useState("");
    const [corriereValido, setCorriereValido] = useState(false);
    const [descrizione, setDescrizione] = useState("");
    const [suggerimenti, setSuggerimenti] = useState([]);

    function handleClosePopup() {
        document.getElementById("pellicola-popup").classList.remove("active");
        setIsAddSpedizione(false);
    }

    async function addSpedizione() {

        if(numero !== "" && corriere !== "" && descrizione !== ""){
            try {
                // Riferimento alla collezione "spedizioni"
                const spedizioniCollectionRef = collection(firestore, 'spedizioni');
        
                // Aggiungi un nuovo documento alla collezione "spedizioni"
                await addDoc(spedizioniCollectionRef, {
                    numero,
                    corriere,
                    descrizione,
                    userId: auth.currentUser.uid,  // Ottieni l'uid dell'utente autenticato
                    createdAt: serverTimestamp()    // Aggiungi un timestamp server-side
                });
        
                setNumero("");
                setCorriere("");
                setDescrizione("");
                alert("Spedizione salvata");
                handleClosePopup();
            } catch (error) {
                console.error("Errore nell'inserimento della spedizione: " + error);
            }
        }
    }
    


    return(
        <div className="popup">

            <div className="scelte">
                <button className="annulla" onClick={() => {handleClosePopup()}} >Annulla</button>
                <button className="fatto" onClick={() => addSpedizione()} disabled={numero === "" || corriere === "" || !corriereValido}>Fatto</button>
            </div>

            <form >

                <div className="input">
                    <label htmlFor="numero">Numero</label>
                    <input type="text" name="numero" id="numero" placeholder="Richiesto" value={c} onChange={(e) => setNumero(e.target.value)} required/>
                </div>

                <div className="input autocomplete-container">
                    <label htmlFor="corriere">Corriere</label>
                    <input
                        type="text"
                        name="corriere"
                        id="corriere"
                        placeholder="Inizia a digitare..."
                        value={corriere}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCorriere(value);
                            setCorriereValido(false);

                            // Filtra suggerimenti e limita a 10
                            if (value.length > 0) {
                                const filtrati = corrieri
                                    .filter(c => c.toLowerCase().includes(value.toLowerCase()))
                                    .slice(0, 10); // solo i primi 10
                                setSuggerimenti(filtrati);
                            } else {
                                setSuggerimenti([]);
                            }
                        }}
                        autoComplete="off"
                    />
                    {suggerimenti.length > 0 && (
                        <ul className="suggerimenti-list">
                            {suggerimenti.map((s, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setCorriere(s);
                                        setSuggerimenti([]);
                                        setCorriereValido(true);
                                    }}
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="input">
                    <label htmlFor="description">Descrizione</label>
                    <input type="text" name="description" id="description" placeholder="Opzionale" onChange={(e) => setDescrizione(e.target.value)} />
                </div>

                    
            </form>
        </div>
    )
}
