const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Шлях до файлу бази даних SQLite
const dbPath = './myapp.sqlite';

// Функція для запуску команд
const runCommand = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`error: ${error.message}`);
    throw error; // Кидати помилку далі, якщо щось не так
  }
};

// Функція для ініціалізації бази даних та запуску сервера
const initDatabase = async () => {
  if (fs.existsSync(dbPath)) {
    console.log('База даних існує. Запускаємо app.js...');
    await runCommand('node app.js');
  } else {
    console.log('База даних не існує. Запускаємо ініціалізацію...');
    await runCommand('node db/migrations.js');
    await runCommand('node db/sparql/fetch_museums.js');
    await runCommand('node db/sparql/fetch_thumbnails.js');
    await runCommand('node db/sparql/fetch_stadiums.js');
    console.log('Ініціалізацізація завершена, база даних наповнена. \nЗапускаємо app.js');
    await runCommand('node app.js');
  }  
};

initDatabase();
