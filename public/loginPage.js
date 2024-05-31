const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            alert(`Ошибка авторизации: ${response.error}`);
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            alert(`Ошибка регистрации: ${response.error}`);
        }
    });
};

class ApiConnector {
    static login({ login, password }, callback) {
        setTimeout(() => {
            const users = [
                { login: "oleg@demo.ru", password: "demo" },
                { login: "ivan@demo.ru", password: "demo" },
                { login: "petr@demo.ru", password: "demo" },
                { login: "galina@demo.ru", password: "demo" },
                { login: "vladimir@demo.ru", password: "demo" }
            ];

            const user = users.find(u => u.login === login && u.password === password);
            if (user) {
                callback({ success: true });
            } else {
                callback({ success: false, error: "Неверный логин или пароль" });
            }
        }, 1000);
    }

    static register({ login, password }, callback) {
        setTimeout(() => {
            const users = [
                "oleg@demo.ru",
                "ivan@demo.ru",
                "petr@demo.ru",
                "galina@demo.ru",
                "vladimir@demo.ru"
            ];

            if (users.includes(login)) {
                callback({ success: false, error: "Пользователь уже существует" });
            } else {
                callback({ success: true });
            }
        }, 1000);
    }
}
