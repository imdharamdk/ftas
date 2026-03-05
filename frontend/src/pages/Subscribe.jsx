import { useState } from "react";
import axios from "axios";

export default function Subscribe() {

  const [txid, setTxid] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const submitPayment = async () => {

    if (!txid) {
      alert("Enter transaction ID");
      return;
    }

    try {

      await axios.post(
        "https://ftas-api.onrender.com/api/payment/submit",
        {
          email: user.email,
          txid: txid,
          plan: "monthly"
        }
      );

      alert("Payment submitted. Admin will verify.");

    } catch (err) {

      alert("Payment submit failed");

    }

  };

  return (

    <div style={{padding:"30px"}}>

      <h1>FTAS Subscription</h1>

      <h2>Monthly Plan</h2>
      <p>Price: <b>20 USDT</b></p>

      <hr/>

      <h3>Payment Details</h3>

      <p><b>Binance Pay UID:</b></p>
      <p>64353762</p>

      <p><b>USDT Address (TRC20):</b></p>
      <p>TMSuBJ8gptWXHiCyMDDHXN16PzoQnfQfBC</p>

      <hr/>

      <h3>Submit Transaction ID</h3>

      <input
        type="text"
        placeholder="Enter TxID"
        onChange={(e)=>setTxid(e.target.value)}
      />

      <br/><br/>

      <button onClick={submitPayment}>
        Submit Payment
      </button>

    </div>
  );

}
