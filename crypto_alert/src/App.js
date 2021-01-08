import React, {
  useState, useEffect, useRef
} from 'react';
import './App.css';
import axios from 'axios';

const Notification = (props) => {
  const newAlert = () => {
    props.setNotification(false);
    props.setEmail('');
    props.setCoin('bitcoin');
    props.setPrice('');
    props.setAlertType('low');
  }
  return (
    <div className="notification">
          <h1>Crypto price alerts</h1>
    <h3>Get notified when coin goes over or below target price.</h3>
      <h3 className="notification-message">We will sent you a notification when {props.coin} goes {props.alertType == 'low' ? 'below' : 'over' } {props.price} €.</h3>
        <button className="low-button" onClick={()=>{newAlert()}}>New alert</button>
    </div>
  )
}

const CoinTable = (props) => {
  useEffect(()=> {
    console.log(props.data)
  },[])
  return (
    <div className="coin-table-container">
      <table>
        <thead>
        <tr>
          <th>Coin</th>
          <th>Price (€)</th>
          <th>Market cap (€)</th>
          <th>High 24h (€)</th>
          <th>Low 24h (€)</th>
        </tr>
        </thead>

        <tbody>
        
         {props.data.map((row)=> {
           return (
             <tr key={row.name}>
               <td><img src={row.image.thumb} alt=""/>{row.name} </td>
               <td>{row.market_data.current_price.eur}</td>
               <td>{row.market_data.market_cap.eur}</td> 
               <td>{row.market_data.high_24h.eur}</td> 
               <td>{row.market_data.low_24h.eur}</td> 
             </tr>
           )
         })}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState('');
  const [coin, setCoin] = useState('bitcoin');
  const [email, setEmail] = useState('');
  const [alertType, setAlertType] = useState('low');
  const [notification, setNotification] = useState(false);

  const onSubmit = (event)=> {
    event.preventDefault();
    if(alertType == 'low') {
      axios.post(`${process.env.REACT_APP_API}/alerts/newLowAlert`, {email: email, alert_price: price, ids: coin } ).then((result) => {
        console.log(result);
      })
    } else {
      axios.post(`${process.env.REACT_APP_API}/alerts/newHighAlert`, {email: email, alert_price: price, ids: coin } ).then((result) => {
        console.log(result);
      })
    }
    setNotification(true);
   }

   function handleChange(event) {
    setPrice(event.target.value.toLowerCase());
  }

  function handleEmailChange(event) {
    setEmail(event.target.value.toLowerCase());
  }

  function handleCoinChange(event) {
    const resu = event.target.value.toLowerCase()
    setCoin(resu);
  }

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins').then(result => {
      console.log(result)
      console.log(process.env)
      setCoins(result.data);
    })
  }, [])


  return (
    <div className="App">
    <div className="blackdiv">
    <div className="main-container">
    {notification ? <Notification price={price} coin={coin} alertType={alertType} setAlertType={setAlertType} setEmail={setEmail} setNotification={setNotification} setPrice={setPrice} setCoin={setCoin} ></Notification> : 
    <div>
    <h1>Crypto price alerts</h1>
    <h3>Get notified when coin goes over or below target price.</h3>
    <form className="main-form" onSubmit={onSubmit}>
      <span>Notify me at     <input type="email" placeholder="youremail@email.com" onChange={handleEmailChange} name="email"/> </span>
  
      <span>as soon as
      <select onChange={handleCoinChange} name="ids">
     {coins.map(coin => {
       return (
           <option value={coin.id} key={coin.name}>{coin.name}</option>
       )
     })}
   </select>
        </span> 

     <span>goes
     <select onChange={(e)=> {setAlertType(e.target.value)}}>
       <option value="low">Below</option>
       <option value="high">Above</option>
     </select>
     </span>
  
   <span> <input type="text" value={price} className="price" placeholder="Target price in €" onChange={handleChange} name="alert_price"/> &nbsp; €.</span>
   <div className="button-container">
     <button className="low-button" type="submit">Create Alert</button>
   </div>
    </form>
    </div>
  }

    </div>
    </div>
    <CoinTable data={coins}></CoinTable>
    </div>
  );
}

export default App;
