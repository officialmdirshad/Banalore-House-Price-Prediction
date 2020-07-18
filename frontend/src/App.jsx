import React from 'react';
import Dashboards from './containers/Dashboard';
import SimpleTable from './containers/TableList';
import PriceForm from './custom/form';
import './App.css';

export default class App extends React.Component{
  render(){
    return(
      <div>
        <p>Tired of shits of life. {this.props}</p>
      </div>
    )
  }
}