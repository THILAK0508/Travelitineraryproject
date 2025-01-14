import React, { useState, useEffect } from "react";
import "../css/checklist.css";
import Header from "../components/header";
import Footer from "../components/footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Checklist = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  
  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/checklist`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (newItem.trim() !== "") {
      const item = newItem.trim();
      const token = localStorage.getItem('token');
      // Send the new item to the backend
      const response = await fetch(`${API_BASE_URL}/api/checklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setItems((prevItems) => [...prevItems, addedItem.item]); 
        setNewItem(""); 
      } else {
        alert("Error adding item.");
      }
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/checklist/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setItems(items.filter((item) => item._id !== id));
      } else {
        alert("Error removing item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item.");
    }
  };

  return (
    <div className="container">
      <Header />
      <section className="packing-checklist">
      <h2>Create Your Packing List</h2>

      <form onSubmit={handleAddItem}>
        <label htmlFor="item">Add Item:</label>
        <input
          type="text"
          id="item"
          placeholder="e.g., Passport"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          required
        />
        <button type="submit">Add to List</button>
      </form>

    <ul className="packing-list">
      {items.map((item) => (
        <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.item}</span>
          <button 
            onClick={() => handleRemoveItem(item._id)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '10px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
          >
            Remove
          </button>
        </li>
      ))}
      </ul>

      </section>
      <Footer />
    </div>
  );
};

export default Checklist;
