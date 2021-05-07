import React, { useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";

function NewForm() {
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
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <Label for="qid">QID</Label>
                                            <Input type="text" placeholder="QID" id="qid" name="qid" readOnly />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input type="select" name="select" id="category">
                                                    <option>Category 1</option>
                                                    <option>Category 2</option>
                                                    <option>Category 3</option>
                                                    <option>Category 4</option>
                                                    <option>Category 5</option>
                                                </Input>
                                            </FormGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={4} sm={12}>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="intent">Intent</Label>
                                                <Input type="select" name="select" id="intent">
                                                    <option>Intent 1</option>
                                                    <option>Intent 2</option>
                                                    <option>Intent 3</option>
                                                    <option>Intent 4</option>
                                                    <option>Intent 5</option>
                                                </Input>
                                            </FormGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="question">Question</Label>
                                            <Input type="text" placeholder="Enter your question" id="question" name="question" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="q_variant">Question Variant</Label>
                                            <div className="var-add">
                                                <Input type="text" placeholder="Enter question variant" id="q_variant" name="q_variant" />
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
                                                <li><span>Lorem ipsum, or lipsum as it is sometimes known.</span>
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
                                            <Label for="long_ans">Long Answer</Label>
                                            <textarea rows="4" placeholder="Enter long answer" id="long_ans" name="long_ans" className="form-control" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="short_ans">Short Answer</Label>
                                            <Input type="text" placeholder="Enter short answer" id="short_ans" name="short_ans" />
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
                                            <Input type="text" name="modify_by" id="modify_by" readOnly />
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

export default NewForm;
