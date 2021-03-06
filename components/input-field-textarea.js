const { InputField } = require('./input-field.js');

module.exports.InputFieldTextarea = class extends InputField{
  constructor(){
      super();
      this.defaultOptions = {
          ...this.defaultOptions,
          platzhalter: '',
          cols: 50,
          rows: 5,
          wrap: 'soft'
      };
  }

  applyTemplate(){
      this.rootElement.insertAdjacentHTML('beforeend', `
          <div class="form-element">
              ${this.options.label ? `<label for="${this.options.name}">${this.options.label}</label><br>` : ''}
              <textarea 
                  id="${this.options.name}" 
                  placeholder="${this.options.platzhalter}"  
                  ${this.options.deaktiviert ? 'disabled' : ''}
                  cols="${this.options.cols}"
                  rows="${this.options.rows}"
                  wrap="${this.options.wrap}"
                  title="${this.options.beschreibung}"
              >${(this.options.initialModel) ? this.options.initialModel : ''}</textarea>
              <span class="validity-message"></span>
              <span class="pflichtfeld" style="font-style: italic; visibility: ${this.options.pflichtfeld ? 'visible' : 'hidden'};">Pflichtfeld</span>
          </div>
      `);
      this.querySelector('textarea').addEventListener('input', this.dispatchCustomEvent.bind(this, 'form-input'))
  }

  getModel(){
      let model = this.querySelector(`#${this.options.name}`).value;
      return model != '' ? model : undefined;
  }
}