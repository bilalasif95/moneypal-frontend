import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";
import Moment from 'moment'
import { BiEdit } from "react-icons/bi";
import { BsX } from "react-icons/bs";


function NewForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [definition, setDefinition] = useState("")
    const [definationArray, setDefinationArray] = useState([])
    const [detail, setDetail] = useState("")
    const [modify_by, setModifyBy] = useState("")
    const [modify_at, setModifyAt] = useState("")
    const [term, setTerm] = useState("")
    const [addForm, setAddForm] = useState(false);
    const [formID, setFormID] = useState('');
    const [category, setCategory] = useState('');
    const [editIndex, setEditIndex] = useState(-1)
    const [editSynonymIndex, setEditSynonymIndex] = useState(-1);
    const [synonym, setSynonym] = useState('')
    const [synonymArray, setSynonymArray] = useState([])


    const [activeStep, setActiveStep] = useState(0)
    const [source, setSource] = useState(data[activeStep] && data[activeStep].source)
    const today = new Date()

    const OnUpdate_Form = () => {
        const updatedName = localStorage.getItem('name')

        const payload = {
            term: term,
            source: source,
            updated_by: updatedName,
            updated_at: today,
            definition: definationArray,
            synonyms: synonymArray,
            category: category,
            detail: detail
        }
        const id = data[activeStep] && data[activeStep]._id;
        API.put(`api/v1/terms/${id}`, payload)
            .then((res) => {

                setSource(res.data.source)
                setTerm(res.data.term)
                setModifyBy(res.data.updated_by)
                setModifyAt(Moment(res.data.updated_at).format("YYYY-MM-DD"))
            })
            .catch(() => {
                setLoading(false)
            })

    }


    useEffect(() => {
        setLoading(true)
        API.get("api/v1/terms")
            .then((res) => {

                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setModifyBy(res.data[activeStep].updated_by)
                setTerm(res.data[activeStep] && res.data[activeStep].term)
                setDefinationArray(res.data[activeStep].definition)
                setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('YYYY-MM-DD'))
                setFormID(res.data[activeStep] && res.data[activeStep]._id)
                setCategory(res.data[activeStep] && res.data[activeStep].category)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [activeStep])


    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
            setSource(data[activeStep].source)
            setDefinationArray(data[activeStep].definition)
        }
    }
    const nextStep = () => {
        setDefinationArray([])

        if (activeStep < data.length - 1) {
            setActiveStep(activeStep + 1)
            setSource(data[activeStep].source)
            setDefinationArray(data[activeStep].definition)
            setTerm(data[activeStep] && data[activeStep].term)
        }
    }

    const onDetailChange = (e) => {
        setDetail(e.target.value)
    }
    const onAddFormhandle = (e) => {
        setAddForm(true)
        setSource('')
        setTerm('')
        setDefinition('')
        setDefinationArray([])
        setSynonymArray([])
        setDetail('')
        setModifyAt('')
        setModifyBy('')
        setCategory('')

    }
    const OnSubmit_Form = () => {


        const payload = {
            term: term,
            synonyms: synonymArray,
            faq_frequency: 0,
            category: category,
            definition: definationArray,
            detail: detail,
            source: source,
            updated_by: modify_by,
            updated_at: today
        }

        API.post(`api/v1/terms`, payload)
            .then(() => {

                setAddForm(false)
            })
            .catch(() => {
                setLoading(false)
            })

    }
    const onBackHandleChange = (e) => {
        setAddForm(false);
    }
    const categoryHandlechange = e => {
        setCategory(e.target.value)
    }
    const onDefinitionChange = (e) => {
        setDefinition(e.target.value)

    }
    const onSynonymsChange = (e) => {
        setSynonym(e.target.value)

    }
    const addDefination = (e) => {
        e.preventDefault();
        if (editIndex >= 0) {
            const some_array = [...definationArray]
            some_array[editIndex] = definition;
            setDefinationArray(some_array)

        }
        else {
            setDefinationArray(prev =>
                prev.concat(definition))

        }

    }
    const addSynonyms = (e) => {
        e.preventDefault();
        if (editSynonymIndex >= 0) {
            const some_array = [...synonymArray]
            some_array[editSynonymIndex] = synonym;
            setSynonymArray(some_array)
        }
        else {
            setSynonymArray(prev =>
                prev.concat(synonym))
        }



    }



    const editDwfActivestep = (e, index) => {
        e.preventDefault();

        setEditIndex(index)


        setDefinition(data[activeStep].definition[index])
    }


    const editsynonymsActivestep = (e, index) => {
        e.preventDefault();

        setEditSynonymIndex(index)


        setSynonym(data[activeStep].synonym[index])
    }



    const onDeleteHandle = (e, index) => {
        e.preventDefault();

        const filterData = definationArray.filter((res, ind) => ind !== index)
        setDefinationArray(filterData)
    }



    return (

        <div className="App">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="form-container">
                            <div className="form-header">
                                {
                                    addForm ? <h2> Add Form</h2> :
                                        <h2> Form</h2>
                                }

                                {
                                    addForm ?
                                        <div className="btn--group">
                                            <Button color="danger" onClick={onBackHandleChange}>Back</Button>

                                        </div>
                                        : (
                                            <div className="btn--group">
                                                <Button color="danger">Delete</Button>
                                                <Button color="primary" onClick={onAddFormhandle}>Add</Button>
                                            </div>
                                        )
                                }
                            </div>
                            {loading ? <div>Loading...</div> :
                                <Form>
                                    <Row>
                                        {!addForm ?
                                            <Col lg={4} md={4} sm={12}>
                                                <FormGroup>
                                                    <Label for="id">ID</Label>
                                                    <Input type="text" value={formID || data[activeStep]._id} id="id" name="id" readOnly />
                                                </FormGroup>
                                            </Col>
                                            : ''
                                        }
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="term">Term</Label>
                                                <Input type="text" value={term} id="term" placeholder="Enter Term" name="term" onChange={e => setTerm(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            <FormGroup>
                                                <FormGroup>
                                                    <Label for="category">Category</Label>
                                                    {
                                                        addForm ?
                                                            <Input type="select" name="select" id="category" value={category} onChange={categoryHandlechange}>
                                                                <option>Select Category</option>
                                                                <option>Takaful</option>

                                                            </Input>
                                                            :
                                                            <Input type="select" name="select" id="category" value={category}>
                                                                <option>{category || data[activeStep].category}</option>
                                                            </Input>

                                                    }

                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} md={12} sm={12}>
                                            <FormGroup>
                                                <Label for="definition">Definitions</Label>
                                                <div className="var-add">
                                                    <Input type="text" onChange={(e) => onDefinitionChange(e)} value={definition} placeholder="Enter definition" id="definition" name="definition" />
                                                    <Button onClick={(e) => addDefination(e)}>+</Button>
                                                </div>
                                                {definationArray.length !== 0 &&
                                                    <ul className="quiz-var">
                                                        {definationArray.map((res, index) =>
                                                            <li key={index}><span>{res}</span>
                                                                <button className="del-btn edit">
                                                                    <BiEdit onClick={(e) => editDwfActivestep(e, index)} />
                                                                </button>
                                                                <button className="del-btn del">
                                                                    <BsX onClick={(e) => onDeleteHandle(e, index)} />
                                                                </button>


                                                            </li>
                                                        )}
                                                    </ul>}
                                            </FormGroup>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col lg={12} md={12} sm={12}>
                                            <FormGroup>
                                                <Label for="definition">Synonyms</Label>
                                                <div className="var-add">
                                                    <Input type="text" onChange={(e) => onSynonymsChange(e)} value={synonym} placeholder="Enter Synonyms" id="definition" name="definition" />
                                                    <Button onClick={(e) => addSynonyms(e)}>+</Button>
                                                </div>
                                                {synonymArray &&
                                                    <ul className="quiz-var">
                                                        {synonymArray && synonymArray.map((res, index) =>
                                                            <li key={index}><span>{res}</span>
                                                                <button className="del-btn edit">
                                                                    <BiEdit onClick={(e) => editsynonymsActivestep(e, index)} />
                                                                </button>
                                                                <button className="del-btn del">
                                                                    <BsX onClick={(e) => onsynonymsDeleteHandle(e, index)} />
                                                                </button>


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
                                                <textarea rows="4" placeholder="Enter detailed answer" onChange={(e) => onDetailChange(e)} value={detail} id="long_ans" name="long_ans" className="form-control" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
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

                                                {addForm ?
                                                    <Input type="text" name="modify_by" value={modify_by} placeholder="Enter your Name" onChange={e => setModifyBy(e.target.value)}
                                                        id="modify_by" />
                                                    :
                                                    <Input type="text" name="modify_by" value={modify_by} placeholder="Enter your Name" onChange={e => setModifyBy(e.target.value)}
                                                        id="modify_by" readOnly />
                                                }


                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={4} sm={12}>
                                            {
                                                addForm ?
                                                    ''
                                                    :
                                                    <FormGroup>
                                                        <Label for="modify_at">Last Modify at</Label>

                                                        <Input type="date" name="modify_at" value={modify_at} id="modify_at" onChange={e => setModifyAt(e.target.value)} readOnly />




                                                    </FormGroup>
                                            }
                                        </Col>
                                    </Row>
                                </Form>
                            }
                            <div className="footer-btn">
                                {
                                    addForm ?
                                        ''
                                        :
                                        <Button onClick={() => previousStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>
                                }

                                {
                                    addForm ?
                                        <Button onClick={() => OnSubmit_Form()} className="btn btn--radius btn--blue" color="primary" type="submit">Submit</Button>
                                        :
                                        <Button onClick={() => OnUpdate_Form()} className="btn btn--radius btn--blue" color="primary" type="submit">Update</Button>

                                }

                                {
                                    addForm ? '' :
                                        <Button onClick={() => nextStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Next</Button>

                                }

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NewForm;
