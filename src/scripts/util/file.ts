export function readFile(file: string, callback: any): void {
  fetch(file)
    .then((response: any) => response.json())
    .then((data: any) => {
      callback(data);
    });
}

export function checkUrl(str: string) {
  const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return regexp.test(str);
}
