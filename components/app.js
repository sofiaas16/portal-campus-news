class CampusNewsApp extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      // Estado inicial
      this.state = {
        articles: [],
        currentCategory: "Todas",
        currentArticleId: null,
        filteredArticles: [],
      }
  
      this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      
      header {
        background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      h1 {
        margin: 0;
        font-size: 24px;
      }
      
      .logo {
        font-weight: bold;
        font-size: 28px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .logo::before {
        content: "🎓";
        font-size: 32px;
      }
      
      .container {
        display: grid;
        grid-template-columns: 300px 1fr;
        min-height: 600px;
      }
      
      .sidebar {
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
        background-color: #f9f9f9;
      }
      
      .main-content {
        padding: 20px;
        background-color: white;
      }
      
      @media (max-width: 900px) {
        .container {
          grid-template-columns: 250px 1fr;
        }
      }
      
      @media (max-width: 768px) {
        .container {
          grid-template-columns: 1fr;
        }
        
        .sidebar {
          border-right: none;
          border-bottom: 1px solid #eee;
        }
        
        .logo {
          font-size: 24px;
        }
        
        .logo::before {
          font-size: 28px;
        }
      }
      
      @media (max-width: 480px) {
        header {
          padding: 15px;
        }
        
        .logo {
          font-size: 20px;
        }
        
        .logo::before {
          font-size: 24px;
        }
        
        .main-content {
          padding: 15px;
        }
      }
    </style>
    
    <header>
      <div class="logo">Campus News</div>
    </header>
    
    <div class="container">
      <div class="sidebar">
        <campus-category-filters></campus-category-filters>
        <campus-news-list></campus-news-list>
      </div>
      <div class="main-content">
        <campus-news-detail></campus-news-detail>
      </div>
    </div>
    
    <campus-debug-panel></campus-debug-panel>
  `
    }
  
    connectedCallback() {
      // Escuchar eventos personalizados
      this.shadowRoot.addEventListener("campus:category-change", this.handleCategoryChange.bind(this))
      this.shadowRoot.addEventListener("campus:article-select", this.handleArticleSelect.bind(this))
  
      // Inicializar si los datos ya están disponibles
      if (window.campusArticles) {
        this.initializeApp()
      }
    }
  
    initializeApp() {
      this.state.articles = window.campusArticles
      this.filterArticles()
      this.updateDebugInfo()
    }
  
    handleCategoryChange(event) {
      const { category } = event.detail
      this.state.currentCategory = category
      this.filterArticles()
      this.updateDebugInfo()
    }
  
    handleArticleSelect(event) {
      const { id } = event.detail
      this.state.currentArticleId = id
  
      // Actualizar el detalle del artículo
      const detailComponent = this.shadowRoot.querySelector("campus-news-detail")
      if (detailComponent) {
        const selectedArticle = this.state.articles.find((article) => article.id === id)
        if (selectedArticle) {
          detailComponent.updateArticle(selectedArticle)
        }
      }
  
      // Actualizar la lista para marcar el artículo seleccionado
      const listComponent = this.shadowRoot.querySelector("campus-news-list")
      if (listComponent) {
        listComponent.updateSelectedArticle(id)
      }
  
      this.updateDebugInfo()
    }
  
    filterArticles() {
      if (this.state.currentCategory === "Todas") {
        this.state.filteredArticles = [...this.state.articles]
      } else {
        this.state.filteredArticles = this.state.articles.filter(
          (article) => article.category === this.state.currentCategory,
        )
      }
  
      // Actualizar la lista de noticias
      const listComponent = this.shadowRoot.querySelector("campus-news-list")
      if (listComponent) {
        listComponent.updateArticles(this.state.filteredArticles, this.state.currentArticleId)
      }
  
      // Si no hay artículo seleccionado o el artículo seleccionado no está en la categoría actual,
      // seleccionar el primer artículo de la lista filtrada
      if (
        !this.state.currentArticleId ||
        !this.state.filteredArticles.some((article) => article.id === this.state.currentArticleId)
      ) {
        if (this.state.filteredArticles.length > 0) {
          const firstArticle = this.state.filteredArticles[0]
          this.state.currentArticleId = firstArticle.id
  
          // Actualizar el detalle del artículo
          const detailComponent = this.shadowRoot.querySelector("campus-news-detail")
          if (detailComponent) {
            detailComponent.updateArticle(firstArticle)
          }
  
          // Actualizar la lista para marcar el artículo seleccionado
          if (listComponent) {
            listComponent.updateSelectedArticle(firstArticle.id)
          }
        } else {

          this.state.currentArticleId = null
  

          const detailComponent = this.shadowRoot.querySelector("campus-news-detail")
          if (detailComponent) {
            detailComponent.clearArticle()
          }
        }
      }
    }
  
    updateDebugInfo() {
      this.dispatchEvent(
        new CustomEvent("campus:debug-update", {
          detail: {
            category: this.state.currentCategory,
            selectedId: this.state.currentArticleId,
            total: this.state.articles.length,
            filtered: this.state.filteredArticles.length,
          },
          bubbles: true,
          composed: true,
        }),
      )
    }
  }
  
  customElements.define("campus-news-app", CampusNewsApp)
  