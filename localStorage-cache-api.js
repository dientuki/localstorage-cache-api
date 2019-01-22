export default class LocalStorageCacheApi {

  constructor(settings) {
    this.settings = settings;
    this.localObject = this.get();
    this.now = Date.now();
  }

  /**
   * Hace un get en local storage del objeto segun la key y lo retorna
   * @return {Json|String} - valor de retorno
   */
  get() {
    const value = localStorage.getItem(this.settings.key);

    try {
      return JSON.parse(value);
    } catch (error) {
      console.log('LocalStorage.get()', error);
      return null;
    }
  }

  /**
   * Asigna timestamp y guarda en localstorage
   * @param {Json} data
   */
  set(value) {
    let data = value;

    if ((this.settings.callback !== undefined) && (typeof this.settings.callback === 'function')) {
      data = this.settings.callback(value);
    }
        
    if (this.settings.expiration === undefined) {
      this.localObject = data;
    } else {

      this.localObject = {
        data: data,
        expiration: this.now + this.settings.expiration
      };
    }

    localStorage.setItem(this.settings.key, JSON.stringify(this.localObject));
  }

  /**
   * Valida si la los datos guradados en localstorage ya expiraron
   * @return {Boolean} - true o false
   * https://eslint.org/docs/rules/no-unneeded-ternary
   */
  isExpired() {
    return this.now > this.localObject.expiration;
  }

  /**
   * Valida si existen datos guardados segun el identificador
   * @return {Boolean} - true o false
   * https://eslint.org/docs/rules/no-unneeded-ternary
   */
  existsStorage() {
    return !(this.localObject === null);
  }

  /**
   * Consulta al servicio y retorna un data response
   */
  /* eslint-disable dot-notation, dot-location */
  getService() {
    return new Promise((resolve, reject) => {
      fetch(this.settings.api)
        .then((response) => {
          const type = response.headers.get('Content-Type').split(';');

          switch (type[0]) {
            case 'application/json':
              response.json().then((data) => {
                this.set(data);
                resolve(true);
              });
              break;
            case 'text/html':
              response.text().then((data) => {
                this.set(data);
                resolve(true);
              });
              break;
            default:
              reject();
              break;
          }
        })
        .catch((error) => {
          console.log('LocalStorage.getService()', error);
          reject(error);
        });
    });
  }
  /* eslint-enable */

  /* eslint-disable dot-notation, dot-location */
  getData() {

    return new Promise((resolve, reject) => {

      if (this.existsStorage() === false) {
        // No existe data storage
        this.getService().then(() => {
          resolve(this.localObject.data);
        })
          .catch((error) => {
            reject(error);
          });

      } else if (this.isExpired()) {
        // Existe data storage
        // Data expirada
        this.getService().then(() => {
          resolve(this.localObject.data);
        })
          .catch((error) => {
            reject(error);
          });

      } else {
        resolve(this.localObject.data);
      }
    });
  }
  /* eslint-enable */

}
