import React from 'react'
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import { HashRouter } from 'react-router-dom';

function Login(props) {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        props.handleKycFormForm(data)
    }

    return (
        <div>
            <div className="Login">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={register({
                        })}
                        className="form-control"
                    />

                    <div className="text-center mt-4">
                        <button variant="primary" className="pl-5 pr-5" type="submit">
                            <span id="submit-login">Submit</span> </button>
                    </div>
                                </form>

            </div>
        </div>
    )

}

export default Login


