import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";
import Moment from 'moment';
import { Redirect } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import Pagination from "react-js-pagination";

function DataForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [example, setExample] = useState("")
    const [examplesArray, setExampleArray] = useState([])
    const [response, setResponse] = useState("")
    const [modify_by, setModifyBy] = useState("")
    const [modify_at, setModifyAt] = useState("")
    const [intent, setIntent] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [addForm, setAddForm] = useState(false);
    const [formID, setFormID] = useState('');
    const [category, setCategory] = useState('');
    const [editIndex, setEditIndex] = useState(-1)
    const [activeStep, setActiveStep] = useState(0)
    const [source, setSource] = useState("")
    const [editExample, setEditExample] = useState('')
    const [length, setLength] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [search, setSearch] = useState("")
    const today = new Date()
    const OnUpdate_Form = () => {
        setError("")
        setSuccess("")
        setLoading(true)
        const updatedName = localStorage.getItem('name')
        let payload = {}
        if (response === "") {
            payload = {
                intent: intent,
                source: source,
                updated_by: updatedName,
                updated_at: today,
                examples: examplesArray,
                category: category
            }
        }
        else {
            payload = {
                intent: intent,
                source: source,
                updated_by: updatedName,
                updated_at: today,
                examples: examplesArray,
                category: category,
                response: response
            }
        }
        const id = data[activeStep] && data[activeStep]._id;
        API.put(`api/v1/intent/${id}`, payload)
            .then(() => {
                setSuccess("Record Updated Successfully")
                if (search === "") {
                    API.get("api/v1/intents")
                        .then((res) => {
                            setData(res.data)
                            setLoading(false)
                            setActiveStep(activeStep);
                            setSuccess("")
                            setAddForm(false)
                            setSource(res.data[activeStep].source)
                            setResponse(res.data[activeStep].response)
                            setModifyBy(res.data[activeStep].updated_by)
                            setIntent(res.data[activeStep] && res.data[activeStep].intent)
                            setExampleArray(res.data[activeStep].examples)
                            setLength(res.data.length)
                            setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                            setFormID(res.data[activeStep] && res.data[activeStep]._id)
                            setCategory(res.data[activeStep] && res.data[activeStep].category)
                        })
                        .catch((err) => {
                            setError(err.response.data)
                            setLoading(false)
                        })
                }
                else {
                    API.get(`api/v1/intents?starts_with=${search}`)
                        .then((res) => {
                            setData(res.data)
                            setLoading(false)
                            setActiveStep(activeStep);
                            setSuccess("")
                            setAddForm(false)
                            setSource(res.data[activeStep].source)
                            setResponse(res.data[activeStep].response)
                            setModifyBy(res.data[activeStep].updated_by)
                            setIntent(res.data[activeStep] && res.data[activeStep].intent)
                            setExampleArray(res.data[activeStep].examples)
                            setLength(res.data.length)
                            setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                            setFormID(res.data[activeStep] && res.data[activeStep]._id)
                            setCategory(res.data[activeStep] && res.data[activeStep].category)
                        })
                        .catch((err) => {
                            setError(err.response.data)
                            setLoading(false)
                        })
                }
            })
            .catch((err) => {
                setError(err.response.data)
                setLoading(false)
            })
    }
    const handlePageChange = (e) => {
        setActivePage(e);
        setActiveStep(e - 1)
        setExample("")
        setEditIndex(-1)
    }
    useEffect(() => {
        setLoading(true)
        if (search === "") {
            API.get("api/v1/intents")
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                    setSource(res.data[activeStep].source)
                    setResponse(res.data[activeStep].response)
                    setModifyBy(res.data[activeStep].updated_by)
                    setIntent(res.data[activeStep] && res.data[activeStep].intent)
                    setExampleArray(res.data[activeStep].examples)
                    setLength(res.data.length)
                    setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                    setFormID(res.data[activeStep] && res.data[activeStep]._id)
                    setCategory(res.data[activeStep] && res.data[activeStep].category)
                })
                .catch((err) => {
                    setError(err.response.data)
                    setLoading(false)
                })
        }
        else {
            API.get(`api/v1/intents?starts_with=${search}`)
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                    setSource(res.data[activeStep].source)
                    setResponse(res.data[activeStep].response)
                    setModifyBy(res.data[activeStep].updated_by)
                    setIntent(res.data[activeStep] && res.data[activeStep].intent)
                    setExampleArray(res.data[activeStep].examples)
                    setLength(res.data.length)
                    setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                    setFormID(res.data[activeStep] && res.data[activeStep]._id)
                    setCategory(res.data[activeStep] && res.data[activeStep].category)
                })
                .catch((err) => {
                    setError(err.response.data)
                    setLoading(false)
                })
        }
    }, [activeStep])
    const previousStep = () => {
        setExample("")
        setEditIndex(-1)
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }
    const nextStep = () => {
        setExample("")
        setEditIndex(-1)
        if (activeStep < data.length - 1) {
            setActiveStep(activeStep + 1)
        }
    }
    const onResponseChange = (e) => {
        setResponse(e.target.value)
    }
    const onAddFormhandle = () => {
        setAddForm(true)
        setSource('')
        setError("")
        setSuccess("")
        setIntent('')
        setExample('')
        setExampleArray([])
        setResponse('')
        setModifyAt('')
        setModifyBy(localStorage.getItem('name'))
        setCategory('')
    }
    const OnSubmit_Form = () => {
        setError("")
        setSuccess("")
        setLoading(true)
        let payload = {}
        if (response === "") {
            payload = {
                intent: intent,
                faq_frequency: 0,
                category: category,
                examples: examplesArray,
                source: source,
                updated_by: modify_by,
                updated_at: today
            }
        }
        else {
            payload = {
                intent: intent,
                faq_frequency: 0,
                category: category,
                examples: examplesArray,
                response: response,
                source: source,
                updated_by: modify_by,
                updated_at: today
            }
        }
        API.post(`api/v1/intents`, payload)
            .then(() => {
                setSuccess("Record Created Successfully")
                API.get("api/v1/intents")
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setSuccess("")
                        setAddForm(false)
                        setSource(res.data[activeStep].source)
                        setResponse(res.data[activeStep].response)
                        setModifyBy(res.data[activeStep].updated_by)
                        setIntent(res.data[activeStep] && res.data[activeStep].intent)
                        setExampleArray(res.data[activeStep].examples)
                        setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                        setFormID(res.data[activeStep] && res.data[activeStep]._id)
                        setCategory(res.data[activeStep] && res.data[activeStep].category)
                    })
                    .catch((err) => {
                        setError(err.response.data)
                        setLoading(false)
                    })
            })
            .catch((err) => {
                setError(err.response.data)
                setLoading(false)
            })
    }
    const onBackHandleChange = () => {
        setError("")
        setSuccess("")
        setAddForm(false);
        setExampleArray(data[activeStep].examples)
        setSource(data[activeStep].source)
        setResponse(data[activeStep].response)
        setModifyBy(data[activeStep].updated_by)
        setIntent(data[activeStep] && data[activeStep].intent)
        setModifyAt(Moment(data[activeStep] && data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
        setCategory(data[activeStep] && data[activeStep].category)
    }
    const categoryHandlechange = e => {
        setCategory(e.target.value)
    }
    const onExampleChange = (e) => {
        setExample(e.target.value)
    }
    const onEditExampleChange = (e) => {
        setEditExample(e.target.value)
    }
    const searchText = () => {
        setLoading(true)
        API.get(`api/v1/intents?starts_with=${search}`)
            .then((res) => {
                setActivePage(1);
                setActiveStep(0);
                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setResponse(res.data[activeStep].response)
                setModifyBy(res.data[activeStep].updated_by)
                setIntent(res.data[activeStep] && res.data[activeStep].intent)
                setExampleArray(res.data[activeStep].examples)
                setLength(res.data.length)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                setFormID(res.data[activeStep] && res.data[activeStep]._id)
                setCategory(res.data[activeStep] && res.data[activeStep].category)
            })
            .catch((err) => {
                setError(err.response.data)
                setLoading(false)
            })
    }
    const redirect = () => {
        if (search === "") { }
        else {
            setLoading(true)
            setSearch("")
            API.get("api/v1/intents")
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                    setSource(res.data[activeStep].source)
                    setResponse(res.data[activeStep].response)
                    setModifyBy(res.data[activeStep].updated_by)
                    setIntent(res.data[activeStep] && res.data[activeStep].intent)
                    setExampleArray(res.data[activeStep].examples)
                    setLength(res.data.length)
                    setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                    setFormID(res.data[activeStep] && res.data[activeStep]._id)
                    setCategory(res.data[activeStep] && res.data[activeStep].category)
                })
                .catch((err) => {
                    setError(err.response.data)
                    setLoading(false)
                })
        }
    }
    const tickButton = (e) => {
        e.preventDefault();
        const some_array = [...examplesArray]
        some_array[editIndex] = editExample;
        setExampleArray(some_array)
        setEditIndex(-1)
    }
    const addExample = (e) => {
        e.preventDefault();
        if (example) {
            setExampleArray(prev =>
                prev.concat(example))
            setExample('')
        }
    }
    const editExampleIndex = (e, index) => {
        e.preventDefault();
        setEditIndex(index)
        setEditExample(examplesArray[index])
    }
    const onDeleteHandle = (e, index) => {
        e.preventDefault();
        const filterData = examplesArray.filter((res, ind) => ind !== index)
        setExampleArray(filterData)
    }
    const result = error && Object.keys(error).map(function (key) {
        return [key, error[key]];
    });
    const onDeleteButtonClick = (id) => {
        setLoading(true)
        API.delete(`api/v1/intent/${id}`)
            .then(() => {
                setSuccess("Record Deleted Successfully")
                API.get("api/v1/intents")
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setSuccess("")
                        setSource(res.data[activeStep].source)
                        setResponse(res.data[activeStep].response)
                        setModifyBy(res.data[activeStep].updated_by)
                        setIntent(res.data[activeStep] && res.data[activeStep].intent)
                        setExampleArray(res.data[activeStep].examples)
                        setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                        setFormID(res.data[activeStep] && res.data[activeStep]._id)
                        setCategory(res.data[activeStep] && res.data[activeStep].category)
                    })
                    .catch((err) => {
                        setError(err.response.data)
                        setLoading(false)
                    })
            })
            .catch((err) => {
                setError(err.response.data)
                setLoading(false)
            })
    }
    if (localStorage.getItem('name')) {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="form-container">
                                <div className="form-header">
                                    {addForm ? <h2 className="mt-0">Add Form</h2> : <h2 className="mt-0">Form</h2>}
                                    {addForm ?
                                        <div className="btn--group">
                                            <Button color="danger" disabled={loading} onClick={onBackHandleChange}>Back</Button>
                                        </div>
                                        :
                                        <div className="btn--group">
                                            <div className="input-group">
                                                <div className="form-outline">
                                                    <input id="search-focus" type="search" id="form1" value={search} onChange={e => setSearch(e.target.value)} className="form-control" placeholder="Search..." />
                                                    <Button disabled={loading} className="searchBtn" type="button" onClick={searchText}>
                                                        <i className="fa fa-search"></i>
                                                    </Button>
                                                    <div className="closeBtn">
                                                        <button disabled={loading} className="del-btn del">
                                                            <BsX onClick={redirect} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="deleteBtns">
                                                <Button disabled={loading} color="danger" data-toggle="modal" data-target="#exampleModal1">Delete</Button>
                                                <Button disabled={loading} color="primary" onClick={onAddFormhandle}>Add</Button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {loading ? <div className="custom-loader">
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div> :
                                    <div>
                                        <Form>
                                            <Row>
                                                {!addForm ? <Col lg={4} md={4} sm={12}>
                                                    <FormGroup>
                                                        <Label for="id">ID</Label>
                                                        <Input type="text" value={formID} id="id" name="id" readOnly />
                                                    </FormGroup>
                                                </Col> : ''}
                                                <Col lg={4} md={4} sm={12}>
                                                    <FormGroup>
                                                        <Label for="intent">Intent</Label>
                                                        <Input type="text" value={intent} id="intent" placeholder="Enter Intent" name="intent" onChange={e => setIntent(e.target.value)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={4} md={4} sm={12}>
                                                    <FormGroup>
                                                        <FormGroup>
                                                            <Label for="category">Category</Label>
                                                            {addForm ?
                                                                <Input type="select" name="select" id="category" value={category} onChange={categoryHandlechange}>
                                                                    <option>Select Category</option>
                                                                    <option>Takaful</option>
                                                                </Input>
                                                                :
                                                                <Input type="select" name="select" id="category" value={category} onChange={categoryHandlechange}>
                                                                    <option>{category}</option>
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
                                                        <Label for="example">Examples</Label>
                                                        <div className="var-add">
                                                            <Input type="text" onChange={(e) => onExampleChange(e)} value={example} placeholder="Enter Example" id="example" name="example" />
                                                            <Button onClick={(e) => addExample(e)}>+</Button>
                                                        </div>
                                                        {examplesArray.length !== 0 &&
                                                            <ul className="quiz-var">
                                                                {examplesArray.map((res, index) =>
                                                                    <li key={index}><span className="spaninline">{editIndex === index ? <Input type="text" onChange={(e) => onEditExampleChange(e)} value={editExample} placeholder="Edit Example" id="editExample" name="editExample" /> : res}</span>
                                                                        {editIndex === index ?
                                                                            <button className="del-btn tick">
                                                                                <BsCheck onClick={(e) => tickButton(e)} />
                                                                            </button>
                                                                            :
                                                                            <span>
                                                                                <button className="del-btn edit">
                                                                                    <BiEdit onClick={(e) => editExampleIndex(e, index)} />
                                                                                </button>
                                                                                <button className="del-btn del">
                                                                                    <BsX onClick={(e) => onDeleteHandle(e, index)} />
                                                                                </button>
                                                                            </span>
                                                                        }
                                                                    </li>
                                                                )}
                                                            </ul>}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} md={12} sm={12}>
                                                    <FormGroup>
                                                        <Label for="long_ans">Response</Label>
                                                        <textarea rows="4" placeholder="Enter Response" onChange={(e) => onResponseChange(e)} value={response} id="long_ans" name="long_ans" className="form-control" required={true} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={4} md={4} sm={12}>
                                                    <FormGroup>
                                                        <Label for="source">Source</Label>
                                                        <Input type="text" value={source} name="source" placeholder="Enter Source" id="source" onChange={e => setSource(e.target.value)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={4} md={4} sm={12}>
                                                    <FormGroup>
                                                        <Label for="modify_by">Last Modify by</Label>
                                                        {addForm ?
                                                            <Input type="text" name="modify_by" value={modify_by} id="modify_by" readOnly />
                                                            :
                                                            <Input type="text" name="modify_by" value={modify_by} id="modify_by" readOnly />
                                                        }
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={4} md={4} sm={12}>
                                                    {addForm ? '' :
                                                        <FormGroup>
                                                            <Label for="modify_at">Last Modify at</Label>
                                                            <Input type="text" name="modify_at" value={modify_at} id="modify_at" readOnly />
                                                        </FormGroup>
                                                    }
                                                </Col>
                                            </Row>
                                        </Form>
                                        {!addForm &&
                                            <Pagination
                                                activePage={activePage}
                                                itemsCountPerPage={1}
                                                totalItemsCount={length}
                                                pageRangeDisplayed={10}
                                                onChange={(e) => handlePageChange(e)}
                                            />
                                        }
                                    </div>
                                }
                                {success && <div className="successMessage">{success}</div>}
                                {error && result.map((res) => res.map((response) => <div className="errorMessage">{response}</div>))}
                                <div className="footer-btn">
                                    {addForm ? '' : <Button disabled={loading} onClick={() => previousStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>}
                                    {addForm ?
                                        <Button disabled={loading} onClick={() => OnSubmit_Form()} className="btn btn--radius btn--blue" color="primary" type="submit">Submit</Button>
                                        :
                                        <Button disabled={loading} onClick={() => OnUpdate_Form()} className="btn btn--radius btn--red" color="danger" type="submit">Update</Button>
                                    }
                                    {addForm ? '' : <Button disabled={loading} onClick={() => nextStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Next</Button>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button className="Modalclose" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h3 className="text-center modal-head">Are You Sure?</h3>
                                <div className="modalBtns">
                                    <button onClick={() => onDeleteButtonClick(data[activeStep]._id)} data-dismiss="modal" type="button" className="btn btn-primary">Yes</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Redirect to="home" />;
    }
}

export default DataForm;