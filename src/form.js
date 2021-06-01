import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";

function NewForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [definition, setDefinition] = useState("")
    const [detail, setDetail] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    useEffect(() => {
        API.get("/def_all")
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])
    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }
    const nextStep = () => {
        if (activeStep < data.length - 1) {
            setActiveStep(activeStep + 1)
        }
    }
    const onDefinitionChange = (e) => {
        setDefinition(e.target.value)
    }
    const onDetailChange = (e) => {
        setDetail(e.target.value)
    }
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
                            {loading ? <div>Loading...</div> :
                                <Form>
                                    <Row>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="id">ID</Label>
                                                <Input type="text" value={data[activeStep]._id} id="id" name="id" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="term">Term</Label>
                                                <Input type="text" value={data[activeStep].term} id="term" name="term" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <FormGroup>
                                                    <Label for="category">Category</Label>
                                                    <Input type="select" name="select" id="category">
                                                        <option>{data[activeStep].category}</option>
                                                    </Input>
                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            {/* <FormGroup>
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
                                        </FormGroup> */}
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="question">Question</Label>
                                            <Input type="text" placeholder="Enter your question" id="question" name="question" />
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                    <Row>
                                        <Col lg={12} md={12} sm={12}>
                                            <FormGroup>
                                                <Label for="definition">Definitions</Label>
                                                <div className="var-add">
                                                    <Input type="text" onChange={(e) => onDefinitionChange(e)} value={definition} placeholder="Enter definition" id="definition" name="definition" />
                                                    <Button>+</Button>
                                                </div>
                                                {data[activeStep].definition.length !== 0 &&
                                                    <ul className="quiz-var">
                                                        {data[activeStep].definition.map((res) =>
                                                            <li><span>{res}</span>
                                                                <div className="del-btn">
                                                                    <button>+</button>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} md={12} sm={12}>
                                            <FormGroup>
                                                <Label for="long_ans">Detail</Label>
                                                <textarea rows="4" placeholder="Enter detailed answer" onChange={(e) => onDetailChange(e)} value={detail || data[activeStep].detail} id="long_ans" name="long_ans" className="form-control" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <Label for="short_ans">Short Answer</Label>
                                            <Input type="text" placeholder="Enter short answer" id="short_ans" name="short_ans" />
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                    <Row>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="source">Source</Label>
                                                <Input type="text" value={data[activeStep].source} placeholder="Enter source" id="source" name="source" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="modify_at">Last Modify by</Label>
                                                <Input type="text" name="modify_by" placeholder="Enter your Name" id="modify_by" />
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
                            }
                            <div className="footer-btn">
                                <Button onClick={() => previousStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>
                                <Button onClick={() => nextStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Next</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NewForm;
