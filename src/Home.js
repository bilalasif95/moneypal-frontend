import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';

function Home(props) {
    const [name, setName] = useState("")
    const { history } = props;
    const handleChange = e => {
        setName(e.target.value)
    };
    const nameStorage = e => {
        localStorage.setItem("name", name)
        history.push("/form")
    }
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="form-container">
                            <div className="HomeContainer">
                            <div className="form-header">
                                <h2>Home</h2>
                            </div>
                            <Form>
                                <Row>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <Label for="source">Enter User Name</Label>
                                            <Input type="text" value={name} name="name" placeholder="Enter Username" id="name" onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="footer-btn">
                                <Button onClick={() => nameStorage()} className="btn btn--radius btn--blue" color="primary" type="submit">Ok</Button>
                            </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
