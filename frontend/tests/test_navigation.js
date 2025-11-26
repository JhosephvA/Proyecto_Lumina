import { Builder, By, until } from 'selenium-webdriver';

(async function testNavigation() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://proyectolumina2.vercel.app');
    await driver.sleep(2000); // Esperar 2s para ver la pantalla inicial

    const title = await driver.getTitle();
    console.log('Título de la página:', title);

    // Botón Iniciar sesión
    const loginBtn = await driver.wait(
      until.elementLocated(By.css('a[href="/login"] > button')),
      10000
    );
    await loginBtn.click();
    await driver.wait(until.urlContains('/login'), 10000);
    console.log('Navegación a Iniciar sesión OK');
    await driver.sleep(2500);

    // Volver al inicio
    await driver.navigate().back();
    await driver.wait(until.urlContains('localhost:3001'), 10000);
    console.log('Regresó al Inicio');
    await driver.sleep(2000);

    // Botón Registrarse
    const registerBtn = await driver.wait(
      until.elementLocated(By.css('a[href="/register"] > button')),
      10000
    );
    await registerBtn.click();
    await driver.wait(until.urlContains('/register'), 10000);
    console.log('Navegación a Registrarse OK');
    await driver.sleep(2500);

    // Volver al inicio
    await driver.navigate().back();
    await driver.wait(until.urlContains('localhost:3001'), 10000);
    console.log('Volviendo a Inicio OK');
    await driver.sleep(2000);

    await driver.sleep(3000);

  } catch (err) {
    console.error('Error en la prueba:', err);
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
