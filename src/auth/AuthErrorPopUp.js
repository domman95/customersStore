import React from 'react'

class AuthErrorPopUp extends React.Component {

    componentDidMount = () => {
        this.timer = setTimeout(() => {
            this.props.closeAuthError()
            this.timer = 0
        }, 3000);
    }

    componentWillUnmount = () => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0
        }
    }

    render() {
        return (
            <div className="authError_popUp">
                <p className="authErrorText">
                    {this.props.authError}
                </p>
            </div>
        )
    }
}

export default AuthErrorPopUp