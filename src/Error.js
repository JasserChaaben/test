import './Error.css';
import React, { Component } from 'react';
class Error extends Component {
    constructor(props) {
      super(props);
      this.state = {
        err:['ERROR']
      };
      this.handleError= this.handleError.bind(this);
    }
    componentDidMount(){
        this.handleError();
    }
    handleError(){
        setTimeout(()=>{
            this.setState((prevState) => {
                const newErr = [...prevState.err, 'ERROR'];
                console.log(newErr);
                return { err: newErr };
              });
        
        this.handleError();
            },1000)
    }
    
    render() {
        const errorElements = [];
      return (
        <div className="Error">
              {this.state.err.map((x, index) => (
              <h1 key={index} className="ERRRRR">{x}</h1>
    ))} 
  
        </div>
      );
    }
  }

  
export default Error;
