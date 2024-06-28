"use client";

import VirtualBackgroundExtension, {
  IVirtualBackgroundProcessor,
} from "agora-extension-virtual-background";
import AgoraRTC, { ICameraVideoTrack } from "agora-rtc-react";
import { useEffect, useRef } from "react";

export default function useVirtualBackground({
  localCameraTrack,
}: {
  localCameraTrack: ICameraVideoTrack | null;
}) {
  const extension = useRef(new VirtualBackgroundExtension());
  const processor = useRef<IVirtualBackgroundProcessor>();

  useEffect(() => {
    const initializeExtension = async () => {
      AgoraRTC.registerExtensions([extension.current]);

      if (!extension.current.checkCompatibility()) {
        console.error("Your browser does not support Virtual background!");
        return;
      }

      if (localCameraTrack) {
        try {
          processor.current = extension.current.createProcessor();
          await processor.current.init();
          localCameraTrack
            .pipe(processor.current)
            .pipe(localCameraTrack.processorDestination);
        } catch (error) {
          console.error(error);
        }
      }
    };

    void initializeExtension();

    return () => {
      const disableExtension = async () => {
        processor.current?.unpipe();
        localCameraTrack?.unpipe();
        await processor.current?.disable();
      };
      void disableExtension();
    };
  }, [localCameraTrack]);

  return processor;
}
