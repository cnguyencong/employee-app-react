import React from 'react';

const BlockQuotes = (props: any) =>{
    return(
      <blockquote {...props.attrBlockQuote}>
        {props.children}
      </blockquote>
    );
}; 

export default BlockQuotes;