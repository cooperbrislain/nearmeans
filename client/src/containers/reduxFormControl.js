import {Form} from "react-bootstrap";
import React from "react";

const ReduxFormControl = ({input, meta, ...props}) => <Form.Control {...props} {...input} />;

export default ReduxFormControl;
