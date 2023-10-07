import React from 'react';

const Footer = (props: any) =>{
    return(
      <footer {...props.attrFooter}> {props.children}</footer>
    );
};

export default Footer;