import './App.css';
import {useEffect, useState, useRef} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface Crypto {
    id?: string,
    name?: string,
    total_volume?: number,
    symbol?: string,
    image?: string,
    price_change_percentage_24h?: number,
    market_cap_rank?: number
}

function CryptoList() {
    let expandAccordionIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
    const [state, setState] = useState([] as Crypto[])
    const [initial, setInitial] = useState(true);
    useEffect(() => {
        async function getCoins(){
            fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false", {}).then(
                res => {res.json().then(data => setState(data))}
            )
        }
        if (initial) {
            getCoins()
            setInitial(false);   
        }
        const intervalId = setInterval(() => {
            getCoins()
          }, 1000 * 60) // every minute
          return () => clearInterval(intervalId)
    }, [state, initial])
    return (
        <>
            <h2 className='header'>Top 10 Cryptocurrencies by Market Cap</h2>
            {state.map( coin => <Accordion className='coin'>
                <AccordionSummary expandIcon={expandAccordionIcon}>
                    <Typography>{coin.market_cap_rank}. <img className='coinImage' src={coin.image}></img>&nbsp;{coin.name} ({coin.symbol})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table>
                            <tr><td>Total Volume:</td><td>{coin.total_volume}</td></tr>
                            <tr><td>Price Change Percentage (Last 24 Hours):</td>
                            <td><span className={coin.price_change_percentage_24h!! < 0 ? 'negative' : 'positive'}>{coin.price_change_percentage_24h}%</span></td>
                            </tr>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>)}
            
        </>
    )
}

export default CryptoList;
