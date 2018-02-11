import React from "react";

class LogMain extends React.Component {
    //
    constructor(props) {
        //
        super(props);
        this.state = {
        };
        this.redirect = this.redirect.bind(this);
    }
    // overriding
    componentWillMount() {
        //
        if (this.props.isLogin !== true) {
            this.redirect();
        }
    }
    // overriding
    componentWillReceiveProps(nextProps) {
        //
        if (nextProps.isLogin !== true) {
            this.redirect();
        }
    }
    redirect() {
        //
        this.props.router.push("/");
    }
    render() {
        //
        let isLogin = this.props.isLogin;

        if (isLogin !== true) {
            return (null);
        } else {
            return (<div>준비중입니다..</div>);
        }
    }
}

export default LogMain