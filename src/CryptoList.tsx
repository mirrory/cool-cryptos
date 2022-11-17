import './App.css';
import {useEffect, useState} from 'react';

interface Crypto {
    id?: string,
    name?: string
}

function CryptoList() {
    const [state, setState] = useState([] as Crypto[])
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false", {}).then(
            res => {res.json().then(data => setState(data))}
        )
    }, [])
    return (
        <>
            {state.map( d => <div>{d.name}</div>)} 
        </>
    )
}

export default CryptoList;
