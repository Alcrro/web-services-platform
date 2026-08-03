export function startThemeTransition() {
  const html = document.documentElement;
  html.classList.add("theme-transition");

  setTimeout(() => {
    html.classList.remove("theme-transition");
  }, 350); // match your CSS timing
}
