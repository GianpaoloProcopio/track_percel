import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardSpedizione({descrizione, corriere, numero}){

    const navigate = useNavigate()
    const [info, setInfo] = useState()
    const [stato, setStato] = useState("")
    const [data, setData] = useState("")
    const statoTranslate = {
        "delivered" : "Consegnato",
        "out_for_delivery" : "Pronto alla consegna",
        "in_transit" : "In transito",
        "info_received" : "Informazioni ricevute"
    }

    function traslateStato (w){
        return statoTranslate[w] || w
    }

    function filterSpedizioni(spedizioni){
        const events = spedizioni.data.data.trackings.flatMap(tracking => tracking.events);
        const seenDates = new Set()
        const seenLocation = new Set()
        const seenStatus = new Set()
        const filteredDati = []

        for (let i = events.length - 1; i >= 0; i--) {
            const s = events[i];
            const dateOnly = s.occurrenceDatetime.split('T')[0];
            const locationOnly = s.location;
            const statusOnly = s.statusMilestone;
        
            if (!seenStatus.has(statusOnly) || !seenLocation.has(locationOnly)) {
                seenDates.add(dateOnly);
                seenLocation.add(locationOnly);
                seenStatus.add(statusOnly);
        
                filteredDati.push({
                    location: s.location,
                    data: s.occurrenceDatetime,
                    stato: traslateStato(s.statusMilestone)
                });
        
                if (statusOnly === "delivered") {
                    break; // Interrompe il ciclo completamente dopo aver aggiunto l'elemento
                }
            }
        }
        console.log(filteredDati)
        return filteredDati
    }
  
    async function getInfo(){
        
        const options = {
            method: 'POST',
            url: '',
            headers: {
              'Content-Type': 'application/json',
              Authorization: '',
              Accept: 'application/json'
            },
            data: {
                "trackingNumber": numero,
                "courierCode": [
                  "brt-it"
                ]
            }
        };

        try {
            const response = await axios.request(options);
            setInfo(filterSpedizioni(response));
            console.log(response);

            const stato = response.data.data.trackings[0].shipment.statusMilestone;
            setStato(stato);

            const data = new Date(response.data.data.trackings[0].events[0].occurrenceDatetime);
            setData(data.getDate() + " " + data.toLocaleDateString('it-IT', { month: 'long' }) + " " + data.getFullYear())
            
        } catch (error) {
            console.error(error);
        }
    }


    const handleSpedizioneClick = () => {
        navigate('/spedizione', { state: {
            descrizione: descrizione,
            trackingNumber: numero,
            corriere: corriere,
            info: info
        } });
    };

    useEffect( () => {
        getInfo();
        // eslint-disable-next-line
    },[])


    return(
        <div className="spedizione" onClick={handleSpedizioneClick}>

            <div className="left">
                <i className="fa-solid fa-box"></i>

                <div className="description">
                    <h3>{descrizione}</h3>
                    <h5>{traslateStato(stato)}</h5>

                    {
                        stato !== "delivered" && (
                            <h6>{data}</h6>
                        )
                    }
                    
                </div>

            </div>

            <div className="right">
                <h3>{corriere}</h3>
            </div>

        </div>
    )
}