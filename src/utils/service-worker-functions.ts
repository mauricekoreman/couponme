// https://whatwebcando.today/articles/handling-service-worker-updates/

import { useState } from "react";

/* *
 * trigger a UI prompt when offlineReady or needRefresh are set to true
 * when clicked on confirm prompt, set these both to false and refresh page.
 */

function invokeServiceWorkerUpdateFlow(registration: ServiceWorkerRegistration) {
  // TODO implement your own UI notification element
  // notification.show("New version of the app is available. Refresh now?");
  // notification.addEventListener("click", () => {
  //   if (registration.waiting) {
  //     // let waiting Service Worker know it should became active
  //     registration.waiting.postMessage("SKIP_WAITING");
  //   }
  // });
}

export function registerServiceWorker() {
  window.addEventListener("load", async () => {
    const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");

    // when the updatefound event was missed is also handled
    // by re-invoking the prompt when there's a waiting Service Worker
    if (registration.waiting) {
      invokeServiceWorkerUpdateFlow(registration);
    }

    // detect Service Worker update available and wait for it to become installed
    registration.addEventListener("updatefound", () => {
      if (registration.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        registration.installing.addEventListener("statechange", () => {
          if (registration.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              invokeServiceWorkerUpdateFlow(registration);
            } else {
              // otherwise it's the first install, nothing to do
              console.log("Service worker initialized for the first time.");
            }
          }
        });
      }
    });

    let refreshing = false;

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
}

