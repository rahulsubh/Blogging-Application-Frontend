import React, { useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetail());
    }, [login]);

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false);
            navigate("/");
        });
    };

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed=""
                className="px-5"
            >
                <NavbarBrand tag={ReactLink} to="/">My Blogs</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">New Feed</NavLink>
                        </NavItem>



                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">Services</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink tag={ReactLink} to="/login">
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/signup">
                                Signup
                            </NavLink>
                        </NavItem> */}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={ReactLink} to="/services">Contact Us</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>Linkedin</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>

                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to = "/user/profile-info">
                                            Profile Info
                                        </NavLink>
                                    </NavItem>
                                    
                                    <NavItem>
                                        <NavLink tag={ReactLink} to = "/user/dashboard">
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink onClick={logout}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">
                                            Signup
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                    </Nav>

                    {/* <NavbarText>Youtube</NavbarText> */}
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;