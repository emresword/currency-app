import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

function Currency() {
    const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
    const API_KEY = "fca_live_lbhVmLPduC2OWU3jjJ8tgJd75bifSOQOkIhEx3dj";//your api key
  
    const[amount,setAmount]=useState();
    const[fromCurrency,setFromCurrency]=useState('USD')
    const[toCurrency,setToCurrency]=useState('TRY')
    const[result,setResult]=useState(0)

    const exchange=async()=>{
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
        const rate = response.data.data[toCurrency];
        const convertedAmount=amount*rate;
        setResult(convertedAmount.toFixed(2))// (tofixed)Format to 2 decimal places
        console.log(response.data.data);
    }
    return (
        <div className='currency-div'>
           
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} className='currency-input' style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <select onChange={(e)=>setFromCurrency(e.target.value)} className='currency-select' style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option>USD</option>
                    <option>TRY</option>
                    <option>EUR</option>
                </select>
                <FaArrowAltCircleRight className='currency-icon' style={{ fontSize: '24px', color: '#333' }} />
                <select onChange={(e)=>setToCurrency(e.target.value)} className='currency-select' style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option>TRY</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
                <input readOnly={true} value={result}  type='number' className='currency-input' style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                 <button onClick={exchange}>
                    Change
                 </button>
            </div>
        </div>
    );
}

export default Currency;
