import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Form.css";

export const Form = ({ transactions, setTransactions }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const availableTransactions = await axios.get(
        "http://localhost:4000/transactions",
      );
      const userData = {
        id: availableTransactions.data.length + 1,
        date: new Date().toISOString().split("T")[0],
        description: description,
        category: category,
        amount: amount,
      };

      setDescription("");
      setCategory("");
      setAmount("");
      await axios.post("http://localhost:4000/transactions", userData);
      setTransactions([...transactions, userData]);
    } catch (error) {
      setError("Something went wrong!");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>{error}</span>
      <div>
        <label htmlFor="description">Description:</label>

        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="description"
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          value={category}
          id="category"
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          type="number"
          value={amount}
          id="amount"
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

Form.propTypes = {
  setTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
