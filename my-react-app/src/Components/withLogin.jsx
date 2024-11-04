function withLogin(Component) {
    return function (props) {
        if(props.loggedIn) {
            return <Component />;
        } else {
            return <p>로그인이 필요합니다.</p>
        }
    }
}

const WithLogin = withLogin(({loggedIn}) => {
    return <h3>로그인 완료!</h3>
});

export default WithLogin;