import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import SimpleInput from "../common/simpleInput";
import { signinValidation } from "./validation";
import styles from "./style.module.css";
import api from "@/utils/api";


function Login({setAuth}) {
  const [loginDetails, setLoginDetails] = useState({});

  const {
    number = "",

    password = "",

    deviceType = "1",
    country_code = "+91",
  } = loginDetails;

  return (
    <Formik
      validationSchema={signinValidation}
      initialValues={{
        number,
        password,
        deviceType,
        country_code,
      }}
      onSubmit={(values) => {
        api
          .post("auth_api/user_login", values)
          .then((res) => {
            console.log(res, "gotRes");
            setAuth({
              login: false,
              signup: false,
              forgot: false,
              verify: false,
            });
          })
          .catch((err) => {
            toast.error(err);
          });
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form autoComplete="off">
          <div>
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
               style={{ marginBottom: "10px" }}
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
