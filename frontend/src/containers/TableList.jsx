import React from 'react';
import { 
  Row, 
  Card, 
  Col, 
  CardBody, 
  CardHeader, 
  Table, 
  CardTitle 
} from 'reactstrap';
import axios from 'axios';

export default class SimpleTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Data: []
    }
  }
  fetchData = () => {
    axios.get('http://localhost:8000/api/status/')
        .then(res => {
          this.setState({
            Data: res.data
          })
        })
        .catch(err => {
          console.error(err);
        })
  }
  componentDidMount(){
    this.fetchData();
  }
  render(){
    return(
      <div className="container-fluid">
          <Row>
            <Col md="12">
              <Card className="mt-3">
                <CardHeader className="bg-dark text-white">
                  <CardTitle tag="h4" className="text-center">Bangalore House Price Prediction</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Area</th>
                        <th>Bathroom</th>
                        <th>BHK</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.Data.map(dat => <tr key={dat.id}>
                      <td>{dat.name}</td>
                      <td>{dat.location}</td>
                      <td>{dat.total_sqft} sq.ft</td>
                      <td className="text-center">{dat.bath}</td>
                      <td className="text-center">{dat.bhk}</td>
                      <td className="text-center">₹{parseFloat(dat.price)*1000}</td>
                    </tr>)}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    )
  }
}