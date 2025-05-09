class CampusNewsApp extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
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
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          header {
            background-color: #264653;
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
          }
          
          .main-content {
            padding: 20px;
          }
          
          @media (max-width: 768px) {
            .container {
              grid-template-columns: 1fr;
            }
            
            .sidebar {
              border-right: none;
              border-bottom: 1px solid #eee;
            }
          }
        </style>
        
        <header>
          <div class="logo">🎓 Campus News</div>
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

      this.shadowRoot.addEventListener("campus:category-change", this.handleCategoryChange.bind(this))
      this.shadowRoot.addEventListener("campus:article-select", this.handleArticleSelect.bind(this))

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
  
      const detailComponent = this.shadowRoot.querySelector("campus-news-detail")
      if (detailComponent) {
        const selectedArticle = this.state.articles.find((article) => article.id === id)
        if (selectedArticle) {
          detailComponent.updateArticle(selectedArticle)
        }
      }
  
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

      const listComponent = this.shadowRoot.querySelector("campus-news-list")
      if (listComponent) {
        listComponent.updateArticles(this.state.filteredArticles, this.state.currentArticleId)
      }
 
      if (
        !this.state.currentArticleId ||
        !this.state.filteredArticles.some((article) => article.id === this.state.currentArticleId)
      ) {
        if (this.state.filteredArticles.length > 0) {
          const firstArticle = this.state.filteredArticles[0]
          this.state.currentArticleId = firstArticle.id

          const detailComponent = this.shadowRoot.querySelector("campus-news-detail")
          if (detailComponent) {
            detailComponent.updateArticle(firstArticle)
          }

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
  