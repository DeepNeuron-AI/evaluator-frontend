// eslint-disable-next-line
import React, {Component} from 'react';
import './css/App.css';
import {Jumbotron, Col, Row} from 'reactstrap';
import Uploader from "./Uploader"

class App extends Component {
  render() {
    return (<div className="App">
      {/* Heading */}
      <Jumbotron>
        <Row>
          <Col md="2" lg="1" xs="0" className="d-none d-md-block">
            <tbody>
              <tr>
                <td>
                  <a href="https://www.deepneuron.org/">
                    <img src="/logo.png" alt="DeepNeuron logo" height="100px"/>
                  </a>
                </td>
              </tr>
            </tbody>
          </Col>
          <Col xs="12" md="10">
            <h1 className="display-3 center d-none d-md-block">
              Malaria Detector
            </h1>
            <h1 className="display-4 center d-md-none">
              Malaria Detector
            </h1>
          </Col>
        </Row>
      </Jumbotron>
      {/* Body */}
      <Row>
        <Col sm="1"/>
        <Col sm="10">
          <Uploader/>
        </Col>
        <Col sm="1"/>
      </Row>
      <Col sm={{
        size: 10,
        offset: 1
      }}>
        <footer>
          <div>
            The model which malaria detector uses was trained using images from&nbsp;
            <a href="https://www.kaggle.com/iarunava/cell-images-for-detecting-malaria">Kaggle</a>
          </div>
          <div>
            The sample images are also from&nbsp;
            <a href="https://www.kaggle.com/iarunava/cell-images-for-detecting-malaria">Kaggle</a>
          </div>
        </footer>
      </Col>
    </div>);
  }
}

export default App;
