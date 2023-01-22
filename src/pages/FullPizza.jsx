import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get('https://63abe7eafdc006ba6068ad16.mockapi.io/items/' + id);
        setPizza(data);
      } catch (e) {
        alert(e);
        navigate('/');
      }
    };
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
};

export default FullPizza;
