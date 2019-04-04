import React from "react";

const Input = ({name, label, error, ...rest}) => {
    return (rest.type !== 'area' ?
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input {...rest} name={name} id={name} className="form-control"/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div> :
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <textarea rows={5} {...rest} name={name} id={name} className="form-control"/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
    );
};

export default Input;
