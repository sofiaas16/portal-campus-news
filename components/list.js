class CampusNewsList extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        flex: 1;
        overflow-y: auto;
        max-height: 500px;
        scrollbar-width: thin;
        scrollbar-color: #264653 #f1f1f1;
      }
      
      :host::-webkit-scrollbar {
        width: 6px;
      }
      
      :host::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      :host::-webkit-scrollbar-thumb {
        background-color: #264653;
        border-radius: 6px;
      }
      
      .empty-state {
        padding: 40px 20px;
        text-align: center;
        color: #6c757d;
        font-style: italic;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin: 20px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
      }
      
      @media (max-width: 768px) {
        :host {
          max-height: 300px;
        }
      }
      
      @media (max-width: 480px) {
        :host {
          max-height: 250px;
        }
        
        .empty-state {
          padding: 30px 15px;
          margin: 10px;
        }
      }
    </style>
    
    <div id="news-list">
      <!-- Los artículos se generarán dinámicamente -->
      <div class="empty-state">Cargando artículos...</div>
    </div>
  `
    }
  
    updateArticles(articles, selectedId) {
      const listContainer = this.shadowRoot.getElementById("news-list")
  
      // Limpiar la lista
      listContainer.innerHTML = ""
  
      if (articles.length === 0) {
        const emptyState = document.createElement("div")
        emptyState.className = "empty-state"
        emptyState.textContent = "No hay artículos en esta categoría"
        listContainer.appendChild(emptyState)
        return
      }
  
      // Crear elementos de artículo
      articles.forEach((article) => {
        const newsItem = document.createElement("campus-news-item")
        newsItem.article = article
        newsItem.isActive = article.id === selectedId
  
        listContainer.appendChild(newsItem)
      })
    }
  
    updateSelectedArticle(selectedId) {
      const newsItems = this.shadowRoot.querySelectorAll("campus-news-item")
  
      newsItems.forEach((item) => {
        if (item.article.id === selectedId) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
    }
  }
  
  customElements.define("campus-news-list", CampusNewsList)
  