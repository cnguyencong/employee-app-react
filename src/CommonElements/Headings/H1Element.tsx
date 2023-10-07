import React from 'react';

const H1 = (props: any) =>{
    return <h1 {...props.attrH1}>{props.children}</h1>;
};

export default H1;