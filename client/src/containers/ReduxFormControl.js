import React from "react";
import { Form } from "react-bootstrap";

const ReduxFormControl = ({input, meta, ...props}) => <Form.Control {...props} {...input} />;
export default ReduxFormControl;
