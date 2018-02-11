import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import HowsAPI from "app/api/hows-api";

class MainHeader extends React.Component {
    //
    constructor(props) {
        //
        super(props);
        this.state = {
        };
    }
    // overriding
    componentWillMount() {
        //
    }
    logout() {
        //
        HowsAPI.logout()
            .then(() => {
                this.props.setLogin(false);
            });
    }
    render() {
        //
        let isLogin = this.props.isLogin;

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Hows-CI</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {
                    isLogin === true ?
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1} onClick={() => this.props.router.push('/files')}>File</NavItem>
                                <NavItem eventKey={2} onClick={() => this.props.router.push('/logs')}>Log</NavItem>
                            </Nav>
                            <Nav pullRight>
                                <NavItem eventKey={1} onClick={this.logout.bind(this)}>Logout</NavItem>
                            </Nav>
                        </Navbar.Collapse>
                        :
                        null
                }

            </Navbar>
        );
    }
}

export default MainHeader