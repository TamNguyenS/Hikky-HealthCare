const loginFailed = {
    status: 401,
    process: 1,
    susscess: false,
    message: 'User name or password is incorrect',
}

const loginSuccess = {
    status: 200,
    process: 0,
    susscess: true,
    message: 'Login successfully',
}

const registerSuccess = {
    status: 201,
    process: 0,
    susscess: true,
    message: 'Register successfully'
}
const registerFailed = {
    status: 401,
    process: 1,
    susscess: true,
    message: 'Register failed! Try again'
}

const registerError = {
    process: 403,
    susscess: false,
    message: 'Error in create'
}
module.exports = {
    loginFailed,
    loginSuccess,
    registerSuccess,
    registerFailed,
    registerError
}