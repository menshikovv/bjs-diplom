const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            // Используйте метод отображения сообщения на странице вместо alert
            userForm.setMessage(false, `Ошибка авторизации: ${response.error}`);
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            // Используйте метод отображения сообщения на странице вместо alert
            userForm.setMessage(false, `Ошибка регистрации: ${response.error}`);
        }
    });
};
