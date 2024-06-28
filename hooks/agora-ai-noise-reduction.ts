"use client";

import {
  AIDenoiserExtension,
  IAIDenoiserProcessor,
} from "agora-extension-ai-denoiser";
import AgoraRTC, { IMicrophoneAudioTrack } from "agora-rtc-react";
import { useEffect, useRef } from "react";

export default function useNoiseReduction({
  localMicrophoneTrack,
}: {
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
}) {
  const extension = useRef(
    new AIDenoiserExtension({
      assetsPath: "/external",
    }),
  );
  const processor = useRef<IAIDenoiserProcessor>();

  useEffect(() => {
    const initializeExtension = async () => {
      AgoraRTC.registerExtensions([extension.current]);

      if (!extension.current.checkCompatibility()) {
        console.error("Your browser does not support AI Denoiser!");
        return;
      }

      if (localMicrophoneTrack) {
        try {
          processor.current = extension.current.createProcessor();
          localMicrophoneTrack
            .pipe(processor.current)
            .pipe(localMicrophoneTrack.processorDestination);
          await processor.current.enable();
        } catch (error) {
          console.error("Failed to apply ai denoiser.");
        }
      }
    };
    void initializeExtension();

    return () => {
      const disableExtension = async () => {
        processor.current?.unpipe();
        localMicrophoneTrack?.unpipe();
        await processor.current?.disable();
      };
      void disableExtension();
    };
  }, [localMicrophoneTrack]);
}
