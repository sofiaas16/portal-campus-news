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
            animation: fadeIn 0.5s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .empty-state {
            text-align: center;
            color: #6c757d;
            padding: 60px 20px;
            font-style: italic;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
          }
          
          h2 {
            margin: 0 0 15px 0;
            font-size: 28px;
            color: #212529;
            line-height: 1.3;
            position: relative;
            padding-bottom: 15px;
          }
          
          h2::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #264653, #2a9d8f);
            border-radius: 2px;
          }
          
          .meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #6c757d;
          }
          
          .author-info {
            font-weight: 500;
          }
          
          .date-info {
            margin-top: 5px;
            font-size: 13px;
            opacity: 0.8;
          }
          
          .category {
            background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%);
            padding: 5px 12px;
            border-radius: 20px;
            color: white;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(42, 157, 143, 0.3);
          }
          
          .content {
            line-height: 1.8;
            color: #212529;
            font-size: 16px;
          }
          
          .content p {
            margin-bottom: 20px;
          }
          
          @media (max-width: 768px) {
            .detail-container {
              padding: 15px;
            }
            
            h2 {
              font-size: 24px;
            }
            
            .content {
              font-size: 15px;
              line-height: 1.7;
            }
          }
          
          @media (max-width: 480px) {
            .detail-container {
              padding: 10px;
            }
            
            h2 {
              font-size: 20px;
              padding-bottom: 10px;
            }
            
            h2::after {
              width: 60px;
              height: 3px;
            }
            
            .meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            
            .category {
              align-self: flex-start;
            }
            
            .content {
              font-size: 14px;
              line-height: 1.6;
            }
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
          <div class="author-info">${article.author}</div>
          <div class="date-info">${article.date}</div>
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
  