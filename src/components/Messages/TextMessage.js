import React from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";

const TextMessage = (props) => {
  const meta = props.message.data.meta || null
  const text = props.message.data.text+" ." || ''
  // const author = props.message.author


  return (
    <div className="sc-message--text">
            <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more"}
                readLessText={"Show less"}
            >
                {text}
            </ReactReadMoreReadLess>
      
      {/* {
        props.message && 
        author === "me" && 
        props.onDelete && 
          <button className='delete-message' onClick={() => props.onDelete(props.message)}>
            x
          </button>
      } */}
      {/* {
        props.message && 
        author === "me" && 
          <img src={userIcon} alt=""/>
      } */}
      {/* <ReadMoreReact
        text={text === "https://moneypal.com" ? <a target="_blank" rel="noopener noreferrer" href={text}>{text}</a> : text}
        min={100}
        ideal={130}
        max={150}
        readMoreText={"Read More.."}
      /> */}
      {meta && <p className='sc-message--meta'>{meta}</p>}
    </div>
  )
}

export default TextMessage