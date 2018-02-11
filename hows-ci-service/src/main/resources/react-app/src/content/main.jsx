import React from "react";

import HowsAPI from "app/api/hows-api";

import MainHeader from 'app/content/layout/header.jsx';

class Main extends React.Component {
    //
    constructor(props) {
        //
        super(props);
        this.state = {
            isLogin: undefined
        };
        this.setLogin = this.setLogin.bind(this);
    }
    // overriding
    componentWillMount() {
        //
        HowsAPI.isLogin()
            .then((isLogin) => {
                this.setLogin(isLogin);
            });
    }
    setLogin(isLogin) {
        //
        this.setState({
            isLogin: isLogin
        });
    }
    render() {
        //
        let isLogin = this.state.isLogin;

        if (isLogin === undefined) {
            return (null);
        } else {
            return (
                <div>
                    <MainHeader isLogin={isLogin}
                                setLogin={this.setLogin}
                                router={this.props.router} />
                    {
                        React.cloneElement(
                            this.props.children,
                            {
                                isLogin: isLogin,
                                setLogin: this.setLogin
                            }
                        )
                    }
                </div>
            );
        }
    }
}

export default Main