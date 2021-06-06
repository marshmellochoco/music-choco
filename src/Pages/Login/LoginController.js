const handleLogin = async (e) => {
    e.preventDefault();
    userLogin({ username, password });
};

const handleRegister = async (e) => {
    e.preventDefault();
    userRegister({ username, password });
};

const userLogin = async (credentials) => {
    let token;
    await axios
        .post(`${apiUrl}/auth`, { credentials })
        .then((result) => (token = result.data.token))
        .catch((err) => console.log(err));
    dispatch({ type: "SET_TOKEN", token: token });
};

const userRegister = async (credentials) => {
    let token;
    await axios
        .post(`${apiUrl}/auth/register`, { credentials })
        .then((result) => (token = result.data.token))
        .catch((err) => console.log(err));
    dispatch({ type: "SET_TOKEN", token: token });
};

module.exports = {
    handleLogin,
    handleRegister,
}