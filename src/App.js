import './App.css';
import React, { useState } from 'react';
const test = [
  {
    id:0,
    image:'./images/pizza.jpg',
    name: 'Margherita Pizza',
    ingredients: 'Tomato, Mozzarella, Basil',
    price: '10DT'
  },
  {
    id:1,
    image:'./images/salad.jpg',
    name: 'Caesar Salad',
    ingredients: 'Romaine, Parmesan, Croutons, Caesar Dressing',
    price: '8,500DT'
  },
  {
    id:2,
    image:'./images/spagetti.jpg',
    name: 'Spaghetti Carbonara',
    ingredients: 'Spaghetti, Eggs, Pecorino Romano, Pancetta, Pepper',
    price: '6,500DT'
  },
  {
    id:3,
    image:'./images/salmon.jpg',
    name: 'Grilled Salmon',
    ingredients: 'Salmon, Olive Oil, Lemon, Garlic, Dill',
    price: '11,500DT'
  },
  {
    id:4,
    image:'./images/Tiramisu.jpg',
    name: 'Tiramisu',
    ingredients: 'Mascarpone, Espresso, Ladyfingers, Cocoa Powder',
    price: '7,500DT'
  }
];
function App() {
  return (
    <div className="App">
          <div className="background-container"> <h1>NOM DE RESTAUT</h1> </div>
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
          <button >Order</button>
      </div>
      </div>
  );
}
export default App;
