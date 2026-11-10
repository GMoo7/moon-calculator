// One tiny helper for building page elements safely.
// Text is added with textContent, so user-supplied text can never run as code.

// el("p", "note", "Hello") -> <p class="note">Hello</p>
export function el(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
