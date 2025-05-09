class CampusDebugPanel extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
  
      this.isVisible = false
  
      this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
      
      .debug-panel {
        background-color: #f8f9fa;
        border-top: 1px solid #dee2e6;
        padding: 0;
        font-family: monospace;
        font-size: 14px;
        color: #495057;
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.4s ease;
      }
      
      .debug-panel.visible {
        max-height: 200px;
        padding: 15px;
      }
      
      .toggle-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: all 0.3s;
      }
      
      .toggle-button:hover {
        transform: rotate(30deg) scale(1.1);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
      }
      
      .debug-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        background-color: #fff;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      
      .debug-item {
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
      }
      
      .label {
        font-weight: bold;
        color: #264653;
        margin-bottom: 5px;
        font-size: 12px;
        text-transform: uppercase;
      }
      
      .value {
        background-color: #e9ecef;
        padding: 8px 10px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        color: #2a9d8f;
        font-weight: bold;
      }
      
      @media (max-width: 768px) {
        .debug-info {
          grid-template-columns: 1fr;
          gap: 10px;
        }
        
        .toggle-button {
          width: 45px;
          height: 45px;
          font-size: 18px;
        }
      }
      
      @media (max-width: 480px) {
        .debug-panel.visible {
          padding: 10px;
        }
        
        .debug-info {
          padding: 10px;
        }
        
        .toggle-button {
          width: 40px;
          height: 40px;
          font-size: 16px;
          bottom: 15px;
          right: 15px;
        }
        
        .label {
          font-size: 11px;
        }
        
        .value {
          padding: 6px 8px;
          font-size: 13px;
        }
      }
    </style>
    
    <button class="toggle-button" title="Mostrar/Ocultar panel de depuración">🛠️</button>
    
    <div class="debug-panel">
      <div class="debug-info">
        <div class="debug-item">
          <span class="label">Categoría actual:</span>
          <span class="value" id="current-category">Todas</span>
        </div>
        <div class="debug-item">
          <span class="label">ID artículo seleccionado:</span>
          <span class="value" id="selected-id">Ninguno</span>
        </div>
        <div class="debug-item">
          <span class="label">Total de artículos:</span>
          <span class="value" id="total-articles">0</span>
        </div>
        <div class="debug-item">
          <span class="label">Artículos filtrados:</span>
          <span class="value" id="filtered-articles">0</span>
        </div>
      </div>
    </div>
  `
    }
  
    connectedCallback() {

      document.addEventListener("campus:debug-update", this.handleDebugUpdate.bind(this))
  

      const toggleButton = this.shadowRoot.querySelector(".toggle-button")
      toggleButton.addEventListener("click", this.toggleVisibility.bind(this))
    }
  
    handleDebugUpdate(event) {
      const { category, selectedId, total, filtered } = event.detail
  

      this.shadowRoot.getElementById("current-category").textContent = category
      this.shadowRoot.getElementById("selected-id").textContent = selectedId || "Ninguno"
      this.shadowRoot.getElementById("total-articles").textContent = total
      this.shadowRoot.getElementById("filtered-articles").textContent = filtered
    }
  
    toggleVisibility() {
      this.isVisible = !this.isVisible
  
      const debugPanel = this.shadowRoot.querySelector(".debug-panel")
      if (this.isVisible) {
        debugPanel.classList.add("visible")
      } else {
        debugPanel.classList.remove("visible")
      }
    }
  }
  
  customElements.define("campus-debug-panel", CampusDebugPanel)
  