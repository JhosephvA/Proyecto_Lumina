const { Builder, By, until } = require('selenium-webdriver');

(async function testNavigation() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001');
    await driver.sleep(2000); // Esperar 2s para ver la pantalla inicial

    let title = await driver.getTitle();
    console.log('Título de la página:', title);

    // Botón Iniciar sesión
    let loginBtn = await driver.wait(
      until.elementLocated(By.css('a[href="/login"] > button')),
      10000
    );
    await loginBtn.click();
    await driver.wait(until.urlContains('/login'), 10000);
    console.log('Navegación a Iniciar sesión OK');
    await driver.sleep(2500); // Esperar para ver la pantalla

    // Volver al inicio
    await driver.navigate().back();
    await driver.wait(until.urlContains('localhost:3001'), 10000);
    await driver.sleep(2000); // Se queda en pantalla
    console.log('Regresó al Inicio');

    // Botón Registrarse
    let registerBtn = await driver.wait(
      until.elementLocated(By.css('a[href="/register"] > button')),
      10000
    );
    await registerBtn.click();
    await driver.wait(until.urlContains('/register'), 10000);
    console.log('Navegación a Registrarse OK');
    await driver.sleep(2500); // Ver pantalla de registro

    // Volver al inicio
    await driver.navigate().back();
    await driver.wait(until.urlContains('localhost:3001'), 10000);
    await driver.sleep(2000); // Ver pantalla inicio final
    console.log('Volviendo a Inicio OK');

    // Espera final antes de cerrar
    await driver.sleep(3000);

  } catch (err) {
    console.error('Error en la prueba:', err);
    await driver.sleep(3000); // Dejar ver el error en pantalla
  } finally {
    await driver.quit();
  }
})();
