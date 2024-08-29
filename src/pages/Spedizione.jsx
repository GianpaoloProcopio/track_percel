import { useLocation } from "react-router-dom"

export default function Spedizione () {

    const location = useLocation();
    const {descrizione = "Spedizione", trackingNumber ="Numero non disponibile", corriere = "Corriere", info = []} = location.state || {};

    function getDate(d){
        const data = new Date(d);
        return data.getDate() + " " + data.toLocaleDateString('it-IT', { month: 'long' }) + " " + data.getFullYear()
    }

    function extractLocation(location) {
        return location.replace(/\s*\([^)]*\)/g, '').trim();
    }

    return(
        <div className="location">

            <div className="container">

                <h1>{descrizione}</h1>

                <div className="horizontal">
                    <h3>{trackingNumber}</h3>
                    <h3>{corriere}</h3>
                </div>
                
                <ul>
                    {info && info.length > 1 ? (
                        [...info].reverse().map((x, index) => (
                            <li key={index}>
                                <p className="p-data">{getDate(x.data)}</p>
                                <p className="p-location">{extractLocation(x.location)}</p>
                                <h3>{x.stato}</h3>
                            </li>
                        ))
                    ) : (
                        <p>No locations available.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}
