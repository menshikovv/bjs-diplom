const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            // Используйте метод отображения сообщения на странице вместо alert
            logoutButton.setMessage(false, `Ошибка при выходе: ${response.error}`);
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        // Используйте метод отображения сообщения на странице вместо alert
        ProfileWidget.setMessage(false, `Ошибка получения информации о пользователе: ${response.error}`);
    }
});

const ratesBoard = new RatesBoard();
function updateRates() {
    ApiConnector.getRates((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            // Используйте метод отображения сообщения на странице вместо alert
            ratesBoard.setMessage(false, `Ошибка получения курсов валют: ${response.error}`);
        }
    });
}
updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(false, `Ошибка пополнения баланса: ${response.error}`);
        }
    });
};

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация успешно выполнена");
        } else {
            moneyManager.setMessage(false, `Ошибка конвертации: ${response.error}`);
        }
    });
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод успешно выполнен");
        } else {
            moneyManager.setMessage(false, `Ошибка перевода: ${response.error}`);
        }
    });
};

const favoritesWidget = new FavoritesWidget();

function updateFavorites() {
    // Убираем лишний запрос, используем данные из ответа
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
}

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            updateFavorites(response.data); // Передаем данные из ответа
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, `Ошибка добавления в избранное: ${response.error}`);
        }
    });
};

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            updateFavorites(response.data); // Передаем данные из ответа
            favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного");
        } else {
            favoritesWidget.setMessage(false, `Ошибка удаления из избранного: ${response.error}`);
        }
    });
};
