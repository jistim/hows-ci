import React from "react";

class NotFound extends React.Component {
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
        this.props.router.push("/");
    }
    render() {
        //
        return (null);
    }
}

export default NotFound