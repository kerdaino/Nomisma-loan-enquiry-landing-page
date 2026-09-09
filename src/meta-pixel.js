import { NOMISMA_CONFIG } from "./config.js";

let initialized = false;
let leadTracked = false;
const allowedEvents = new Set(["PageView", "Lead", "Contact"]);

// Event names only: never accept application data or matching parameters.
export function trackMetaEvent(eventName) {
  try {
    if (!allowedEvents.has(eventName) || typeof window.fbq !== "function") return;
    window.fbq("track", eventName);
  } catch {
    // Tracking must never affect applications or link navigation.
  }
}

export function trackSuccessfulApplication() {
  if (leadTracked) return;
  // This page accepts one application before showing its terminal success UI.
  leadTracked = true;
  trackMetaEvent("Lead");
}

export function initializeMetaPixel() {
  if (initialized) return;
  initialized = true;
  try {
    if (!window.fbq) {
      const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }
    // Manual events only; no automatic form matching or inferred events.
    window.fbq("set", "autoConfig", false, NOMISMA_CONFIG.metaPixelId);
    window.fbq("init", NOMISMA_CONFIG.metaPixelId);
    trackMetaEvent("PageView");
  } catch {
    // A blocked or unavailable Pixel is nonessential.
  }
}
