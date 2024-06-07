const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.showError(`Ошибка авторизации: ${response.error}`);
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.showError(`Ошибка регистрации: ${response.error}`);
        }
    });
};
