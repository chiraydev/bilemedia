import React, { useState } from "react";


function SimpleInput(props) {
  const [isFocused, setIsFocused] = useState(false);

  const {
    placeholder = "",
    value = "",
    editable = false,
    onChange = () => {},
    OnEdit=() => {},
    name = "",
    groupClassName = "",
    style = {},
    inputStyle={},
    type = "",
    disabled,
    maxLength="",
    isEditable = true,
    required = false,
    verify,
    title,
    auth = false,
    error
  } = props;


  console.log(error,"error");

  return (
    <div
      className={groupClassName}
      style={{ position: "relative", ...style }}
    >
      {required ? <span style={{ color: "red" }}> * </span> : null}
      {title ? (
        <label style={{fontWeight:"bolder"}} >
          {title}
        </label>
      ) : null}
      <div className="d-flex align-items-center" >
      {isEditable ? (
        <input
        maxLength={maxLength}
        id= {auth && "authInput"}
          style={{
            fontSize: "14px",
            color: auth ? "white" : "black",
            height: "45px",
            borderRadius: "5px",
            border: error ? 'red' : auth ? "transparent" : '1.5px solid #9F9F9F',
            padding:"10px",
            backgroundColor:auth ? "#263f77" :"white",
            ...inputStyle
          }}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          value={value}
          name={name}
          type={type}
          disabled={disabled}
        />
      ) : (
        <div style={{ fontSize: 16.5, fontWeight: 500 }}>
          {value ? value : "-"}
        </div>
      )}
   {editable && <div style={{fontSize:"16px",fontWeight:"bold",marginLeft:"10px",cursor:"pointer"}} onClick={OnEdit} >
        <p  >Edit</p>
      </div>}
</div>

      {verify && (
        <div style={{ position: "absolute", top: "33px", right: "45px" }}>
          {/* <img src={verifyImg} /> */}
          <img src="/assets/new_icons/verify.png" style={{width:"86%",cursor:"pointer"}} alt="logo" />
        
        </div>
      )}

{error ? (
        <label className="simple-select-error" style={{color:"#dc3545"}} >
          {error}
        </label>
      ) : null}
    </div>
  );
}

export default SimpleInput;
