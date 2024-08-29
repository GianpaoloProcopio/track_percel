import { useState, useRef, useEffect, useCallback } from "react"
import CardSpedizione from "../components/CardSpedizione";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { firestore} from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';


/**
 * all'invio del popup i dati devono essere salvati nel database corrispettivo all'utente
 * modificare il login, affinche ci sia ACCEDI oppure REGISTRATI
 * quando si apre la pagina home, se è loggato, le spedizioni vanno resuperate dal database
 * implementare un AI per suggerire i corrieri in base al numero della spedizione
 */

export default function Home(){
    const [isAddSpedizione, setIsAddSpedizione] = useState(false);
    const [user] = useAuthState(auth);
    const pellicolaRef = useRef(null);
    const [spedizioni, setSpedizioni] = useState([]);

    function handleAddSpedizione() {
        setIsAddSpedizione(true);
        if (pellicolaRef.current) {
            pellicolaRef.current.classList.add("active");
        }
    }

    const getSpedizioni = useCallback(async () => {
        if (!user) return;
        try {
            const spedizioniCollectionRef = collection(firestore, 'spedizioni');
        
            // Crea una query per ottenere solo le spedizioni dell'utente loggato
            const q = query(spedizioniCollectionRef, where('userId', '==', user.uid));
            
            // Esegui la query
            const querySnapshot = await getDocs(q);
            
            // Itera sui documenti e aggiungili all'array spedizioni
            setSpedizioni(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));

            // Ora spedizioni contiene tutte le spedizioni dell'utente loggato
        } catch (error) {
            console.error("Errore nel recupero dei dati: " + error)
        }
    }, [user])


    useEffect( () => {
        if(user){
            getSpedizioni();
        }
    },[user, getSpedizioni])


    return (
        
        <div className="home" id="home">
            <h1>{!user && "SEGUI TUTTE LE TUE SPEDIZIONI"}</h1>
            <p>{!user && "È facilissimo"}</p>

            <section className="spedizioni">
                <h1>Spedizioni</h1>
                {!user ? (
                    <>
                        <p>Iscriviti per poter tracciare le tue spedizioni</p>
                        <Link to="/login"><button>ACCEDI</button></Link>
                        
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-plus add" onClick={() => handleAddSpedizione()}></i>
                        {spedizioni.map((spedizione, index) => (
                            <CardSpedizione
                                key={index}
                                descrizione={spedizione.descrizione}
                                corriere={spedizione.corriere}
                                numero={spedizione.numero}
                            />
                        ))}
                    </>
                )}
            </section>


            {isAddSpedizione && <Popup setIsAddSpedizione={setIsAddSpedizione}/>}

            <div className="pellicola" id="pellicola-popup" ref={pellicolaRef}></div>
        </div>

            
    );
}
