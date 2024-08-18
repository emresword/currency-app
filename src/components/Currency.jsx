import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';


function Currency() {
    const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
    const API_KEY = "fca_live_lbhVmLPduC2OWU3jjJ8tgJd75bifSOQOkIhEx3dj";

    const [amount, setAmount] = useState(0); // Initialize amount with 0
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const changeAmount = (event) => {
        const value = parseFloat(event.target.value);
        if (value >= 0) { // Allow 0 as a valid value
            setAmount(value);
        } else {
            console.log("You must enter a positive value.");
        }
    };

    const exchange = async () => {
        try {
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
            const rate = response.data.data[toCurrency];
            if (rate) {
                const convertedAmount = amount * rate;
                setResult(convertedAmount.toFixed(2)); // Format to 2 decimal places
            } else {
                console.error("Currency rate not found.");
                setResult("N/A");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setResult("Error");
        }
    };

    return (
        <div className='currency-div'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                    type='number' 
                    value={amount} 
                    onChange={changeAmount} 
                    className='currency-input' 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
                />
                <select 
                    onChange={(e) => setFromCurrency(e.target.value)} 
                    className='currency-select' 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="USD">USD</option>
                    <option value="TRY">TRY</option>
                    <option value="EUR">EUR</option>
                </select>
                <FaArrowAltCircleRight className='currency-icon' style={{ fontSize: '24px', color: '#333' }} />
                <select 
                    onChange={(e) => setToCurrency(e.target.value)} 
                    className='currency-select' 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <input 
                    readOnly={true} 
                    value={result}  
                    type='number' 
                    className='currency-input' 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
                />
                <button onClick={exchange}>
                    Change
                </button>
            </div>
        </div>
    );
}

export default Currency;
