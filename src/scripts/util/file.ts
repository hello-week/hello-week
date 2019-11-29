export function readFile(file: string, callback: any): void {
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

export function checkUrl(str: string) {
  const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  return regexp.test(str)
}
