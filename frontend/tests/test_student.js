import { Builder, By, until } from 'selenium-webdriver';
import readline from 'readline';

(async function testStudentDashboard() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1️⃣ Abrir la vista de estudiante
    await driver.get('https://proyectolumina2.vercel.app/student');
    console.log('Página de estudiante abierta');
    await driver.sleep(2000);

    // 2️⃣ Esperar a que las cards estén visibles
    const cards = await driver.findElements(By.css('main > a > div'));
    console.log(`Se encontraron ${cards.length} cards`);
    await driver.sleep(1500);

    // 3️⃣ Iterar sobre cada card y hacer clic para ver la navegación
    const cardLinks = [
      { title: 'Mis Cursos', href: '/student/courses' },
      { title: 'Tareas', href: '/student/tasks' },
      { title: 'Calificaciones', href: '/student/grades' },
      { title: 'Recomendaciones', href: '/student/recommendations' }
    ];

    for (const card of cardLinks) {
      const cardElement = await driver.findElement(By.xpath(`//h2[text()='${card.title}']/..`));
      console.log(`Haciendo clic en card: ${card.title}`);
      await cardElement.click();

      // Esperar a que la URL contenga la ruta del card
      await driver.wait(until.urlContains(card.href), 5000);
      console.log(`Redirigido a: ${await driver.getCurrentUrl()}`);

      // Espera para ver la página
      await driver.sleep(2000);

      // Volver al dashboard
      await driver.get('http://localhost:3001/student');
      await driver.sleep(1500);
    }

    console.log('Test del dashboard completado ✅');

    // 4️⃣ Mantener navegador abierto hasta que presiones Enter
    console.log('Presiona Enter para cerrar el navegador y terminar la prueba.');
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
    console.error('Error en prueba del dashboard:', err);
  } finally {
    await driver.quit();
  }
})();
