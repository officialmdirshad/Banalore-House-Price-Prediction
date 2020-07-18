import React from 'react';
import axios from 'axios';


export default class PriceForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            total_sqft: '',
            bath: '',
            bhk: '',
            location: '',
            price: ''
        }
    }
    handleSubmit = async (event) => {
    await axios.post('http://127.0.0.1:8000/api/status/', this.state)
            .then(res => {
                if (res.status===201){
                    console.log(this.state);
                    this.setState({
                    price: parseFloat(res.data.price)*1000
                    })
                    this.forceUpdate();
                }
            })
            .catch(err => console.error(err))
        event.preventDefault();   
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="form-test">
                <div>
                    <label>Name</label>
                    <input 
                    type="text"
                    value={this.state.name}
                    onChange={(event) => this.setState({name: event.target.value})}
                    />
                </div>
                <div>
                    <label>Total Sq. Ft</label>
                    <input 
                    type="text"
                    value={this.state.total_sqft}
                    onChange={(event) => this.setState({total_sqft: event.target.value})}
                    />
                </div>
                <div>
                    <label>Bath</label>
                    <input 
                    type="text"
                    value={this.state.bath}
                    onChange={(event) => this.setState({bath: event.target.value})}
                    />
                </div>
                <div>
                    <label>BHK</label>
                    <input 
                    type="text"
                    value={this.state.bhk}
                    onChange={(event) => this.setState({bhk: event.target.value})}
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input 
                    type="text"
                    value={this.state.location}
                    onChange={(event) => this.setState({location: event.target.value})}
                    />
                </div>
                <div>
                    <button htmltype="submit">Predict Price</button>
                </div>
                <div>
                    <h4>Price: $ {this.state.price}</h4>
                </div>
            </form>
        )
    }
}