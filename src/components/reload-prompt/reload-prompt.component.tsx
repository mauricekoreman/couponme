import { useRegisterSW } from "virtual:pwa-register/react";

const buttonStyles = "font-regularMedium text-base border p-2 rounded-sm";

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(r) {
      console.log("SW registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error " + error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return offlineReady || needRefresh ? (
    <div className='bg-white border-black border-2 fixed right-0 left-0 max-w-md mx-auto bottom-0 mb-16 p-3 border-solid rounded-md z-50 text-left shadow-md'>
      <p className='font-regularBold text-lg mb-3'>
        {!offlineReady
          ? "App ready to work offline. Add to homescreen to use as app!"
          : "New content available, click on reload button to update."}
      </p>
      {needRefresh && (
        <button onClick={() => updateServiceWorker(true)} className={`${buttonStyles} mr-3`}>
          Reload
        </button>
      )}
      <button onClick={() => close()} className={buttonStyles}>
        Close
      </button>
    </div>
  ) : (
    <></>
  );
};
