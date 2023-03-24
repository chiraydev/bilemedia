import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../utils/api";
import SimpleInput from "../common/simpleInput";
import styles from "./style.module.css";
import { signupValidation } from "./validation";
import Logo from "../../../public/assets/login_popup_logo.png"


function SignUp({setAuth,setPopup,popup,auth}) {
  const [registerDetails, setRegisterDetails] = useState({});

  const {
    email = "",
    number = "",
    user_name = "",
    password = "",
    confirm_password = "",
    deviceType = "1",
    country_code = "+91",
  } = registerDetails;

  return (
    <Formik
      // validationSchema={signupValidation}
      initialValues={{
        email,
        number,
        user_name,
        confirm_password,
        password,
        deviceType,
        country_code,
      }}
      onSubmit={(values) => {
        api.get(`auth_api/otp_register_process?email=${values?.email}`)
        .then((res) => {
          console.log(res, "gotRes");
          if(res?.status == true){
            setAuth({...auth,signup:false,verify:true,signupValues:values})
          
          }else{
            toast.error(res?.message)
          }
        
        })
        .catch((err) => {
          toast.error(err);
        });
       
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form autoComplete="off">
          <div>
          <div className="text-center" >
            <Image src={Logo} style={{width:"20%",height:"100%",marginBottom:"25px",marginTop:"15px"}} alt="logo" />
            </div>
            <h5 className={styles.normalTxt}>Create New Account</h5>
            <p className={styles.smallTxt}>
              Already have an account?{" "}
              <span style={{ color: "#5BCBF5" }} onClick={() => setAuth({forgot: false,verify: false,signup:false,login:true}) } >Login</span>
            </p>
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              value={values?.user_name}
              name="user_name"
              error={touched?.user_name && errors?.user_name}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
              placeholder="Username"
            />
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              name="email"
              error={touched?.email && errors?.email}
              onChange={handleChange}
              value={values?.email}
              style={{ marginBottom: "15px" }}
              placeholder="Email Address"
            />
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              name="number"
              error={touched?.number && errors?.number}
              onChange={handleChange}
              value={values?.number}
              style={{ marginBottom: "15px" }}
              placeholder="Mobile Number"
            />
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              name="password"
              error={touched?.password && errors?.password}
              onChange={handleChange}
              value={values?.password}
              style={{ marginBottom: "15px" }}
              placeholder="Create Password"
            />
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              name="confirm_password"
              error={touched?.confirm_password && errors?.confirm_password}
              onChange={handleChange}
              value={values?.confirm_password}
              style={{ marginBottom: "10px" }}
              placeholder="Confirm Password"
            />
            <div className="d-flex mt-3 ">
              <p className={styles.smallTxt}>
                By clicking on Register you are agree with our
                <span style={{ color: "#5BCBF5" }} onClick={() => setPopup({...popup,tc:true,active:1})} > Terms Conditions </span>and{" "}
                <span style={{ color: "#5BCBF5" }} onClick={() => setPopup({...popup,tc:true,active:2})} >Privacy Policy</span>{" "}
              </p>
            </div>
            <div>
              <Button
                type="submit"
                style={{ width: "100%", background: "#5BCBF5" }}
              >
                Register
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
