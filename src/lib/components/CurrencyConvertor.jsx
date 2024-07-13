import axios from "axios"
import { useEffect, useState } from "react";
let apikey="853208d88c8d8ea88d0b50e6"
let base_url="https://v6.exchangerate-api.com"


function CurrencyApp(){

  const [currencyCod,setCurrencycod]=useState([]);
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("");
  const [toCurrency,setToCurrency]=useState("");
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [coinValue,setCoinValue]=useState(null);

  useEffect(()=>{
    function currencyCodes(){
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${base_url}/v6/${apikey}/codes`,
        headers: { }
      };
  
      axios.request(config)
      .then((response) => { 
         
        console.log("currencyCod",response.data.supported_codes)
        setCurrencycod(response.data.supported_codes)
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }
    currencyCodes();
  },[])
   
  

  useEffect(()=>{
    	convertCurrency();
  },[fromCurrency, toCurrency])

  function convertCurrency(){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${base_url}/v6/${apikey}/latest/${fromCurrency}`,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      setCoinValue(response.data.conversion_rates[toCurrency]);
      console.log(response.data.conversion_rates[toCurrency])
      // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  }

  useEffect(() => {
    if(coinValue !== null){
      setConvertedAmount((coinValue*amount).toFixed(2));
    }
  },[amount,coinValue])
    
  const handleChange=(event)=>{
    setAmount(event.target.value);
  }

  const handleFromcurChange=(event)=>{
    setFromCurrency(event.target.value);
  }

  const handleTocurChange=(event)=>{
    setToCurrency(event.target.value);
  }

 
    return(
        <div className='w-[100vw] h-[100vh] bg-[#343757] p-[30px] font-roboto'>
            <div className="w-[40%] h-[90vh] bg-white rounded-md shadow-md mx-auto p-2">
              <h1 className='flex justify-center font-bold text-2xl font'>Currency Convertor</h1>
              <div className='flex justify-center mt-6'>
                <img src="/currency.png" alt='currency' className='w-40 h-40'/>
              </div>
              <div className='px-10 pt-4'>
                <div>Amount:</div>
                <input type='number' className='border border-gray-500 rounded pl-2 w-[100%] mt-2 mx-auto h-9' value={amount} onChange={handleChange}/>
              </div>
              <div className='px-10 pt-4'>
                <div>From Currency:</div>
                <select className='border border-gray-500 rounded pl-2 w-[100%] mt-2 mx-auto h-9' onChange={handleFromcurChange}>
                  {currencyCod.map((currency,index)=>(
                    <option key={index} value={currency[0]}>{currency[0]} - {currency[1]}</option>
                    
                  ))}
                </select>
              </div>
              <div className='px-10 pt-4'>
                <div>To Currency:</div>
                <select className='border border-gray-500 rounded pl-2 w-[100%] mt-2 mx-auto h-9' onChange={handleTocurChange}>
                  {currencyCod.map((currency,index)=>(
                    <option key={index} value={currency[0]} selected>{currency[0]} - {currency[1]}</option>
                    
                  ))}
                </select>
              </div>
              <div className='px-10 pt-10'>
                <div className='w-full h-12 bg-blue-400 rounded shadow text-white flex justify-center 
                items-center text-xl'>The value {amount} {fromCurrency} is equals to {convertedAmount} {toCurrency}</div>
              </div>
            </div>
        </div>
    )
}

export const CurrencyConvertor = () => {
  return (
    <CurrencyApp/>
  )
}
