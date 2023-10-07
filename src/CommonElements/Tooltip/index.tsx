import React from 'react';
import { Tooltip } from 'reactstrap';

const ToolTip = (props: any) =>(
  <Tooltip {...props.attrToolTip} >
    {props.children}
  </Tooltip>
);

export default ToolTip;