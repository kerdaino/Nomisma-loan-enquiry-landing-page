import { defineConfig } from "vite";
import { NOMISMA_CONFIG } from "./src/config.js";

export default defineConfig({
  plugins: [{
    name: "meta-pixel-noscript",
    transformIndexHtml(html) {
      return html.replace("<!-- meta-pixel-noscript -->", `<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${encodeURIComponent(NOMISMA_CONFIG.metaPixelId)}&amp;ev=PageView&amp;noscript=1" /></noscript>`);
    },
  }],
});
