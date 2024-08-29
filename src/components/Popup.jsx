import { useState} from "react";
import { firestore, auth} from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Popup({setIsAddSpedizione}){

    // eslint-disable-next-line no-unused-vars
    const [numero, setNumero] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [corriere, setCorriere] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [descrizione, setDescrizione] = useState("");

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
                <button className="fatto" onClick={() => addSpedizione()}>Fatto</button>
            </div>

            <form>

                <div className="input">
                    <label htmlFor="numero">Numero</label>
                    <input type="text" name="numero" id="numero" placeholder="Richiesto" onChange={(e) => setNumero(e.target.value)} required/>
                </div>

                <div className="input">

                    <label htmlFor="corriere">Corriere</label>
                    <select name="corriere" id="corriere" value={corriere} onChange={(e) => setCorriere(e.target.value)} required>
                        <option value="" disabled>--/--</option>
                        <option value="dhl">DHL Express</option>
                        <option value="fedex">FedEx</option>
                        <option value="ups">UPS</option>
                        <option value="tnt">TNT Express</option>
                        <option value="usps">USPS</option>
                        <option value="royalmail">Royal Mail</option>
                        <option value="chinapost">China Post</option>
                        <option value="japanpost">Japan Post</option>
                        <option value="canadapost">Canada Post</option>
                        <option value="laposte">La Poste</option>
                        <option value="australiapost">Australia Post</option>
                        <option value="correos">Correos</option>
                        <option value="postnl">PostNL</option>
                        <option value="swisspost">Swiss Post</option>
                        <option value="sagawa">Sagawa Express</option>
                        <option value="yamato">Yamato Transport</option>
                        <option value="aramex">Aramex</option>
                        <option value="gatikwe">Gati-KWE</option>
                        <option value="singpost">SingPost</option>
                        <option value="dhlglobal">DHL Global Forwarding</option>
                        <option value="dhlsc">DHL Supply Chain</option>
                        <option value="zto">ZTO Express</option>
                        <option value="yto">YTO Express</option>
                        <option value="sfexpress">SF Express</option>
                        <option value="jdlogistics">JD Logistics</option>
                        <option value="kuehne">Kuehne + Nagel</option>
                        <option value="ceva">CEVA Logistics</option>
                        <option value="dbschenker">DB Schenker</option>
                        <option value="expeditors">Expeditors</option>
                        <option value="rhenus">Rhenus Logistics</option>
                        <option value="xpologistics">XPO Logistics</option>
                        <option value="panalpina">Panalpina</option>
                        <option value="geodis">Geodis</option>
                        <option value="hanjin">Hanjin Shipping</option>
                        <option value="evergreen">Evergreen Marine</option>
                        <option value="msc">MSC (Mediterranean Shipping Company)</option>
                        <option value="maersk">Maersk Line</option>
                        <option value="cmacgm">CMA CGM</option>
                        <option value="hapaglloyd">Hapag-Lloyd</option>
                        <option value="yangming">Yang Ming Marine Transport Corporation</option>
                        <option value="hyundai">Hyundai Merchant Marine</option>
                        <option value="cosco">Cosco Shipping</option>
                        <option value="porsche">Porsche Logistics</option>
                        <option value="cargill">Cargill</option>
                        <option value="hellmann">Hellmann Worldwide Logistics</option>
                        <option value="bollore">Bolloré Logistics</option>
                        <option value="kwe">Kintetsu World Express</option>
                        <option value="tollgroup">Toll Group</option>
                        <option value="a1express">A1 Express</option>
                        <option value="brt">BRT (Bartolini)</option>
                    </select>
                    
                </div>

                <div className="input">
                    <label htmlFor="description">Descrizione</label>
                    <input type="text" name="description" id="description" placeholder="Opzionale" onChange={(e) => setDescrizione(e.target.value)} />
                </div>

                    
            </form>
        </div>
    )
}