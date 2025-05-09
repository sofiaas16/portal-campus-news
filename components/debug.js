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
            padding: 15px;
            font-family: monospace;
            font-size: 14px;
            color: #495057;
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.3s ease-out;
          }
          
          .debug-panel.visible {
            max-height: 200px;
          }
          
          .toggle-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #264653;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          
          .debug-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          
          .debug-item {
            margin-bottom: 5px;
          }
          
          .label {
            font-weight: bold;
            color: #264653;
          }
          
          .value {
            padding-left: 10px;
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
      // Escuchar eventos de actualización de depuración
      document.addEventListener("campus:debug-update", this.handleDebugUpdate.bind(this))

      const toggleButton = this.shadowRoot.querySelector(".toggle-button")
      toggleButton.addEventListener("click", this.toggleVisibility.bind(this))
    }
  
    handleDebugUpdate(event) {
      const { category, selectedId, total, filtered } = event.detail
  
      // Actualizar la información de depuración
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
  