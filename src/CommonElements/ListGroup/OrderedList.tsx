import React from 'react';

const OL = (props: any) =>{
    return(
      <ol {...props.attrOL}>
        {props.children}
      </ol>
    );
};

export default OL;