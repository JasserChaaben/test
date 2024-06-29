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
    const [add, setAdd] = useState(false);
    const [home, setHome] = useState(true);
    const [analysis, setAnalysis] = useState(false);
    const [update, setUpdate] = useState(false);
    const [itemName,setItemName]= useState('');


    const handleHome= () => {
        
        setHome(true);
        setAnalysis(false);
        setUpdate(false);
        setAdd(false);
    }

    const handleAdd= () => {
        setHome(false);
        setAnalysis(false);
        setUpdate(false);
        setAdd(true);
    }
    
    const handleUpdate= (event) => {
        setHome(false);
        setAnalysis(false);
        setUpdate(true);
        setAdd(false);
        setItemName(event.target.value)
    }
    
    const handleAnalyse= () => {
        setHome(false);
        setAnalysis(true);
        setUpdate(false);
        setAdd(false);
    }
    return (
      <div className="DashApp">
            <div id="right">
            <div className="Dashbackground-container"> <h1 id='DashTitle'>Tableau De Bord</h1> 
            <Navbar handleHome={handleHome} handleAnalyse={handleAnalyse}/></div>
            
            <div id="Dashmenu-box">
            {home ? <Home handleAdd={handleAdd} handleUpdate={handleUpdate}/> : null}
            {add ? <AddItem /> : null}
            {update ? <UpdateItem itemName={itemName}/> : null}
            {analysis ? <Analytique /> : null}
            </div>
            </div>
    <div className="Dashcontent">
    </div>
      </div>
    );
  }
  const Navbar = (props) => {
    return (
      <div className="navbar">
        <ul>
          <li onClick={props.handleHome}>Home</li><br></br>
          <li onClick={props.handleAnalyse}>Analytique</li><br></br>
          <li>About</li><br></br>
          <li>Contact</li>
        </ul>
      </div>
    );
  };
  const Home = (props) => {
    const [items, setitems] = useState(test);
    return (
        <div id="Dashmenu">
            {items.map((item,index) => (<Item  handleUpdate={props.handleUpdate} key={index} pic={item.image} name={item.name} ingredients={item.ingredients} price={item.price}/>))}
            <div id="addBtn" onClick={props.handleAdd}></div>
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
            <button value={props.name} onClick={props.handleUpdate} className='DashBtns'>Modifier</button>
            <button className='DashBtns'>Supprimer</button>
            </div>
        </div>
        </div>
    );
  }
  const AddItem = ()=> {
    return (
        <div>
            Add Item Later 
        </div>
    );
  }
  
  const UpdateItem = (props)=> {
    return (
        <div>
            Update {props.itemName} Later 
        </div>
    );
  }
  const Analytique = ()=> {
    return (
        <div>
            Add Analytique Later 
        </div>
    );
  }
  export default App;