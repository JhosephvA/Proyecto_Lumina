import { Builder, By, until } from 'selenium-webdriver';

(async function testRegisterVisible() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1️⃣ Abrir la página de registro
    await driver.get('https://proyectolumina2.vercel.app/register');
    await driver.sleep(2000); // esperar 2s para ver la página

    // 2️⃣ Llenar los campos del formulario lentamente
    const nombreInput = await driver.findElement(By.css('input[placeholder="Nombre"]'));
    await nombreInput.sendKeys('Test');
    await driver.sleep(1000);

    const apellidoInput = await driver.findElement(By.css('input[placeholder="Apellido"]'));
    await apellidoInput.sendKeys('Usuario');
    await driver.sleep(1000);

    const randomEmail = `testuser${Date.now()}@correo.com`;
    const emailInput = await driver.findElement(By.css('input[placeholder="Correo electrónico"]'));
    await emailInput.sendKeys(randomEmail);
    await driver.sleep(1000);

    const passwordInput = await driver.findElement(By.css('input[placeholder="Contraseña"]'));
    await passwordInput.sendKeys('123456');
    await driver.sleep(1000);

    const confirmPasswordInput = await driver.findElement(By.css('input[placeholder="Confirmar contraseña"]'));
    await confirmPasswordInput.sendKeys('123456');
    await driver.sleep(1000);

    console.log('Formulario llenado');

    // 3️⃣ Hacer clic en Registrarse
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();
    console.log('Botón Registrarse presionado');

    // 4️⃣ Esperar a que se redirija a login
    await driver.wait(until.urlContains('/login'), 5000);
    await driver.sleep(2000); // esperar 2s para ver la página de login

    const finalUrl = await driver.getCurrentUrl();
    console.log('Redirigido a:', finalUrl);

    if (finalUrl.includes('/login')) {
      console.log('Registro exitoso ✅');
    } else {
      console.log('Registro fallido ❌');
    }

    // 5️⃣ Mantener navegador abierto unos segundos más para observar
    await driver.sleep(5000);

  } catch (err) {
    console.error('Error en prueba de registro:', err);
  } finally {
    await driver.quit(); // Cierra el navegador
  }
})();