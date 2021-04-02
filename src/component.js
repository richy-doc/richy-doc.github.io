// export default (text = 'Hello word') => {
  export default (text = HELLO ) => {
  const element = document.createElement('div');
  element.className = "rounded bg-red-100 border max-w-md m-4 p-4";
  element.innerHTML = text;
  return element;
}