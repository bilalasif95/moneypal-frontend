import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Label, Input } from 'reactstrap';
import API from "./utils/API";
import Moment from 'moment';
import { Redirect } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import Pagination from "react-js-pagination";

function NewForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [definition, setDefinition] = useState("")
    const [definitionArray, setDefinitionArray] = useState([])
    const [detail, setDetail] = useState("")
    const [modify_by, setModifyBy] = useState("")
    const [modify_at, setModifyAt] = useState("")
    const [term, setTerm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [addForm, setAddForm] = useState(false);
    const [formID, setFormID] = useState('');
    const [category, setCategory] = useState('');
    const [editIndex, setEditIndex] = useState(-1)
    const [editSynonymIndex, setEditSynonymIndex] = useState(-1);
    const [synonym, setSynonym] = useState('')
    const [synonymArray, setSynonymArray] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [source, setSource] = useState("")
    const [editDefinition, setEditDefinition] = useState('')
    const [editSynonym, setEditSynonym] = useState('')
    const [length, setLength] = useState('')
    const [activePage, setActivePage] = useState()
    const [search, setSearch] = useState("")
    const today = new Date()
    const OnUpdate_Form = () => {
        setError("")
        setSuccess("")
        setLoading(true)
        const updatedName = localStorage.getItem('name')
        let payload ={}
        if(detail === ""){
            payload = {
                term: term,
                source: source,
                updated_by: updatedName,
                updated_at: today,
                definition: definitionArray,
                synonyms: synonymArray,
                category: category,
            }  
        }
        else{
            payload = {
                term: term,
                source: source,
                updated_by: updatedName,
                updated_at: today,
                definition: definitionArray,
                synonyms: synonymArray,
                category: category,
                detail: detail
            }  
        }
        // const payload = {
        //     term: term,
        //     source: source,
        //     updated_by: updatedName,
        //     updated_at: today,
        //     definition: definitionArray,
        //     synonyms: synonymArray,
        //     category: category,
        //     detail: detail
        // }
       
        const id = data[activeStep] && data[activeStep]._id;
        API.put(`api/v1/term/${id}`, payload)
            .then(() => {
                setSuccess("Record Updated Successfully")
                if(search === ""){
                API.get("api/v1/terms")
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setActiveStep(activeStep);
                        setSuccess("")
                        setAddForm(false)
                        setSource(res.data[activeStep].source)
                        setDetail(res.data[activeStep].detail)
                        setModifyBy(res.data[activeStep].updated_by)
                        setTerm(res.data[activeStep] && res.data[activeStep].term)
                        setLength(res.data.length)
                        setDefinitionArray(res.data[activeStep].definition)
                        setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
                        setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                        setFormID(res.data[activeStep] && res.data[activeStep]._id)
                        setCategory(res.data[activeStep] && res.data[activeStep].category)
                    })
                    .catch((err) => {
                        setError(err.response.data)
                        setLoading(false)
                    })
                }
                else{

                    API.get(`api/v1/terms?starts_with=${search}`)
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setActiveStep(activeStep);
                        setSuccess("")
                        setAddForm(false)
                        setSource(res.data[activeStep].source)
                        setDetail(res.data[activeStep].detail)
                        setModifyBy(res.data[activeStep].updated_by)
                        setTerm(res.data[activeStep] && res.data[activeStep].term)
                        setLength(res.data.length)
                        setDefinitionArray(res.data[activeStep].definition)
                        setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
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
      }
    useEffect(() => {
        setLoading(true)
        if(search === ""){
            API.get("api/v1/terms")
            .then((res) => {
                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setDetail(res.data[activeStep].detail)
                setModifyBy(res.data[activeStep].updated_by)
                setTerm(res.data[activeStep] && res.data[activeStep].term)
                setLength(res.data.length)
                setDefinitionArray(res.data[activeStep].definition)
                setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                setFormID(res.data[activeStep] && res.data[activeStep]._id)
                setCategory(res.data[activeStep] && res.data[activeStep].category)
            })
            .catch((err) => {
                setError(err.response.data)
                setLoading(false)
            })

        }
    else{
        API.get(`api/v1/terms?starts_with=${search}`)
                .then((res) => {
                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setDetail(res.data[activeStep].detail)
                setModifyBy(res.data[activeStep].updated_by)
                setTerm(res.data[activeStep] && res.data[activeStep].term)
                setLength(res.data.length)
                setDefinitionArray(res.data[activeStep].definition)
                setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                setFormID(res.data[activeStep] && res.data[activeStep]._id)
                setCategory(res.data[activeStep] && res.data[activeStep].category)
                })
                .catch((err) => {
                    console.log("err:::", err);
                    setError(err.response.data)
                    setLoading(false)
                })
    }    
        
    }, [activeStep])
    const previousStep = () => {
        setEditSynonymIndex(-1)
        setEditIndex(-1)
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }
    const nextStep = () => {
        setEditSynonymIndex(-1)
        setEditIndex(-1)
        setDefinitionArray([])
        if (activeStep < data.length - 1) {
            setActiveStep(activeStep + 1)
        }
    }
    const onDetailChange = (e) => {
        setDetail(e.target.value)
    }
    const onAddFormhandle = () => {
        setAddForm(true)
        setSource('')
        setError("")
        setSuccess("")
        setTerm('')
        setDefinition('')
        setDefinitionArray([])
        setSynonymArray([])
        setDetail('')
        setModifyAt('')
        setModifyBy(localStorage.getItem('name'))
        setCategory('')
    }
    const OnSubmit_Form = () => {
        setError("")
        setSuccess("")
        setLoading(true)
        let payload = {}
        if(detail === ""){
            payload = {
                term: term,
                synonyms: synonymArray,
                faq_frequency: 0,
                category: category,
                definition: definitionArray,
                source: source,
                updated_by: modify_by,
                updated_at: today
            }
        }
        else{
            payload = {
                term: term,
                synonyms: synonymArray,
                faq_frequency: 0,
                category: category,
                definition: definitionArray,
                detail: detail,
                source: source,
                updated_by: modify_by,
                updated_at: today
            }
        }
        // const payload = {
        //     term: term,
        //     synonyms: synonymArray,
        //     faq_frequency: 0,
        //     category: category,
        //     definition: definitionArray,
        //     detail: detail,
        //     source: source,
        //     updated_by: modify_by,
        //     updated_at: today
        // }
        API.post(`api/v1/terms`, payload)
            .then(() => {
                setSuccess("Record Created Successfully")
                API.get("api/v1/terms")
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setSuccess("")
                        setAddForm(false)
                        setSource(res.data[activeStep].source)
                        setDetail(res.data[activeStep].detail)
                        setModifyBy(res.data[activeStep].updated_by)
                        setTerm(res.data[activeStep] && res.data[activeStep].term)
                        setDefinitionArray(res.data[activeStep].definition)
                        setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
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
        setDefinitionArray(data[activeStep].definition)
        setSynonymArray(data[activeStep] && data[activeStep].synonyms)
        setSource(data[activeStep].source)
        setDetail(data[activeStep].detail)
        setModifyBy(data[activeStep].updated_by)
        setTerm(data[activeStep] && data[activeStep].term)
        setModifyAt(Moment(data[activeStep] && data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
        setCategory(data[activeStep] && data[activeStep].category)
    }
    const categoryHandlechange = e => {
        setCategory(e.target.value)
    }
    const onDefinitionChange = (e) => {
        setDefinition(e.target.value)
    }
    const onEditDefinitionChange = (e) => {
        setEditDefinition(e.target.value)
    }
    const onSynonymsChange = (e) => {
        setSynonym(e.target.value)
    }
    const onEditSynonymChange = (e) => {
        setEditSynonym(e.target.value)
    }
    const tickButton = (e) => {
        e.preventDefault();
        const some_array = [...definitionArray]
        some_array[editIndex] = editDefinition;
        setDefinitionArray(some_array)
        setEditIndex(-1)
    }
    const tickSynonym = (e) => {
        e.preventDefault();
        const some_array = [...synonymArray]
        some_array[editSynonymIndex] = editSynonym;
        setSynonymArray(some_array)
        setEditSynonymIndex(-1)
    }
    const addDefinition = (e) => {
        e.preventDefault();
        if (definition) {
            setDefinitionArray(prev =>
                prev.concat(definition))
            setDefinition('')
        }
    }
    const addSynonyms = (e) => {
        e.preventDefault();
        if (synonym) {
            setSynonymArray(prev =>
                prev.concat(synonym))
            setSynonym('')
        }
    }
    const editDefinitionIndex = (e, index) => {
        e.preventDefault();
        setEditIndex(index)
        setEditDefinition(definitionArray[index])
    }
    const searchText = () => {
        setLoading(true)
            API.get(`api/v1/terms?starts_with=${search}`)
                .then((res) => {
                    setActivePage(1);
                    setActiveStep(0);
                setData(res.data)
                setLoading(false)
                setSource(res.data[activeStep].source)
                setDetail(res.data[activeStep].detail)
                setModifyBy(res.data[activeStep].updated_by)
                setTerm(res.data[activeStep] && res.data[activeStep].term)
                setLength(res.data.length)
                setDefinitionArray(res.data[activeStep].definition)
                setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
                setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
                setFormID(res.data[activeStep] && res.data[activeStep]._id)
                setCategory(res.data[activeStep] && res.data[activeStep].category)
                })
                .catch((err) => {
                    console.log("err:::", err);
                    setError(err.response.data)
                    setLoading(false)
                })
      
    }
    const redirect = () => {
        if(search === "") {

        }
        else{

            setLoading(true)
            setSearch("")
            API.get("api/v1/terms")
            .then((res) => {
            setData(res.data)
            setLoading(false)
            setSource(res.data[activeStep].source)
            setDetail(res.data[activeStep].detail)
            setModifyBy(res.data[activeStep].updated_by)
            setTerm(res.data[activeStep] && res.data[activeStep].term)
            setLength(res.data.length)
            setDefinitionArray(res.data[activeStep].definition)
            setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
            setModifyAt(Moment(res.data[activeStep] && res.data[activeStep].updated_at).format('DD/MM/YYYY HH:MM'))
            setFormID(res.data[activeStep] && res.data[activeStep]._id)
            setCategory(res.data[activeStep] && res.data[activeStep].category)
            })
            .catch((err) => {
                console.log("err:::", err);
                setError(err.response.data)
                setLoading(false)
            })
           

        }
       
    }
    const editSynonymIndexFunc = (e, index) => {
        e.preventDefault();
        setEditSynonymIndex(index)
        setEditSynonym(synonymArray[index])
    }
    const onDeleteHandle = (e, index) => {
        e.preventDefault();
        const filterData = definitionArray.filter((res, ind) => ind !== index)
        setDefinitionArray(filterData)
    }
    const onSynonymDelete = (e, index) => {
        e.preventDefault();
        const synonymfilterData = synonymArray.filter((res, ind) => ind !== index)
        setSynonymArray(synonymfilterData)
    }
    const result = error && Object.keys(error).map(function (key) {
        return [key, error[key]];
    });
    const onDeleteButtonClick = (id) => {
        setLoading(true)
        API.delete(`api/v1/term/${id}`)
            .then(() => {
                setSuccess("Record Deleted Successfully")
                API.get("api/v1/terms")
                    .then((res) => {
                        setData(res.data)
                        setLoading(false)
                        setSuccess("")
                        setSource(res.data[activeStep].source)
                        setDetail(res.data[activeStep].detail)
                        setModifyBy(res.data[activeStep].updated_by)
                        setTerm(res.data[activeStep] && res.data[activeStep].term)
                        setDefinitionArray(res.data[activeStep].definition)
                        setSynonymArray(res.data[activeStep] && res.data[activeStep].synonyms)
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
                                            <Button color="danger" onClick={onBackHandleChange}>Back</Button>
                                        </div>
                                        :
                                        <div className="btn--group">
                                          <div class="input-group">
                                            <div class="form-outline">
                                                <input id="search-focus" type="search" id="form1" value={search} onChange={e => setSearch(e.target.value)} class="form-control" placeholder="Search..."/>
                                                <Button className="searchBtn" type="button" onClick={searchText}>
                                                <i class="fa fa-search"></i>
                                            </Button>
                                            <div className="closeBtn">
                                            <button className="del-btn del">
                                                <BsX onClick={redirect} />
                                            </button>
                                            </div>

                                            </div>
                                            
                                            
                                            </div>

                                            <div className="deleteBtns">
                                                <Button color="danger" onClick={() => onDeleteButtonClick(data[activeStep]._id)}>Delete</Button>
                                                <Button color="primary" onClick={onAddFormhandle}>Add</Button>
                                            </div>
                                           
                                        </div>
                                        
                                    }
                                </div>
                                {loading ? <div>Loading...</div> :
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
                                                    <Label for="term">Term</Label>
                                                    <Input type="text" value={term} id="term" placeholder="Enter Term" name="term" onChange={e => setTerm(e.target.value)} />
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
                                                    <Label for="definition">Definitions</Label>
                                                    <div className="var-add">
                                                        <Input type="text" onChange={(e) => onDefinitionChange(e)} value={definition} placeholder="Enter Definition" id="definition" name="definition" />
                                                        <Button onClick={(e) => addDefinition(e)}>+</Button>
                                                    </div>
                                                    {definitionArray.length !== 0 &&
                                                        <ul className="quiz-var">
                                                            {definitionArray.map((res, index) =>
                                                                <li key={index}><span className="spaninline">{editIndex === index ? <Input type="text" onChange={(e) => onEditDefinitionChange(e)} value={editDefinition} placeholder="Edit Definition" id="editDefinition" name="editDefinition" /> : res}</span>
                                                                    {editIndex === index ?
                                                                        <button className="del-btn tick">
                                                                            <BsCheck onClick={(e) => tickButton(e)} />
                                                                        </button>
                                                                        :
                                                                        <span>
                                                                            <button className="del-btn edit">
                                                                                <BiEdit onClick={(e) => editDefinitionIndex(e, index)} />
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
                                                    <Label for="synonym">Synonyms</Label>
                                                    <div className="var-add">
                                                        <Input type="text" onChange={(e) => onSynonymsChange(e)} value={synonym} placeholder="Enter Synonym" id="synonym" name="synonym" />
                                                        <Button onClick={(e) => addSynonyms(e)}>+</Button>
                                                    </div>
                                                    {synonymArray &&
                                                        <ul className="quiz-var">
                                                            {synonymArray && synonymArray.map((res, index) =>
                                                                <li key={index}><span className="spaninline">{editSynonymIndex === index ? <Input type="text" onChange={(e) => onEditSynonymChange(e)} value={editSynonym} placeholder="Edit Synonym" id="editSynonym" name="editSynonym" /> : res}</span>
                                                                    {editSynonymIndex === index ?
                                                                        <span>
                                                                            <button className="del-btn tick">
                                                                                <BsCheck onClick={(e) => tickSynonym(e, index)} />
                                                                            </button>
                                                                        </span>
                                                                        :
                                                                        <span>
                                                                            <button className="del-btn edit">
                                                                                <BiEdit onClick={(e) => editSynonymIndexFunc(e, index)} />
                                                                            </button>
                                                                            <button className="del-btn del">
                                                                                <BsX onClick={(e) => onSynonymDelete(e, index)} />
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
                                                    <Label for="long_ans">Detail</Label>
                                                    <textarea rows="4" placeholder="Enter Detailed Answer" onChange={(e) => onDetailChange(e)} value={detail} id="long_ans" name="long_ans" className="form-control" required={true} />
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

                                <Pagination
                                activePage={activePage}
                                itemsCountPerPage={1}
                                totalItemsCount={length}
                                pageRangeDisplayed={10}
                                onChange={(e) => handlePageChange(e)}

                                />
                                </div>
                                }
                               
                                {success && <div className="successMessage">{success}</div>}
                                {error && result.map((res) => res.map((response) => <div className="errorMessage">{response}</div>))}
                                <div className="footer-btn">
                                    {addForm ? '' : <Button onClick={() => previousStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Back</Button>}
                                    {addForm ?
                                        <Button onClick={() => OnSubmit_Form()} className="btn btn--radius btn--blue" color="primary" type="submit">Submit</Button>
                                        :
                                        <Button onClick={() => OnUpdate_Form()} className="btn btn--radius btn--red" color="danger" type="submit">Update</Button>
                                    }
                                    {addForm ? '' : <Button onClick={() => nextStep()} className="btn btn--radius btn--blue" color="primary" type="submit">Next</Button>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    } else {
        return <Redirect to="home" />;
    }
}

export default NewForm;
