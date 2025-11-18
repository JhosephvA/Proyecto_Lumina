const { Builder, By, until } = require('selenium-webdriver');

(async function navigateStudentPage() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Abrir la vista de estudiante
    await driver.get('http://localhost:3001/student');
    console.log('Página de estudiante cargada');
    await driver.sleep(2000);

    // Navegar a "Mis Cursos"
    let cursos = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(text(),'Mis Cursos')]")),
      10000
    );
    await cursos.click();
    console.log('Navegó a: Mis Cursos');
    await driver.sleep(2000);

    // Regresar
    await driver.navigate().back();
    await driver.sleep(1500);

    // Navegar a "Tareas"
    let tareas = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(text(),'Tareas')]")),
      10000
    );
    await tareas.click();
    console.log('Navegó a: Tareas');
    await driver.sleep(2000);

    // Regresar
    await driver.navigate().back();
    await driver.sleep(1500);

    // Navegar a "Calificaciones"
    let calificaciones = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(text(),'Calificaciones')]")),
      10000
    );
    await calificaciones.click();
    console.log('Navegó a: Calificaciones');
    await driver.sleep(2000);

    // Regresar
    await driver.navigate().back();
    await driver.sleep(1500);

    // Navegar a "Recomendaciones"
    let recomendaciones = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(text(),'Recomendaciones')]")),
      10000
    );
    await recomendaciones.click();
    console.log('Navegó a: Recomendaciones');
    await driver.sleep(2000);

    // Regresar al dashboard
    await driver.navigate().back();
    await driver.sleep(2000);

    console.log("✔ Navegación completa en Panel de Estudiante");

  } catch (err) {
    console.error("❌ Error en la prueba:", err);
  } finally {
    await driver.quit();
  }
})();
