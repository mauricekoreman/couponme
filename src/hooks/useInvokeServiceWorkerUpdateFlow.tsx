import { useState } from "react";

interface IUseInvokeServiceWorkerUpdateFlow {
  offlineReady: boolean;
  setOfflineReady: React.Dispatch<React.SetStateAction<boolean>>;
  needRefresh: boolean;
  setNeedRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  updateServiceWorker: (registration: ServiceWorkerRegistration) => void;
}

export default function useInvokeServiceWorkerUpdateFlow(): IUseInvokeServiceWorkerUpdateFlow {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  const updateServiceWorker = (registration: ServiceWorkerRegistration) => {
    if (registration.waiting) {
      registration.waiting.postMessage("SKIP_WAITING");
    }
  };

  return {
    offlineReady,
    setOfflineReady,
    needRefresh,
    setNeedRefresh,
    updateServiceWorker,
  };
}

