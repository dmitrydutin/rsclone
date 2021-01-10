import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withLoginRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (props.isAuth) {
            return <Redirect to='/' />;
        }

        return <Component {...props} />;
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

export const withLogoutRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) {
            return <Redirect to='/login' />;
        }

        return <Component {...props} />;
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
