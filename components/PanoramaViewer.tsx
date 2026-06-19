'use client';

import { useEffect, useRef } from 'react';
import type { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

export type PanoMode = 'normal' | 'cardboard' | 'stereoscopic';
export type PanoControl = 'mouse' | 'sensor';

type PluginHandle = { start(): void; stop(): void };

interface Props {
  panoramaUrl: string;
  mode: PanoMode;
  control: PanoControl;
  fullscreenTrigger: number;
}

export default function PanoramaViewer({ panoramaUrl, mode, control, fullscreenTrigger }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef    = useRef<Viewer | null>(null);
  const stereoRef    = useRef<PluginHandle | null>(null);
  const gyroRef      = useRef<PluginHandle | null>(null);
  const autoRef      = useRef<PluginHandle | null>(null);
  const prevTrigger  = useRef(0);

  /* ── Mount: PSV başlat ── */
  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    (async () => {
      const { Viewer }            = await import('@photo-sphere-viewer/core');
      const { StereoPlugin }      = await import('@photo-sphere-viewer/stereo-plugin');
      const { GyroscopePlugin }   = await import('@photo-sphere-viewer/gyroscope-plugin');
      const { AutorotatePlugin }  = await import('@photo-sphere-viewer/autorotate-plugin');

      if (destroyed || !containerRef.current) return;

      const viewer = new Viewer({
        container: containerRef.current,
        panorama: panoramaUrl,
        plugins: [
          [AutorotatePlugin, {
            autostartDelay: 800,
            autostartOnIdle: true,
            autorotateSpeed: '1rpm',
          }],
          StereoPlugin,
          GyroscopePlugin,
        ],
        navbar: false,
        loadingTxt: '',
      });

      viewerRef.current = viewer;
      stereoRef.current = viewer.getPlugin(StereoPlugin) as unknown as PluginHandle;
      gyroRef.current   = viewer.getPlugin(GyroscopePlugin) as unknown as PluginHandle;
      autoRef.current   = viewer.getPlugin(AutorotatePlugin) as unknown as PluginHandle;
    })();

    return () => {
      destroyed = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
      stereoRef.current = null;
      gyroRef.current   = null;
      autoRef.current   = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panoramaUrl]);

  /* ── Mod / kontrol değişimi ── */
  useEffect(() => {
    const stereo = stereoRef.current;
    const gyro   = gyroRef.current;
    const auto   = autoRef.current;
    if (!stereo || !gyro) return;

    if (mode === 'cardboard' || mode === 'stereoscopic') {
      auto?.stop();
      stereo.start();
      gyro.stop();
    } else {
      stereo.stop();
      control === 'sensor' ? gyro.start() : gyro.stop();
    }
  }, [mode, control]);

  /* ── Tam ekran tetikleyici ── */
  useEffect(() => {
    if (fullscreenTrigger === prevTrigger.current) return;
    prevTrigger.current = fullscreenTrigger;

    const viewer = viewerRef.current;
    if (!viewer) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      /* PSV'nin kendi fullscreen metodu */
      (viewer as unknown as { enterFullscreen(): void }).enterFullscreen?.();
    }
  }, [fullscreenTrigger]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
