import * as yup from 'yup'

export const YupValidation = yup.object().shape({
    cakeName: yup.string().required("Include a cake name"),
    imagesUrl : yup
    .array()
    .of(yup.string().required("Please include at imageUrl"))
    .strict()
    .required("Include at least one image url"),

    priceList : yup
    .array()
    .of(
      yup.object({
        size: yup.string().required(),
        price: yup.number().required("Include price of cake")
      })
    )
    .strict()
    .required("Include Price of cake")
})