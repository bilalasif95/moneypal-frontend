import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";
import Moment from 'moment'

function NewForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [definition, setDefinition] = useState("")
    const [definationArray , setDefinationArray] = useState([])
    const [detail, setDetail] = useState("")
    const [modify_by , setModifyBy] = useState("")
    const [modify_at , setModifyAt] = useState("")
    const [term , setTerm] = useState("")


    

    modify_at
    const [activeStep, setActiveStep] = useState(0)
    const [source , setSource] = useState(data[activeStep] &&  data[activeStep].source)
    const OnUpdate_Form =()=>{
  
        const payload = {
            term: term,
            source: source,
            updated_by: modify_by,
        }
        const id =data[activeStep] && data[activeStep]._id;
        API.put(`api/v1/terms/${id}`,payload)
        .then((res) => {
            console.log("res", res)      
        })
        .catch(() => {
            setLoading(false)
        })

    }
    useEffect(() => {
        API.get("api/v1/terms")
            .then((res) => {
                console.log("formData", res)
                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setModifyBy(res.data[activeStep].updated_by)
                setTerm(data[activeStep] && data[activeStep].term)
                setDefinationArray(res.data[activeStep].definition)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('YYYY-MM-DD'))
                
               
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])
    useEffect(()=>{
       
      
    },[modify_at])
   
    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
            setSource(data[activeStep].source)
            setDefinationArray(data[activeStep].definition)
        }
    }
    const nextStep = () => {
        setDefinationArray([])
        
        if (activeStep < data.length ) {
            setSource(data[activeStep].source)
            setDefinationArray(data[activeStep].definition)
            setActiveStep(activeStep + 1)
        }
    }
    const onDefinitionChange = (e) => {
        setDefinition(e.target.value)
        console.log("defination", definition)
    }
    const addDefination = (e)=>{
        e.preventDefault();
        data[activeStep].definition.push(definition)
        console.log("addData", data[activeStep].definition)
    }
    const onDetailChange = (e) => {
        setDetail(e.target.value)
    }

    // const modifyDate = Moment(modify_at).format('L');
    console.log("term",term )
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
                                             
                                                <Input type="text" value={data[activeStep] && data[activeStep]._id}  id="id" name="id" readOnly />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="term">Term</Label>
                                                <Input type="text" value={term || data[activeStep].term} id="term" name="term" onChange={e => setTerm(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <FormGroup>
                                                    <Label for="category">Category</Label>
                                                    <Input type="select" name="select" id="category">
                                                        <option>{data[activeStep] && data[activeStep].category}</option>
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
                                                    <Button onClick={addDefination}>+</Button>
                                                </div>
                                                {/* {data[activeStep] && data[activeStep].definition &&  data[activeStep].definition[0]} */}
                                                {data[activeStep].definition.length !== 0 &&
                                                    <ul className="quiz-var">
                                                        {data[activeStep] &&  data[activeStep].definition.map((res,index) =>
                                                            <li key={index}><span>{res}</span>
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
                                                <textarea rows="4" placeholder="Enter detailed answer" onChange={(e) => onDetailChange(e)} value={detail || data[activeStep] && data[activeStep].detail} id="long_ans" name="long_ans" className="form-control" />
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
                                     
                                                <Input type="text" value={source} name="source" placeholder="Enter source" id="source" onChange={e => setSource(e.target.value)} name="source" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="modify_at">Last Modify by</Label>
                                                <Input type="text" name="modify_by"  value={modify_by} placeholder="Enter your Name" onChange={e => setModifyBy(e.target.value)}id="modify_by" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="modify_at">Last Modify at</Label>
                             
                                                <Input type="date" name="modify_at"  value={modify_at} id="modify_at" onChange={e => setModifyAt(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            }
                            <div className="footer-btn">
                                <Button onClick={() => previousStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>
                                <Button onClick={()=>OnUpdate_Form()}className="btn btn--radius btn--blue" color="primary" type="submit">Update</Button>
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
