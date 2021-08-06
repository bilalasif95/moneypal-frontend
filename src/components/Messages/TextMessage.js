import React from 'react';
// import ReadMoreReact from 'read-more-react';
import ShowMoreText from "react-show-more-text";

const TextMessage = (props) => {
  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  // const author = props.message.author


  return (
    <div className="sc-message--text">
      <ShowMoreText
        lines={3}
        more="Read More..."
        less="Show Less"
        className="content-css"
        anchorClass="my-anchor-css-class"
        expanded={false}
        truncatedEndingComponent={" "}
        // width={600}
        >
        {text === "https://moneypal.com" ? <a target="_blank" rel="noopener noreferrer" href={text}>{text}</a> : text}
      </ShowMoreText>
      
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