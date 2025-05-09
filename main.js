const campusArticles = [
    {
      id: 1,
      title: "Jornada de puertas abiertas en Ingeniería",
      summary: "Visitas guiadas y charlas con profesores y estudiantes.",
      content:
        "<p>Este sábado 3 de mayo, la Facultad de Ingeniería abrirá sus puertas a futuros estudiantes y sus familias. Durante el evento, los visitantes podrán recorrer los laboratorios, conocer los proyectos actuales y conversar con profesores y estudiantes sobre la experiencia universitaria.</p><p>Las actividades comenzarán a las 10:00 AM y finalizarán a las 4:00 PM. Se recomienda registrarse previamente a través del portal de admisiones.</p>",
      author: "Oficina de Admisiones",
      date: "28 de abril, 2025",
      category: "Eventos",
    },
    {
      id: 2,
      title: "Proyecto de robótica gana concurso nacional",
      summary: "El equipo RoboCanino de Informática obtuvo el primer lugar.",
      content:
        "<p>Tras meses de trabajo intenso, el equipo RoboCanino de la Facultad de Informática ha sido galardonado con el primer premio en el Concurso Nacional de Robótica Aplicada. Su proyecto, un robot de asistencia para personas con discapacidad visual, destacó por su innovación y aplicabilidad práctica.</p><p>El jurado valoró especialmente la integración de inteligencia artificial y sensores avanzados que permiten al robot navegar en entornos complejos y comunicarse de manera efectiva con el usuario.</p>",
      author: "Facultad de Ingeniería",
      date: "25 de abril, 2025",
      category: "Investigación",
    },
    {
      id: 3,
      title: "Equipo de baloncesto clasifica a semifinales",
      summary: "Los Halcones vencieron a la Universidad Estatal por 78-65.",
      content:
        "<p>En un emocionante partido disputado anoche en el Polideportivo Central, nuestro equipo de baloncesto Los Halcones aseguró su pase a las semifinales del campeonato interuniversitario al vencer a la Universidad Estatal por 78-65.</p><p>Destacó la actuación de Miguel Sánchez, quien anotó 24 puntos y capturó 10 rebotes. El próximo encuentro será el viernes contra los Tigres de la Universidad Metropolitana.</p>",
      author: "Departamento de Deportes",
      date: "22 de abril, 2025",
      category: "Deportes",
    },
    {
      id: 4,
      title: "Festival cultural celebra la diversidad en el campus",
      summary: "Música, gastronomía y arte de diferentes culturas durante toda la semana.",
      content:
        "<p>Del 5 al 9 de mayo, el campus se transformará en un escenario multicultural con la celebración del Festival de la Diversidad. Estudiantes internacionales y locales compartirán aspectos de sus culturas a través de exposiciones, talleres, conciertos y muestras gastronómicas.</p><p>El evento busca fomentar el intercambio cultural y fortalecer los lazos entre la comunidad universitaria. La inauguración será el lunes a las 12:00 PM en la Plaza Central.</p>",
      author: "Oficina de Asuntos Internacionales",
      date: "20 de abril, 2025",
      category: "Vida estudiantil",
    },
    {
      id: 5,
      title: "Nuevas becas disponibles para estudios de posgrado",
      summary: "Financiamiento completo para maestrías en ciencias e ingeniería.",
      content:
        "<p>La Fundación para el Avance Científico ha anunciado un nuevo programa de becas para estudiantes que deseen cursar maestrías en áreas de ciencias e ingeniería. Las becas cubren la matrícula completa y ofrecen un estipendio mensual para gastos de manutención.</p><p>Los requisitos incluyen un promedio mínimo de 8.5 en estudios de pregrado y una propuesta de investigación. La fecha límite para aplicar es el 30 de junio.</p>",
      author: "Departamento de Becas y Financiamiento",
      date: "18 de abril, 2025",
      category: "Becas",
    },
    {
      id: 6,
      title: "Conferencia sobre cambio climático reúne a expertos internacionales",
      summary: "Investigadores presentarán los últimos avances en mitigación de efectos.",
      content:
        "<p>Los días 12 y 13 de mayo, nuestra universidad será sede de la Conferencia Internacional sobre Cambio Climático y Sostenibilidad. El evento contará con la participación de reconocidos científicos y expertos en políticas ambientales de más de 15 países.</p><p>Las sesiones abordarán temas como energías renovables, economía circular y adaptación urbana al cambio climático. La asistencia es gratuita para estudiantes y personal universitario, previa inscripción.</p>",
      author: "Centro de Estudios Ambientales",
      date: "15 de abril, 2025",
      category: "Investigación",
    },
    {
      id: 7,
      title: "Inauguración de nuevo laboratorio de biotecnología",
      summary: "Instalaciones de última generación para investigación avanzada.",
      content:
        "<p>El próximo jueves 8 de mayo se inaugurará el nuevo Laboratorio de Biotecnología Avanzada, un espacio equipado con tecnología de punta para el desarrollo de investigaciones en áreas como genómica, proteómica y bioinformática.</p><p>La inversión de 2.5 millones de dólares permitirá a nuestros investigadores y estudiantes trabajar en proyectos innovadores con aplicaciones en medicina, agricultura y medio ambiente. La ceremonia de inauguración contará con la presencia del Rector y representantes del Ministerio de Ciencia.</p>",
      author: "Facultad de Ciencias Biológicas",
      date: "12 de abril, 2025",
      category: "Eventos",
    },
  ]
  

  document.addEventListener("DOMContentLoaded", () => {

    const savedArticles = localStorage.getItem("campusArticles")

    if (savedArticles) {
      window.campusArticles = JSON.parse(savedArticles)
    } else {
      window.campusArticles = campusArticles

      localStorage.setItem("campusArticles", JSON.stringify(campusArticles))
    }

    const app = document.querySelector("campus-news-app")
    if (app) {
      app.initializeApp()
    }
  })
  