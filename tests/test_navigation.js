const { Builder, By, until } = require('selenium-webdriver');

(async function testNavigation() {
  // Abrir navegador Chrome
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1️⃣ Abrir la página principal
    await driver.get('http://localhost:3001');

    // Verificar título
    let title = await driver.getTitle();
    console.log('Título de la página:', title);

    // 2️⃣ Navegar a "Acerca de"
    await driver.findElement(By.linkText('Acerca de')).click();
    await driver.wait(until.urlContains('about'), 5000);
    console.log('Navegación a Acerca de OK');

    // 3️⃣ Navegar a "Servicios"
    await driver.findElement(By.linkText('Servicios')).click();
    await driver.wait(until.urlContains('services'), 5000);
    console.log('Navegación a Servicios OK');

    // 4️⃣ Navegar a "Contacto"
    await driver.findElement(By.linkText('Contacto')).click();
    await driver.wait(until.urlContains('contact'), 5000);
    console.log('Navegación a Contacto OK');

    // 5️⃣ Volver a "Inicio"
    await driver.findElement(By.linkText('Inicio')).click();
    await driver.wait(until.urlIs('http://localhost:3001/'), 5000);
    console.log('Volver a Inicio OK');

  } catch (err) {
    console.error('Error en la prueba:', err);
  } finally {
    // Cerrar navegador
    await driver.quit();
  }
})();
