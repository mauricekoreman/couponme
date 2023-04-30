import { useEffect, useState } from "react";

const buttonStyles = "font-regularSemiBold text-base border p-2 rounded-sm";

export const ReloadPrompt = () => {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  function updateServiceWorker() {
    if (registration?.waiting) {
      // let waiting Service Worker know it should became active
      registration.waiting.postMessage("SKIP_WAITING");
    }
  }

  function registerServiceWorker() {
    window.addEventListener("load", async () => {
      const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");

      // when the updatefound event was missed is also handled
      // by re-invoking the prompt when there's a waiting Service Worker
      if (registration.waiting) {
        setRegistration(registration);
        setNeedRefresh(true);
      }

      // detect Service Worker update available and wait for it to become installed
      registration.addEventListener("updatefound", () => {
        if (registration.installing) {
          // wait until the new Service worker is actually installed (ready to take over)
          registration.installing.addEventListener("statechange", () => {
            if (registration.waiting) {
              // if there's an existing controller (previous Service Worker), show the prompt
              if (navigator.serviceWorker.controller) {
                setRegistration(registration);
                setNeedRefresh(true);
              } else {
                // otherwise it's the first install, nothing to do
                setOfflineReady(true);
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

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return offlineReady || needRefresh ? (
    <div className='mx-auto left-3 right-3 fixed bottom-0 mb-16'>
      <div className='bg-white border-black border-2 right-0 left-0 max-w-md mx-auto p-3 border-solid rounded-md z-50 text-left shadow-lg'>
        <p className='font-regularBold text-lg mb-3 text-center'>
          {offlineReady
            ? "App ready to work offline. Add to homescreen to use as app!"
            : "New content available, click on reload button to update."}
        </p>
        <div className='flex gap-3 justify-center'>
          {needRefresh && (
            <button onClick={() => updateServiceWorker()} className={buttonStyles}>
              Reload
            </button>
          )}
          <button onClick={() => close()}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
};
