export function generateRandom(length: number) {
  const date = new Date();
  let code =
    date.getHours().toString() + date.getMinutes().toString() + date.getMilliseconds().toString();

  while (code.length < length) {
    code = "0" + code;
  }

  return code;
}
