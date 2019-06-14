import React, { Component } from 'react';
import { Container, Row, Col, Nav, Dropdown, InputGroup, FormControl, DropdownButton, Button }  from 'react-bootstrap';
import logo from './logo.svg'
import '../../css/main.css'

class Main extends Component {
      

    render() {
      return (
        <Container className='main'>
          <Row className='header'>
            <Col> <img src={logo} alt='logo' style={{ height: '100px', width: '100px' }} /> </Col>
            <Col xs={5}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">Go</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </Col>
            <Col xs={{ span: 2, offset: 2}}> <Button variant="outline-danger">Sign Out</Button> </Col>
          </Row>         
          <div>  
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Files</Nav.Link>
            <Nav.Link eventKey="link-1">Favorites</Nav.Link>
            <Nav.Link eventKey="link-2">Shared</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Trash
            </Nav.Link>
          </Nav>
          </div>
        </Container>
      );
    }
}

export default Main;