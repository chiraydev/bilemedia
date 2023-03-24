import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from "./header.module.css"
import {FiSearch} from "react-icons/fi"
import Logo from "../../../public/assets/login_popup_logo.png"
import Image from 'next/image'

function Header({setAuth}) {




  return (
    <div>
     <Navbar expand="lg">
      <Container fluid style={{width:"90%"}} >
        <Navbar.Brand href="/" className='me-4' >
          <Image src={Logo} style={{width:"80%",height:"100%"}} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color:"#8996b5",marginRight:"15px"}} >Movies</Nav.Link>
            <Nav.Link style={{color:"#8996b5",marginRight:"15px"}} >TV Shows</Nav.Link>
            <Nav.Link style={{color:"#8996b5",marginRight:"15px"}} >Subscription</Nav.Link>
            <div style={{position:"relative",marginRight:"20px"}} >
            <input className={styles.searchbar} placeholder="Search for movies or TV shows" />
<FiSearch className={styles.searchIcon} />
            </div>
            <div className='ms-3' >
              <Button onClick={() => setAuth({forgot:false,login:true,signup:false,verify:false})} style={{ width: "100%", background: "#5BCBF5" }}>
                Login
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
  )
}

export default Header