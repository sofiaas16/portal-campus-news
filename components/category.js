class CampusCategoryFilters extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 15px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #eee;
          }
          
          h2 {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #264653;
            position: relative;
            padding-bottom: 8px;
          }
          
          h2::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: #2a9d8f;
            border-radius: 3px;
          }
          
          .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          button {
            padding: 8px 12px;
            border: none;
            border-radius: 20px;
            background-color: #e9ecef;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          
          button:hover {
            background-color: #dee2e6;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          button.active {
            background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%);
            color: white;
            box-shadow: 0 4px 8px rgba(42, 157, 143, 0.3);
          }
          
          @media (max-width: 768px) {
            .filters {
              justify-content: center;
            }
          }
          
          @media (max-width: 480px) {
            h2 {
              text-align: center;
            }
            
            h2::after {
              left: 50%;
              transform: translateX(-50%);
            }
            
            button {
              padding: 6px 10px;
              font-size: 13px;
            }
          }
        </style>
        
        <h2>Categorías</h2>
        <div class="filters" id="category-buttons">
          <!-- Los botones de categoría se generarán dinámicamente -->
        </div>
      `
    }
  
    connectedCallback() {
      // Inicializar si los datos ya están disponibles
      if (window.campusArticles) {
        this.initializeFilters()
      } else {
        // Esperar a que los datos estén disponibles
        document.addEventListener("DOMContentLoaded", () => {
          if (window.campusArticles) {
            this.initializeFilters()
          }
        })
      }
    }
  
    initializeFilters() {
      const articles = window.campusArticles
  
      // Extraer categorías únicas
      const categories = ["Todas", ...new Set(articles.map((article) => article.category))]
  
      // Generar botones de categoría
      const categoryButtonsContainer = this.shadowRoot.getElementById("category-buttons")
      categoryButtonsContainer.innerHTML = ""
  
      categories.forEach((category) => {
        const button = document.createElement("button")
        button.textContent = category
        button.dataset.category = category
  
        // Marcar el botón "Todas" como activo por defecto
        if (category === "Todas") {
          button.classList.add("active")
        }
  
        button.addEventListener("click", () => this.handleCategoryClick(category, button))
  
        categoryButtonsContainer.appendChild(button)
      })
    }
  
    handleCategoryClick(category, clickedButton) {
      // Actualizar la UI: marcar el botón seleccionado
      const buttons = this.shadowRoot.querySelectorAll("button")
      buttons.forEach((button) => {
        button.classList.remove("active")
      })
      clickedButton.classList.add("active")
  

      this.dispatchEvent(
        new CustomEvent("campus:category-change", {
          detail: { category },
          bubbles: true,
          composed: true,
        }),
      )
    }
  

    updateActiveCategory(category) {
      const buttons = this.shadowRoot.querySelectorAll("button")
      buttons.forEach((button) => {
        if (button.dataset.category === category) {
          button.classList.add("active")
        } else {
          button.classList.remove("active")
        }
      })
    }
  }
  
  customElements.define("campus-category-filters", CampusCategoryFilters)
  