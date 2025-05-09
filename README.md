# portal-campus-news

# Actividad: Portal “Campus News” con Web Components y Eventos Personalizados

**Duración:** 2 horas  

**Nivel:** Intermedio  

---

## Objetivos

1. Construir un portal de **Campus News** con **Web Components** y **Shadow DOM**.  
2. Modularizar en componentes: filtros, lista de noticias, detalle y panel de depuración.  
3. Comunicar componentes mediante **CustomEvent** (`detail`, `bubbles`, `composed`).  
4. Adaptar la UX al contexto universitario: categorías, logo y textos de “Campus”.

---

## 1. Estructura HTML esperada

```html
<campus-news-app>
  <campus-category-filters></campus-category-filters>
  <campus-news-list></campus-news-list>
  <campus-news-detail></campus-news-detail>
  <campus-debug-panel></campus-debug-panel>
</campus-news-app>
```

- **`<campus-news-app>`**
  Orquesta el estado global (artículos, categoría activa, artículo seleccionado).
- **`<campus-category-filters>`**
  Botones “Todas” + categorías de campus (Ej: “Eventos”, “Investigación”, “Deportes”, “Vida estudiantil”).
- **`<campus-news-list>`** y **`<campus-news-item>`**
  Lista de titulares; cada ítem emite su selección.
- **`<campus-news-detail>`**
  Panel de detalle con título, meta y contenido completo.
- **`<campus-debug-panel>`**
  Muestra info interna para depuración y botón toggle.

------

## 2. Datos de ejemplo

Define en `main.js` (o en `<campus-news-app>`) un array:

```js
const campusArticles = [
  {
    id: 1,
    title: "Jornada de puertas abiertas en Ingeniería",
    summary: "Visitas guiadas y charlas con profesores y estudiantes.",
    content: "<p>Este sábado 3 de mayo...</p>",
    author: "Oficina de Admisiones",
    date: "28 de abril, 2025",
    category: "Eventos"
  },
  {
    id: 2,
    title: "Proyecto de robótica gana concurso nacional",
    summary: "El equipo RoboCanino de Informática obtuvo el primer lugar.",
    content: "<p>Tras meses de trabajo...</p>",
    author: "Facultad de Ingeniería",
    date: "25 de abril, 2025",
    category: "Investigación"
  },
  // …más artículos: Deportes, Vida estudiantil, Becas, …
];
```

------

## 3. Eventos personalizados

### a) Cambio de categoría

En `<campus-category-filters>`:

```js
this.dispatchEvent(new CustomEvent("campus:category-change", {
  detail: { category: "Investigación" },
  bubbles: true,
  composed: true
}));
```

### b) Selección de artículo

En `<campus-news-item>` al hacer click:

```js
this.dispatchEvent(new CustomEvent("campus:article-select", {
  detail: { id: this.articleId },
  bubbles: true,
  composed: true
}));
```

### c) Actualización de depuración

En `<campus-news-app>` tras filtrar o seleccionar:

```js
this.dispatchEvent(new CustomEvent("campus:debug-update", {
  detail: {
    category: currentCategory,
    selectedId: currentArticleId,
    total: campusArticles.length,
    filtered: filteredList.length
  },
  bubbles: true,
  composed: true
}));
```

------

## 4. Shadow DOM y estilos aislados

Ejemplo de plantilla para `<campus-news-item>`:

```js
class CampusNewsItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .item {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .item.active {
          border-left: 4px solid #264653;
          background: #f0f4f8;
        }
        h3 { margin: 0 0 6px; font-size: 16px; }
        p { margin: 0; font-size: 14px; color: #555; }
        .date { font-size: 12px; color: #999; margin-top: 4px; }
      </style>
      <div class="item">
        <h3></h3>
        <p></p>
        <div class="date"></div>
      </div>
    `;
  }
  // Métodos para renderizar datos y emitir evento…
}
customElements.define("campus-news-item", CampusNewsItem);
```

------

## 5. Flujo de trabajo

1. **Definición de templates** y registro de **Web Components** con `customElements.define`.
2. Implementa **`<campus-category-filters>`**:
   - Extrae categorías de `campusArticles`.
   - Renderiza botones y emite `campus:category-change`.
3. Implementa **`<campus-news-list>`**:
   - Recibe array filtrado; crea `<campus-news-item>` por artículo.
   - Escucha `campus:article-select` o lo deja burbujear.
4. Implementa **`<campus-news-detail>`**:
   - Escucha `campus:article-select` y muestra datos del artículo.
5. Implementa **`<campus-debug-panel>`**:
   - Escucha `campus:debug-update` para mostrar valores de estado.
   - Botón para alternar visibilidad.
6. Orquesta todo dentro de **`<campus-news-app>`**:
   - Estado global: `campusArticles`, `currentCategory`, `currentArticleId`.
   - Añade listeners a eventos personalizados para coordinar componentes hijos.

------
