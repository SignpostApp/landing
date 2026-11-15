export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "signpost-theme";

export const THEME_COLORS: Record<Theme, string> = {
  light: "#fcfcfd",
  dark: "#0a0e16",
};

export const THEME_INIT_SCRIPT = `(function(){var t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;var m=document.createElement("meta");m.name="theme-color";m.content=${JSON.stringify(THEME_COLORS)}[t];document.head.appendChild(m)})()`;
