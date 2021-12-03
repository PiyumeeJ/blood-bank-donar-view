import React, {createContext, Component} from 'react'

export const AuthenticationContext = createContext();

class AuthenticationContextProvider extends Component {

    state = {isAuthenticated: false};

    toggleAuth = () =>{
        this.setState({ isAuthenticated: !this.state.isAuthenticated });
    }
    
    render() {
        return (
            <AuthenticationContext.Provider value={{...this.state, toggleAuth : this.toggleAuth}}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

export default AuthenticationContextProvider;