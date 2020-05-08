import React from 'react'
import { auth } from '../../services/Firebase'
import './AuthPage.css'
import { withFormik, Form, Field } from 'formik'

const AuthPage = ({ loggedIn, status }) => {
    console.log(loggedIn)
    const signOutUser = () => {
        auth.signOut()
    }

    return (
        <div className="form-wrapper">

            {
                !loggedIn ?

                    <div className="form-container">
                        <Form className="form-field" autoComplete="off">
                            <Field type="email" name="email" placeholder="Email.." />
                            <Field type="password" name="password" placeholder="Password.." />
                            {!!status && <small style={{ color: "red" }}>User doesn't exist</small>}
                            <Field type="submit" value="Log In" />
                        </Form>
                    </div>
                    :
                    <div className="logged-wrapper">
                        <h3>Welcome Miss Halima</h3>
                        <div className="message-con">
                            <p>Go to cakes to add new cakes for your buyers</p>
                            <p>Go to Cupcakes to add new Cupcakes for your buyers</p>
                            <p>Pleast Try not to make mistakes</p>
                        </div>
                        <div>
                            <button onClick={signOutUser}>Sign Out</button>
                        </div>
                    </div>}

        </div>
    )
}
const FormikAuthPage = withFormik({
    mapPropsToValues() {
        return {
            email: "",
            password: ""
        }
    },

    handleSubmit(values, { setStatus }) {
        console.log(values)
        const email = values.email
        const password = values.password
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => setStatus(error.message))

    }
})(AuthPage)

export default FormikAuthPage