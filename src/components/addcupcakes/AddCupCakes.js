import React from 'react'
import { Redirect } from 'react-router-dom'
import { withFormik, Form, Field, FieldArray } from 'formik'
import { db } from '../../services/Firebase'
import ImageUpload from '../images/ImageUpload'
import { YupValidation } from '../validation/YupValidation'


const AddCupCakes = ({ loggedIn, values, isSubmitting, errors, touched }) => {
    if (!loggedIn) return <Redirect to ={{ pathname: "/" }} />
    return (
        <div className="addcake-con">
            <h3>Add Cupcakes to the mix</h3>
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
                                                        <option>Cake Size</option>
                                                        <option value="4 Cupcakes" >4 Cupcakes</option>
                                                        <option value="6 Cupcakes" >6 Cupcakes</option>
                                                        <option value="8 Cupcakes" >8 Cupcakes</option>
                                                        <option value="12 Cupcakes" >12 Cupcakes</option>
                                                        <option value="24 Cupcakes" >24 Cupcakes</option>
                                                        
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



const FormikAddCupCakes = withFormik({
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
        db.collection('cupcakes')
            .add({
                name: values.cakeName,
                imagesUrl : values.imagesUrl,
                priceList : values.priceList
            })
            .then(() => {
                alert("Successly Added")
                setSubmitting(false)
                resetForm()
            })
            .catch(error => console.log(error))
    }

})(AddCupCakes)

export default FormikAddCupCakes
