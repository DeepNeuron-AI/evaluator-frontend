import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import {Dashboard} from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import './css/Uploader.css';
import {Col, Row} from 'reactstrap';

const Uppy = require('@uppy/core')

class Uploader extends React.Component {
  constructor(props) {
    super(props)

    // Initialise prop for later adding of base64 image
    this.state = {
      results: ""
    }

    // Initialise uploader, only allow one image and restrict file types
    this.uppy = Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        autoProceed: true,
        allowedFileTypes: ['image/*']
      }
    })

    // When upload is pushed
    this.uppy.on("complete", () => {
      // Send the file as a post request to the back end
      let files = this.uppy.getFiles();

      var form = new FormData();
      form.append("image", files[0].data);

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/malaria",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      }

      // Store the reference to the component so it can be called in the ajax
      let that = this
      let prev = (that.state.results) === "" ? "" : that.state.results + "\n"

      // Send request
      $.ajax(settings).done(function(response) {
        // Update image
        let json = JSON.parse(response)
        that.setState({
          results: prev + json.filename + ": " + json.prediction
        });
        console.log(that.state);

        that.uppy.cancelAll()
      });
    })
  }

  componentWillUnmount() {
    this.uppy.close()
  }

  render() {
    return (<div>
      <Row>
        <Col xs={{
            size: 10,
            offset: 1
          }} md={{
            size: 6,
            offset: 0
          }} style={{
            paddingBottom: 20
          }}>
          <Dashboard uppy={this.uppy} width="100%" height={"400px"}/>
        </Col>
        <Col xs={{
            size: 10,
            offset: 1
          }} md={{
            size: 6,
            offset: 0
          }}>
          {/* White border */}
          <div className="uppy-Dashboard-inner" style={{
              height: "400px"
            }}>
            {/* Use table to centre image */}
            <table className="output">
              <tbody>
                <tr>
                  <td>
                    {
                      (this.state.results === "")
                        ? (
                        // Render instructions as placeholder
                        <txt>
                          Use the uploader to the left to<br/>
                          send an image to the model.<br/><br/>
                          The output will appear in this window.<br/><br/>
                          <a href="/sample.zip" download="">Sample Images</a>
                        </txt>)
                        : (
                        // Render output in its place
                        <Col>
                          <p>{this.state.results}</p>
                        </Col>
                        )
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>)
  }
}

export default Uploader;