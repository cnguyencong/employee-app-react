import React from 'react';

const H3 = (props: any) =>{
    return <h3 {...props.attrH3}>{props.children}</h3>;
};

export default H3;