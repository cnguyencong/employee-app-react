import React from 'react';

const H2 = (props: any) =>{
    return <h2 {...props.attrH2}>{props.children}</h2>;
};

export default H2;