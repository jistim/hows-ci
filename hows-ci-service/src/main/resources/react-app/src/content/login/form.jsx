import React from "react";

import HowsAPI from "app/api/hows-api";


class LoginForm extends React.Component {
    //
    constructor(props) {
        //
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.redirect = this.redirect.bind(this);
    }
    // overriding
    componentWillMount() {
        //
        if (this.props.isLogin === true) {
            this.redirect();
        }
    }
    // overriding
    componentWillReceiveProps(nextProps) {
        //
        if (nextProps.isLogin === true) {
            this.redirect();
        }
    }
    redirect() {
        //
        this.props.router.push("/files");
    }
    handleChange(event) {
        //
        let nextState = this.state;
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }
    handleKeyPress(event) {
        //
        if (event.key === 'Enter' && event.target.name === 'password') {
            this.handleClick();
        }
    }
    handleClick() {
        //
        let credential = this.state;
        HowsAPI.login(credential)
            .then((result) => {
                if(result === true) {
                    this.props.setLogin(true);
                } else {
                    alert("일치하는 사용자가 존재하지 않습니다.");
                    this.setState({password: ''});
                }
            });
    }
    render() {
        //
        let isLogin = this.props.isLogin;

        if (isLogin !== false) {
            return (null);
        } else {
            return (
                <div className="container">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <input type="text" placeholder="Username"
                               className="form-control"
                               name="username"
                               value={this.state.username}
                               onChange={this.handleChange.bind(this)}
                               onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <input type="password" placeholder="Password"
                               className="form-control"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange.bind(this)}
                               onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <button className="btn btn-lg btn-primary btn-block" type="button"
                                onClick={this.handleClick.bind(this)}>
                            Sign in
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default LoginForm