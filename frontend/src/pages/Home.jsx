import { Link } from "react-router-dom";
import NewsFeed from "../components/NewsFeed";

function Home() {

  return (

    <div className="container">

      {/* HERO */}

      <div style={{padding:"60px 0"}}>

        <h1>FTAS</h1>

        <h3>Fintech Automated Solutions</h3>

        <p>Advanced Crypto Futures Signal Platform</p>

        <div style={{marginTop:"20px"}}>

          <Link to="/signup">
            <button className="btn">
              Start Free Trial
            </button>
          </Link>

        </div>

      </div>



      {/* FEATURES */}

      <div style={{marginTop:"40px"}}>

        <h3>Platform Features</h3>

        <ul>

          <li>Binance Futures Signals</li>

          <li>Top Volume Trading Coins Scanner</li>

          <li>EMA + RSI Signal Strategy</li>

          <li>Crypto Market News</li>

          <li>Professional Trading Dashboard</li>

        </ul>

      </div>



      {/* NEWS */}

      <div style={{marginTop:"60px"}}>

        <h2>Crypto Market News</h2>

        <NewsFeed />

      </div>

    </div>

  );

}

export default Home;
