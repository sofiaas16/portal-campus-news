class CampusNewsItem extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      this._article = null
      this._isActive = false
  
      this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
      
      .item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
      }
      
      .item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0;
        background-color: #2a9d8f;
        opacity: 0.1;
        transition: width 0.3s ease;
      }
      
      .item:hover {
        background-color: #f8f9fa;
        transform: translateX(5px);
      }
      
      .item:hover::before {
        width: 5px;
      }
      
      .item.active {
        border-left: 4px solid #264653;
        background-color: #e9ecef;
        padding-left: 20px;
      }
      
      .item.active::before {
        width: 0;
      }
      
      h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #212529;
        transition: color 0.3s;
      }
      
      .item:hover h3 {
        color: #2a9d8f;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        color: #6c757d;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .meta {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 12px;
        color: #adb5bd;
      }
      
      .category {
        background-color: #e9ecef;
        padding: 2px 8px;
        border-radius: 12px;
        color: #495057;
        font-weight: 500;
        transition: all 0.3s;
      }
      
      .item:hover .category {
        background-color: #2a9d8f;
        color: white;
      }
      
      @media (max-width: 768px) {
        .item {
          padding: 12px;
        }
        
        h3 {
          font-size: 15px;
        }
        
        p {
          font-size: 13px;
        }
      }
      
      @media (max-width: 480px) {
        .item {
          padding: 10px;
        }
        
        .item.active {
          padding-left: 15px;
        }
        
        h3 {
          font-size: 14px;
        }
        
        p {
          font-size: 12px;
          -webkit-line-clamp: 1;
        }
        
        .meta {
          font-size: 11px;
        }
        
        .category {
          padding: 1px 6px;
        }
      }
    </style>
    
    <div class="item">
      <h3 id="title"></h3>
      <p id="summary"></p>
      <div class="meta">
        <span id="date"></span>
        <span class="category" id="category"></span>
      </div>
    </div>
  `
    }
  
    connectedCallback() {
      this.shadowRoot.querySelector(".item").addEventListener("click", this.handleClick.bind(this))
      this.render()
    }
  
    set article(value) {
      this._article = value
      this.render()
    }
  
    get article() {
      return this._article
    }
  
    set isActive(value) {
      this._isActive = value
      this.render()
    }
  
    get isActive() {
      return this._isActive
    }
  
    handleClick() {
      this.dispatchEvent(
        new CustomEvent("campus:article-select", {
          detail: { id: this._article.id },
          bubbles: true,
          composed: true,
        }),
      )
    }
  
    render() {
      if (!this._article) return
  
      const item = this.shadowRoot.querySelector(".item")
      const title = this.shadowRoot.getElementById("title")
      const summary = this.shadowRoot.getElementById("summary")
      const date = this.shadowRoot.getElementById("date")
      const category = this.shadowRoot.getElementById("category")

      title.textContent = this._article.title
      summary.textContent = this._article.summary
      date.textContent = this._article.date
      category.textContent = this._article.category
  

      if (this._isActive) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    }
  }
  
  customElements.define("campus-news-item", CampusNewsItem)
  