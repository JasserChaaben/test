import './Dashboard.css';
import React, { useState } from 'react';
const test = [
    {
      image:'./images/pizza.jpg',
      name: 'Margherita Pizza',
      ingredients: 'Tomato, Mozzarella, Basil',
      price: '10DT'
    },
    {
      image:'./images/salad.jpg',
      name: 'Caesar Salad',
      ingredients: 'Romaine, Parmesan, Croutons, Caesar Dressing',
      price: '8,500DT'
    },
    {
      image:'./images/spagetti.jpg',
      name: 'Spaghetti Carbonara',
      ingredients: 'Spaghetti, Eggs, Pecorino Romano, Pancetta, Pepper',
      price: '6,500DT'
    },
    {
      image:'./images/salmon.jpg',
      name: 'Grilled Salmon',
      ingredients: 'Salmon, Olive Oil, Lemon, Garlic, Dill',
      price: '11,500DT'
    },
    {
      image:'./images/Tiramisu.jpg',
      name: 'Tiramisu',
      ingredients: 'Mascarpone, Espresso, Ladyfingers, Cocoa Powder',
      price: '7,500DT'
    }
  ];
  function App() {
    return (
      <div className="App">
            <div className="background-container"> <h1>Tableau De Bord</h1> </div>
            <div id="menu-box">
            <Menu/>
            </div>
    <div className="content">
    </div>
      </div>
    );
  }
  const Menu = () => {
    const [items, setitems] = useState(test);
    return (
        <div id="menu">
            {items.map((item,index) => (<Item key={index} pic={item.image} name={item.name} ingredients={item.ingredients} price={item.price}/>))}
            <div id="addBtn" ></div>
        </div>
    );
  }
  
  const Item = (props) => {
  
    return (
        <div>
          <div id="item">
            <img id="picture" src={props.pic}></img>
            <div id="details">
            <h3>  {props.name}</h3>
            <h6> {props.ingredients}</h6>
            <h4>{props.price} </h4>
            </div>
            <div id="ItemButtons">
            <button >Modifier</button>
            <button >Supprimer</button>
            </div>
        </div>
        </div>
    );
  }
  export default App;