export function clean(obj: any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj;
  }