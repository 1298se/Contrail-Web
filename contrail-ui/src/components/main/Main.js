import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg'

class Main extends Component {
      

    render() {
      return (
        <div>
          <div>
            <img src={logo} alt='logo' style={{ height: 100, width: 100 }} />
          </div>
          <div>  
            <Nav justify variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Files</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Favorites</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Shared</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Trash
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      );
    }
}

export default Main;