class CampusNewsDetail extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          
          .detail-container {
            padding: 20px;
          }
          
          .empty-state {
            text-align: center;
            color: #6c757d;
            padding: 40px 0;
            font-style: italic;
          }
          
          h2 {
            margin: 0 0 15px 0;
            font-size: 24px;
            color: #212529;
          }
          
          .meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #6c757d;
          }
          
          .category {
            background-color: #e9ecef;
            padding: 4px 8px;
            border-radius: 4px;
            color: #495057;
          }
          
          .content {
            line-height: 1.6;
            color: #212529;
          }
          
          .content p {
            margin-bottom: 15px;
          }
        </style>
        
        <div class="detail-container">
          <div id="article-detail">
            <div class="empty-state">Selecciona un artículo para ver los detalles</div>
          </div>
        </div>
      `
    }
  
    updateArticle(article) {
      if (!article) {
        this.clearArticle()
        return
      }
  
      const detailContainer = this.shadowRoot.getElementById("article-detail")
  
      detailContainer.innerHTML = `
        <h2>${article.title}</h2>
        <div class="meta">
          <div>
            <div>${article.author}</div>
            <div>${article.date}</div>
          </div>
          <div class="category">${article.category}</div>
        </div>
        <div class="content">${article.content}</div>
      `
    }
  
    clearArticle() {
      const detailContainer = this.shadowRoot.getElementById("article-detail")
      detailContainer.innerHTML = '<div class="empty-state">Selecciona un artículo para ver los detalles</div>'
    }
  }
  
  customElements.define("campus-news-detail", CampusNewsDetail)
  