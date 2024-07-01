import './Dashboard.css';
import React, { useState,useEffect  } from 'react';
import axios from 'axios';

// Function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const url="http://127.0.0.1:8000/"
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
    const [add, setAdd] = useState(false);
    const [home, setHome] = useState(true);
    const [analysis, setAnalysis] = useState(false);
    const [update, setUpdate] = useState(false);
    const [itemName,setItemName]= useState([]);
    const [menu,setMenu] = useState([]);
    useEffect(() => {
      
      return () => {
        handleHome();
      };
    },[menu]);
    const fetchMenu = async () => {
      
      try {
        const response = await axios.get(url+'api/items/', {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          }
        });
        if (response.status === 200) {
          return response.data || test; 
        } else {
          console.error(`Error: ${response.status}`);
          return  test; 
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        return  test;
      }
    };
    const handleHome=  async () => {
      try {
        const menuData = await fetchMenu();
        setMenu(menuData)
      } catch (error) {
        console.error('Error getting menu data:', error);
      }
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
        const itemWithId2 = menu.find(item => item.id == event.target.value);
        setItemName(itemWithId2)
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
            {home ? <Home menu={menu} handleAdd={handleAdd} handleUpdate={handleUpdate}/> : null}
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
          <li>Ordres</li><br></br>
          <li onClick={props.handleAnalyse}>Analytique</li><br></br>
          <li>Contact</li>
        </ul>
      </div>
    );
  };
  const Home = (props) => {
    const [items, setitems] = useState(props.menu);
  
    useEffect(() => {
      setitems(props.menu); // Update items whenever props.menu changes
    }, [props.menu]); 
    return (
        <div id="Dashmenu">
              {Array.isArray(items) && items.map((item, index) => (
        <Item
          handleUpdate={props.handleUpdate}
          key={index}
          id={item.id}
          pic={item.image}
          name={item.name}
          ingredients={item.ingredients}
          price={item.price}
        />
      ))}
            <div id="addBtn" onClick={props.handleAdd}></div>
        </div>
    );
  }
  
  const Item = (props) => {
    
    const handleDelete = async (e) => {
      console.log("Delete item with id : "+props.id)
      try {
        const response = await axios.delete(`${url}menu/${props.id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          }
        });
    
        console.log('Item deleted successfully:', response.data);
    
        // Optionally, trigger a callback or update state after deletion
        // props.onDeleteSuccess(); // Call a function passed as prop
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred while deleting the item. Please try again.');
      }
    }
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
            <button value={props.id} onClick={props.handleUpdate} className='DashBtns'>Modifier</button>
            <button onClick={handleDelete} value={props.id} className='DashBtns'>Supprimer</button>
            </div>
        </div>
        </div>
    );
  }
  const AddItem = ()=> {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        picture: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, picture: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('picture', formData.picture);
        console.log(csrftoken)
        try {
          const response = await axios.post(url+'menu/', data, {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
            }
          });
    
          if (response.status === 200) {
            alert(response.data.message);
          } else {
            alert(`Error: ${response.data.error}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      };
    return (
        <div>
             
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Details:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Prix:</label>
        <input
          
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="picture">Ajouter Image:</label>
        <input
          type="file"
          id="picture"
          name="picture"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
        </div>
    );
  }
  
  const UpdateItem = (props)=> {
    const [formData, setFormData] = useState({
    name: props.itemName.name,
    ingredients: props.itemName.ingredients,
    price: props.itemName.price,
    picture: props.itemName.image,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    try {
      
      console.log('trying to update item with id :', props.itemName.id);
      
      console.log('with data :', formData);

      const response = await axios.post(`${url}menu/${props.itemName.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrftoken,
        }
      });

      console.log('Item updated successfully:', response.data);

    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred while updating the item. Please try again.');
    }
  };
    return (    
    <div>     
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="ingredients">Details:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Prix:</label>
            <input
              
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="picture">Ajouter Image:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Modifier</button>
        </form>
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