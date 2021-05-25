import React, { useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";

function DataForm() {
    useEffect(() => {
        API.get("/query")
            .then((res) => {
                console.log(res, "========")
            })
            .catch((err) => {
                console.log(err, "========")
            })
    }, [])
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="form-container">
                            <div className="form-header">
                                <h2>Form</h2>
                                <div className="btn--group">
                                    <Button color="danger">Delete</Button>
                                    <Button color="primary">Add</Button>
                                </div>
                            </div>
                            <Form>
                                <Row>
                                    <Col lg={6} md={6} sm={12}>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input type="select" name="category" id="category">
                                                    <option>Takaful</option>
                                                    <option>Islamic Finance</option>
                                                    <option>Islamic Insurance</option>
                                                    <option>Types of Takaful</option>
                                                </Input>
                                            </FormGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="intent">Intent</Label>
                                                <Input type="text" name="intent" id="intent" />
                                            </FormGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="example"> Examples</Label>
                                            <div className="var-add">
                                                <Input type="text" placeholder="Enter  Example" id="example" name="example" />
                                                <Button>+</Button>
                                            </div>

                                            <ul className="quiz-var">
                                                <li><span>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
                                                typesetting
                                        industry. Lorem ipsum, or lipsum as it is sometimes known.</span>
                                                    <div className="del-btn">
                                                        <button>+</button>
                                                    </div>
                                                </li>
                                                <li><span>Lorem ipsum, or lipsum as it is sometimes known.</span>
                                                    <div className="del-btn">
                                                        <button>+</button>
                                                    </div>
                                                </li>
                                                <li><span>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
                                                typesetting
                                        industry.</span>
                                                    <div className="del-btn">
                                                        <button>+</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="response">Response</Label>
                                            <textarea rows="4" placeholder="Takaful is a type of Islamic insurance wherein members contribute money into a pool system to guarantee each other against loss or damage. Takaful-branded insurance is based on sharia or Islamic religious law, which explains how individuals are responsible to cooperate and protect one another." id="response" name="response" className="form-control" readOnly/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <Label for="source">Source</Label>
                                            <Input type="text" placeholder="Enter source" id="source" name="source" />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <Label for="modify_at">Last Modify by</Label>
                                            <Input type="text" name="modify_by" id="modify_by"/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <Label for="modify_at">Last Modify at</Label>
                                            <Input type="date" name="modify_at" id="modify_at" readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="footer-btn">
                                <Button className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>
                                <Button className="btn btn--radius btn--blue" color="primary" type="submit">Next</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DataForm;
