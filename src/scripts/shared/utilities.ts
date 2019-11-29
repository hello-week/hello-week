type CallbackFunction = (...args: any[]) => void

export class Utilities {
  /**
   * Format Date
   * @param      {number}  timestamp
   * @param      {string}  format
   * @return     {string}
   * @public
   */
  static timestampToHuman(timestamp: number, format: string, langs: any): string {
    const dt = new Date(timestamp)
    format = format.replace('dd', dt.getDate().toString())
    format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString())
    format = format.replace('mm', (dt.getMonth() + 1).toString())
    format = format.replace('MMM', langs.months[dt.getMonth()])
    format = format.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString())
    format = format.replace('mmm', langs.monthsShort[dt.getMonth()])
    format = format.replace('yyyy', dt.getFullYear().toString())
    format = format.replace('YYYY', dt.getFullYear().toString())
    format = format.replace(
      'YY',
      dt
        .getFullYear()
        .toString()
        .substring(2)
    )
    format = format.replace(
      'yy',
      dt
        .getFullYear()
        .toString()
        .substring(2)
    )
    return format
  }

  static formatDate(day: number, month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`
  }

  /**
   * Sets date to timestamp.
   * @param      {string}
   * @return     {number}
   * @public
   */
  static setToTimestamp(date?: string): number {
    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
      throw new Error(`The date ${date} is not valid!`)
    }

    if (date || typeof date === 'string') {
      return new Date(date + 'T00:00:00Z').getTime()
    }
    return new Date().setHours(0, 0, 0, 0)
  }

  /**
   * Create HTML elements for Hello Week.
   * @param {string}      className
   * @param {HTMLElement} parentElement
   * @param {string} textNode
   * @public
   */
  static creatHTMLElement(el: HTMLElement, className: string, parentElement: HTMLElement, textNode: any = null) {
    let elem = el.querySelector('.' + className)
    if (!elem) {
      elem = document.createElement('div')
      elem.classList.add(className)
      if (textNode !== null) {
        const text = document.createTextNode(textNode)
        elem.appendChild(text)
      }
      parentElement.appendChild(elem)
    }
    return elem
  }

  static setDataAttr(el: HTMLElement, name: string, value: string) {
    return el.setAttribute(name, value)
  }

  static setStyle(el: HTMLElement, prop: string, value: string) {
    return el.style.setProperty(prop, value)
  }

  static addClass(el: HTMLElement, className: string) {
    return el.classList.add(className)
  }

  static removeClass(el: HTMLElement, className: string) {
    return el.classList.remove(className)
  }

  static toggleClass(el: HTMLElement, className: string) {
    return el.classList.toggle(className)
  }

  /**
   * Reads a file.
   * @param      {string}    file
   * @param      {Function}  callback
   * @public
   */
  static readFile(file: string, callback: CallbackFunction): void {
    const xobj = new XMLHttpRequest()
    xobj.overrideMimeType('application/json')
    xobj.open('GET', file, true)
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && <any>xobj.status === 200) {
        callback(xobj.responseText)
      }
    }
    xobj.send(null)
  }

  static getIndexForEventTarget(daysOfMonth: any, target: HTMLElement): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1
  }

  static checkUrl(str: string) {
    const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    return regexp.test(str)
  }

  static extend(options: CallbackFunction, configurations?: any): object {
    const settings = configurations
      ? configurations
      : {
          selector: '.hello-week',
          lang: 'en',
          langFolder: './langs/',
          format: 'DD/MM/YYYY',
          monthShort: false,
          weekShort: true,
          defaultDate: null,
          minDate: null,
          maxDate: null,
          disabledDaysOfWeek: null,
          disableDates: null,
          weekStart: 0,
          daysSelected: null,
          daysHighlight: null,
          multiplePick: false,
          disablePastDays: false,
          todayHighlight: true,
          range: false,
          locked: false,
          rtl: false,
          nav: ['◀', '▶'],
          onLoad: () => {
            /** callback function */
          },
          onNavigation: () => {
            /** callback function */
          },
          onSelect: () => {
            /** callback function */
          },
          onClear: () => {
            /** callback function */
          }
        }

    return Object.assign(settings, options)
  }
}
