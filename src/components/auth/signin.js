import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import SimpleInput from "../common/simpleInput";
import { signinValidation } from "./validation";
import styles from "./style.module.css";
import api from "@/utils/api";
import Image from "next/image";
import Logo from "../../../public/assets/login_popup_logo.png"
import { useGlobalStore } from "@/utils/store";


function Login({setAuth}) {
  const [loginDetails, setLoginDetails] = useState({});
  const {userDetails,setUserDetails} = useGlobalStore(state => state )

  console.log(userDetails,"userDetails");

  const {
    number = "",
    password = "",

    deviceType = "3",
    country_code = "+91",
    deviceToken = "web"
  } = loginDetails;

  return (
    <Formik
      validationSchema={signinValidation}
      initialValues={{
        number,
        password,
        deviceType,
        country_code,
        deviceToken
      }}
      onSubmit={(values) => {
        api
          .post("auth_api/user_login", values)
          .then((res) => {
            console.log(res, "gotRes");
            if(res?.status == true ){
              setAuth({
                login: false,
                signup: false,
                forgot: false,
                verify: false,
              });
              setUserDetails(res?.results[0])
              toast.success("Login Successfully")
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
            <h5 className={styles.normalTxt}>Login To Your Account</h5>
            <p className={styles.smallTxt}>
              Dont have an account?{" "}
              <span style={{ color: "#5BCBF5",cursor:"pointer" }} onClick={() => setAuth({forgot: false,verify: false,signup:true,login:false}) } >Create New</span>
            </p>
            <SimpleInput
               auth
               inputStyle={{ width: "100%" }}
               value={values?.number}
               name="number"
               error={touched?.number && errors?.number}
               onChange={handleChange}
               style={{ marginBottom: "15px" }}
               placeholder="Number"
            />
            <SimpleInput
              auth
              inputStyle={{ width: "100%" }}
              value={values?.password}
              name="password"
              error={touched?.password && errors?.password}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
              placeholder="Enter your password"
             />
            <div className="d-flex mt-3 justify-content-between ">
              <div className="d-flex">
                <input
                  type="checkbox"
                  style={{ width: "25px", height: "18px", marginTop: "3px" }}
                />
                <p className={styles.smallTxt}>Keep me logged in</p>
              </div>
              <p className={styles.smallTxt}>
                <span style={{ color: "#5BCBF5",cursor:"pointer" }} onClick={() => setAuth({forgot: true,verify: false,signup:false,login:false}) }  >Forgot Password ?</span>
              </p>
            </div>
            <div>
              <Button type="submit" style={{ width: "100%", background: "#5BCBF5" }}>
                Login
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
