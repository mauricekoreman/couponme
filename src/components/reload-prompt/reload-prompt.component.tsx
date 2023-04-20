// import { useRegisterSW } from "virtual:pwa-register/react";

const buttonStyles = "font-regularSemiBold text-base border p-2 rounded-sm";

export const ReloadPrompt = () => {
  // const {
  //   offlineReady: [offlineReady, setOfflineReady],
  //   needRefresh: [needRefresh, setNeedRefresh],
  //   updateServiceWorker,
  // } = useRegisterSW({
  //   onRegisteredSW(r) {
  //     console.log("SW registered: " + r);
  //   },
  //   onRegisterError(error) {
  //     console.log("SW registration error " + error);
  //   },
  // });

  // const close = () => {
  //   setOfflineReady(false);
  //   setNeedRefresh(false);
  // };

  function updateServiceWorker(e: boolean) {
    console.log("[MOCK]: updating service worker");
  }

  const offlineReady = false;
  const needRefresh = false;

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
            <button onClick={() => updateServiceWorker(true)} className={buttonStyles}>
              Reload
            </button>
          )}
          <button onClick={() => close()}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
};

