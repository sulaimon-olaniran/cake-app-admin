import React from 'react'
import { withFormik, Form, Field, FieldArray } from 'formik'
import { Redirect } from 'react-router-dom'
import { db } from '../../services/Firebase'
import './AddCakes.css'
import ImageUpload from '../images/ImageUpload'
import { YupValidation } from '../validation/YupValidation'


const AddCakes = ({ loggedIn, values, isSubmitting, errors, touched }) => {
   if (!loggedIn)  return <Redirect  to="/" />
    return (
        <div className="addcake-con">
            <h3>Add Cakes to the mix</h3>
            <ImageUpload />
            <Form className="form-con">

                <Field type="text" name="cakeName" placeholder="Cake's Name" />
                {touched.cakeName && errors.cakeName && <small>{errors.cakeName}</small>}

                <FieldArray name="imagesUrl" >
                    {
                        (arrayHelpers) => (
                            <div className="image-con">
                                <p onClick={() => arrayHelpers.push('')}>
                                    ADD IMAGE
                                </p>
                                {
                                    values.imagesUrl.map((image, index) => {
                                        return (
                                            <div key={index} className="image-div">
                                                <Field type="text" name={`imagesUrl.${index}`} placeholder="Image Url" />
                                                <p onClick={() => arrayHelpers.remove(index)}>REMOVE</p>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </FieldArray>
                {touched.imagesUrl && errors.imagesUrl && <small>{errors.imagesUrl}</small>}
<hr/>
                <FieldArray name="priceList">
                    {
                        (arrayHelpers) =>
                            (
                                <div className="price-con">
                                    <p onClick={() => arrayHelpers.push({
                                        size: "",
                                        price: ""
                                    })}>ADD PRICE</p>

                                    {values.priceList.map((doc, index) => {
                                        return (
                                            <div key={index} className="price-div">
                                                <div>
                                                    <Field component="select" name={`priceList.${index}.size`} className="select-box">
                                                        <option value="6' inches" >6' inches</option>
                                                        <option value="8' inches" >8' inches</option>
                                                        <option value="10' inches" >10' inches</option>
                                                        <option value="12' inches" >12' inches</option>
                                                        <option value="14' inches" >14' inches</option>
                                                        <option value="18' inches" >18' inches</option>
                                                        <option value="20' inches" >20' inches</option>
                                                    </Field>
                                                    &#8358;<Field type="number" name={`priceList.${index}.price`} />
                                                </div>
                                                <p onClick={() => arrayHelpers.remove(index)}>REMOVE</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )

                    }
                </FieldArray>
                {touched.priceList && errors.priceList &&  <small>{errors.priceList[0].price}</small>}

                <button type="submit" disabled={isSubmitting}>SUBMIT</button>
            </Form>
            { isSubmitting && <small>Submitting Your data</small>}
        </div>
    )
}



const FormikAddCakes = withFormik({
    mapPropsToValues() {
        return {
            cakeName: "",
            imagesUrl: [""],
            priceList: [{
                size: "",
                price: ""
            }]
        }
    },
    validationSchema: YupValidation,

    handleSubmit(values, { resetForm, setSubmitting}) {
        db.collection('cakes')
            .add({
                name: values.cakeName,
                imagesUrl : values.imagesUrl,
                priceList : values.priceList
            })
            .then(() =>{
                alert("Data uploaded successful")
                setSubmitting(false)
                resetForm()
            })
            .catch(error => console.log(error))
    }

})(AddCakes)

export default FormikAddCakes
