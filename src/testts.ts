function wrapInArray(obj: string | string[]) : stringArray {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}
type stringArray = Array<string>
console.log(wrapInArray(['hi', 'there']))