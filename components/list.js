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
          }
          
          .empty-state {
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-style: italic;
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
  