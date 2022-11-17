import './App.css';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface Crypto {
    current_price?: number,
    id?: string,
    image?: string,
    market_cap?: number,
    market_cap_change_24h?: number,
    market_cap_change_percentage_24h?: number
    market_cap_rank?: number,
    name?: string,
    price_change_24h?: number,
    price_change_percentage_24h?: number,
    symbol?: string,
    total_volume?: number
}

function CryptoList() {
    const expandAccordionIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
    const [state, setState] = useState([] as Crypto[])
    const [initial, setInitial] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        async function getCoins(){
            fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false", {})
            .then(
                res => {res.json().then(data => setState(data))}
            )
        }
        if (initial) {
            getCoins();
            setInitial(false);   
        }
        const intervalId = setInterval(() => {
            getCoins();
            setLastUpdate(new Date());
          }, 1000 * 60) // Re-run the API fetch every minute
          return () => clearInterval(intervalId)
    }, [state, initial, lastUpdate])

    return (
        <>
            <h2 className='header'>Top 10 Cryptocurrencies by Market Cap</h2>
            <h4 className='header'>Last Updated: {new Intl.DateTimeFormat("en-US", 
            {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric'}).format(lastUpdate)}</h4>
            {state.map( coin => <Accordion className='coin'>
                <AccordionSummary expandIcon={expandAccordionIcon}>
                    <Typography>{coin.market_cap_rank}. <img className='coinImage' alt={coin.name} src={coin.image}></img>&nbsp;{coin.name} ({coin.symbol})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table>
                            <tr><td>Current Price:</td><td>{'$' + coin.current_price?.toLocaleString()}</td></tr>
                            <tr><td>Price Change (Last 24 Hours):</td><td><span className={coin.price_change_24h!! < 0 ? 'negative' : 'positive'}>{'$' + coin.price_change_24h?.toLocaleString()}</span></td></tr>
                            <tr><td>Price Change Percentage (Last 24 Hours):</td><td><span className={coin.price_change_percentage_24h!! < 0 ? 'negative' : 'positive'}>{coin.price_change_percentage_24h}%</span></td></tr>
                            <tr><td>Total Volume:</td><td>{'$' + coin.total_volume?.toLocaleString()}</td></tr>
                            <tr><td>Market Capitalization:</td><td>{'$' + coin.market_cap?.toLocaleString()}</td></tr>
                            <tr><td>Market Cap Change (Last 24 Hours):</td><td><span className={coin.market_cap_change_24h!! < 0 ? 'negative' : 'positive'}>{'$' + coin.market_cap_change_24h?.toLocaleString()}</span></td></tr>
                            <tr><td>Market Cap Change Percentage (Last 24 Hours):</td><td><span className={coin.market_cap_change_percentage_24h!! < 0 ? 'negative' : 'positive'}>{coin.market_cap_change_percentage_24h}%</span></td></tr>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>)}         
        </>
    )
}

export default CryptoList;
