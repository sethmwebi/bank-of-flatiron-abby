import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "./components/Transaction";
import "./App.css";
import { Form } from "./components/Form";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/transactions`);
        setTransactions(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("error occured");
      }
    };

    fetchTransactions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm),
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div id="app">
      <Form setTransactions={setTransactions} transactions={transactions} />
      <div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by description"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Date</td>
              <td>Description</td>
              <td>Category</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(
              ({ id, date, category, description, amount }) => (
                <Transaction
                  key={id}
                  id={id}
                  category={category}
                  date={date}
                  description={description}
                  amount={amount}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
