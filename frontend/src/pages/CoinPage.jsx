import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CoinPage() {

  const { symbol } = useParams();
  const navigate = useNavigate();

  const [coins,setCoins] = useState([]);
  const [signal,setSignal] = useState(null);

  useEffect(()=>{

    loadCoins();
    loadSignal(symbol);
    loadChart(symbol);

  },[symbol]);


  const loadCoins = async ()=>{

    try{

      const res = await axios.get(
        "https://ftas.onrender.com/api/signals"
      );

      setCoins(res.data);

    }catch(err){

      console.log(err);

    }

  };


  const loadSignal = async(sym)=>{

    try{

      const res = await axios.get(
        "https://ftas-api.onrender.com/api/signals/"+sym
      );

      setSignal(res.data);

    }catch(err){

      console.log(err);

    }

  };


  const loadChart=(sym)=>{

    const chart=document.getElementById("chart");

    if(!chart) return;

    chart.innerHTML="";

    const script=document.createElement("script");

    script.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async=true;

    script.innerHTML=JSON.stringify({

      autosize:true,
      symbol:"BINANCE:"+sym,
      interval:"5",
      timezone:"Etc/UTC",
      theme:"dark",
      style:"1",
      locale:"en",
      allow_symbol_change:true

    });

    chart.appendChild(script);

  };


  const openCoin=(coin)=>{

    navigate("/coin/"+coin);

  };


  return(

    <div className="container">

      <div style={{
        display:"grid",
        gridTemplateColumns:"200px 1fr 250px",
        gap:"20px"
      }}>


        {/* COIN LIST */}

        <div>

          <h3>Top Coins</h3>

          <div style={{
            maxHeight:"520px",
            overflowY:"auto"
          }}>

          {coins.map((c,i)=>(

            <div
            key={i}
            className="coin"
            onClick={()=>openCoin(c.symbol)}
            >

            {c.symbol}

            </div>

          ))}

          </div>

        </div>


        {/* CHART */}

        <div>

          <h2>{symbol}</h2>

          <div
          id="chart"
          style={{
            height:"520px",
            width:"100%",
            border:"1px solid #1e293b"
          }}
          ></div>

        </div>


        {/* SIGNAL */}

        <div>

          <h3>Signal</h3>

          {signal && (

          <div className="card">

          <p>Signal: {signal.signal}</p>

          <p>Entry: {signal.entry}</p>

          <p>TP1: {signal.tp1}</p>

          <p>TP2: {signal.tp2}</p>

          <p>SL: {signal.sl}</p>

          </div>

          )}

        </div>


      </div>

    </div>

  );

}

export default CoinPage;
