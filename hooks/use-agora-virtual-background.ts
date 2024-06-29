"use client";

import VirtualBackgroundExtension, {
  IVirtualBackgroundProcessor,
} from "agora-extension-virtual-background";
import AgoraRTC, { ICameraVideoTrack } from "agora-rtc-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useVirtualBackground({
  localCameraTrack,
}: {
  localCameraTrack: ICameraVideoTrack | null;
}) {
  const extension = useRef(new VirtualBackgroundExtension());
  const processor = useRef<IVirtualBackgroundProcessor>();
  const [backgroundBlurred, setBackgroundBlurred] = useState(false);

  useEffect(() => {
    const initializeExtension = async () => {
      AgoraRTC.registerExtensions([extension.current]);

      if (!extension.current.checkCompatibility()) {
        console.error("Your browser does not support Virtual background!");
        return;
      }

      if (localCameraTrack && !processor.current) {
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

  const handleBlurBackground = useCallback(() => {
    const enableBlur = async () => {
      if (processor.current?.enabled) {
        processor.current?.disable();
        setBackgroundBlurred(false);
      } else {
        processor.current?.setOptions({
          type: "blur",
          blurDegree: 2,
        });
        processor.current?.enable();
        setBackgroundBlurred(true);
      }
    };
    void enableBlur();
  }, [processor]);

  return { backgroundBlurred, handleBlurBackground };
}
