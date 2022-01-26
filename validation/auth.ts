import * as yup from "yup";

const schema = yup.object({
    firstname: yup.string().required("this field is required"),
    lastname: yup.string(),
    email: yup.string().email("enter valid email").required("this field is required"),
    password: yup.string().min(8, "Atleast 8 Characters").max(20, "Must be less than 20 characters").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain one uppercase, one number and one special case character").required(),
    confirmpassword: yup.string().required("This field is required").oneOf([yup.ref("password"), null], "Passwords don't match")
})

export { schema }