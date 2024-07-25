export default function createExternalRoot(rootElement: HTMLElement) {
  return {
    render() {
      rootElement.innerHTML = "<p>Hello Simple!</p>";
    },
    unmount() {
      rootElement.innerHTML = "";
    },
  };
}
