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
      <div className="DashApp">
            <div id="right">
            <div className="Dashbackground-container"> <h1 id='DashTitle'>Tableau De Bord</h1> 
            <Navbar/></div>
            
            <div id="Dashmenu-box">
            <Menu/>
            </div>
            </div>
    <div className="Dashcontent">
    </div>
      </div>
    );
  }
  const Navbar = () => {
    return (
      <div className="navbar">
        <ul>
          <li>Home</li><br></br>
          <li>About</li><br></br>
          <li>Analytique</li><br></br>
          <li>Contact</li>
        </ul>
      </div>
    );
  };
  const Menu = () => {
    const [items, setitems] = useState(test);
    return (
        <div id="Dashmenu">
            {items.map((item,index) => (<Item key={index} pic={item.image} name={item.name} ingredients={item.ingredients} price={item.price}/>))}
            <div id="addBtn" ></div>
        </div>
    );
  }
  
  const Item = (props) => {
  
    return (
        <div>
          <div id="Dashitem">
            <img id="Dashpicture" src={props.pic}></img>
            <div id="Dashdetails">
            <h3>  {props.name}</h3>
            <h6> {props.ingredients}</h6>
            <h4>{props.price} </h4>
            </div>
            <div id="ItemButtons">
            <button className='DashBtns'>Modifier</button>
            <button className='DashBtns'>Supprimer</button>
            </div>
        </div>
        </div>
    );
  }
  export default App;