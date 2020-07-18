import React from 'react';
import { 
  CardHeader,
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle 
} from 'reactstrap';
import  { Radar, Line} from 'react-chartjs-2';
import axios from 'axios';

export default class Dashboards extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: []
    }
  }
  fetchData = () => {
    axios.get('http://localhost:8000/api/status/')
        .then(res => {
          this.setState({
            chartData: res.data
          });
        })
        .catch(err => console.error(err))
  };
  componentDidMount(){
    this.fetchData();
  }
  render(){
    const Charting = {
      data: canvas => {
      let ctx = canvas.getContext("2d");
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
  
      return {
        labels: this.state.chartData.map(d => d.location),
        datasets: [
          {
            label: "Price Prediction",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.state.chartData.map(d => parseFloat(d.price)*1000)
          }
        ]
      };
      }
    }
    return(
      <div className="container-fluid">
        <Row>
            <Col lg="6">
              <Card className="mt-3">
                <CardHeader className="bg-dark text-white">
                  <CardTitle tag="h4">Line Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <p>This Plot is for Predicted Price by Machine learning Model</p>
                  <hr/>
                  <Line data={Charting.data} options={{
                      maintainAspectRatio: true,
                      legend: {
                        display: true
                      },
                      tooltips: {
                        backgroundColor: "#f5f5f5",
                        titleFontColor: "#333",
                        bodyFontColor: "#666",
                        bodySpacing: 4,
                        xPadding: 12,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest"
                      },
                      responsive: true,
                      scales: {
                        yAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.0)",
                              zeroLineColor: "transparent"
                            },
                            ticks: {
                              suggestedMin: 50,
                              suggestedMax: 125,
                              padding: 20,
                              fontColor: "#9e9e9e",
                              callback: function(value, index, values){
                                return "₹"+value;
                              }
                            }
                          }
                        ],
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: true,
                              color: "rgba(0,242,195,0.1)",
                              zeroLineColor: "transparent"
                            },
                            ticks: {
                              padding: 20,
                              fontColor: "#9e9e9e"
                            }
                          }
                        ]
                      }
                    }}/>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="mt-3">
                <CardHeader className="bg-dark text-white">
                  <CardTitle tag="h4">Radar Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <p>This Plot is for Predicted Price by Machine learning Model</p>
                  <hr/>
                  <Radar data={Charting.data} options={{
                      maintainAspectRatio: true,
                      legend: {
                        display: true
                      },
                      tooltips: {
                        backgroundColor: "#f5e5d5",
                        titleFontColor: "#333",
                        bodyFontColor: "#666",
                        bodySpacing: 4,
                        xPadding: 12,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest"
                      },
                      responsive: true,
                      scales: {
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(0,242,195,0.1)",
                              zeroLineColor: "transparent"
                            },
                            ticks: {
                              padding: 20,
                              fontColor: "#9e9e9e"
                            }
                          }
                        ]
                      }
                    }}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <footer>
            <Card>
              <CardBody className="text-center text-primary">
                <p>Welcome to Irshad Machine learning Services</p>
                  <p>© Copyright { new Date().getUTCDate() }/{ new Date().getUTCMonth() }/{ new Date().getFullYear() }.</p>
                </CardBody>
            </Card>
          </footer>
      </div>
    )
  }
}