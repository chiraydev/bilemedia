
import validations from "src/utils/validation";
import * as yup from "yup";


export const signupValidation = yup.object().shape({

    user_name: yup.string().required("This field is required"),
    email: yup.string().required("This field is required"),
    number: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
    confirm_password: yup.string().required("This field is required"),
  

  
});

export const signinValidation = yup.object().shape({

    number: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
 
  

  
});


