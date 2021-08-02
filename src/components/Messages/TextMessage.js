import React from 'react';
// import ReadMoreReact from 'read-more-react';
import ReactReadMoreReadLess from "react-read-more-read-less";

const TextMessage = (props) => {
  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  // const author = props.message.author

  return (
    <div className="sc-message--text">
      <ReactReadMoreReadLess
        charLimit={150}
        ellipsis=""
        readMoreText="Read More..."
        readLessText="Show Less"
        readMoreClassName="read-more-less--more"
        readLessClassName="read-more-less--less"
      >
        {text === "https://moneypal.com" ? <a target="_blank" rel="noopener noreferrer" href={text}>{text}</a> : text}
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