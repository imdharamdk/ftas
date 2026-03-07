import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [signals, setSignals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSignals();

    const interval = setInterval(() => {
      loadSignals();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const loadSignals = async () => {

    try {

      const res = await axios.get(
        "https://ftas.onrender.com/api/signals"
      );

      if (Array.isArray(res.data)) {
        setSignals(res.data);
      } else {
        setSignals([]);
      }

    } catch (err) {

      console.log("Signal load error:", err);

      setSignals([]);

    }

  };

  const openMarket = (symbol) => {
    navigate("/coin/" + symbol);
  };

  return (

    <div className="container">

      <h2 style={{ marginBottom: "20px" }}>
        Live Trading Signals
      </h2>

      <table className="signals-table">

        <thead>
          <tr>
            <th>Coin</th>
            <th>Signal</th>
            <th>Entry</th>
            <th>TP1</th>
            <th>TP2</th>
            <th>SL</th>
          </tr>
        </thead>

        <tbody>

          {signals.length === 0 && (
            <tr>
              <td colSpan="6">Loading signals...</td>
            </tr>
          )}

          {signals.map((s, i) => (

            <tr key={i}>

              <td
                className="coin"
                onClick={() => openMarket(s.symbol)}
              >
                {s.symbol || "-"}
              </td>

              <td>{s.signal || "-"}</td>

              <td>
                {s.entry ? Number(s.entry).toFixed(4) : "-"}
              </td>

              <td>
                {s.tp1 ? Number(s.tp1).toFixed(4) : "-"}
              </td>

              <td>
                {s.tp2 ? Number(s.tp2).toFixed(4) : "-"}
              </td>

              <td>
                {s.sl ? Number(s.sl).toFixed(4) : "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Dashboard;