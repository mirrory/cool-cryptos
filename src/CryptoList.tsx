import './App.css';
import {useEffect, useState} from 'react';

interface CryptoAPIResponse {
    data?: Crypto[]
}

interface Crypto {
    id?: string,
    name?: string
}

function CryptoList() {
    const [state, setState] = useState({} as CryptoAPIResponse)
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false", {mode: 'no-cors'}).then(
            res => setState(res.json() as CryptoAPIResponse)
        )
    }, [])
    return (
        <>
            {state["data"]?.map( d => <div>{d.name}</div>)} 
        </>
    )
}

export default CryptoList;
