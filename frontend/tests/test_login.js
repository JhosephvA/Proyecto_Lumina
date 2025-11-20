import { Builder, By, until } from 'selenium-webdriver';
import readline from 'readline';

(async function testLoginVisible() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1️⃣ Abrir página de login
    await driver.get('http://localhost:3001/login');
    console.log('Página de login abierta');
    await driver.sleep(2000);

    // 2️⃣ Llenar formulario lentamente
    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys('estudiante@lumina.com'); // email de prueba
    await driver.sleep(1500);

    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    await passwordInput.sendKeys('123456'); // contraseña de prueba
    await driver.sleep(1500);

    console.log('Formulario completado');

    // 3️⃣ Hacer clic en Entrar
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();
    console.log('Botón Entrar presionado');

    // 4️⃣ Esperar explícitamente a la redirección a /student
    await driver.wait(until.urlContains('/student'), 10000); // espera máxima 10s
    console.log('Redirigido a la vista de estudiante');

    // 5️⃣ Mantener el navegador abierto hasta que presiones Enter
    console.log('Presiona Enter en la consola para cerrar el navegador y terminar la prueba.');
    await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('', () => {
        rl.close();
        resolve(null);
      });
    });

  } catch (err) {
    console.error('Error en prueba de login:', err);
  } finally {
    await driver.quit();
  }
})();
