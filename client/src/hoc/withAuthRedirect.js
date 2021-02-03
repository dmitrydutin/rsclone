import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

export const withLoginRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (props.isAuth) {
            return <Redirect to="/feed" />;
        }

        return <Component {...props} />;
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

export const withLogoutRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) {
            return <Redirect to="/login" />;
        }

        return <Component {...props} />;
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
