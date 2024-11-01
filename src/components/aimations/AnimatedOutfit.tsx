'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

const validOutfitKeys = [
  'looktype',
  'lookaddons',
  'lookhead',
  'lookbody',
  'looklegs',
  'lookfeet',
  'mount',
  'resize',
];

export function outfitURL({
  resize,
  ...params
}: {
  looktype: number;
  lookaddons?: number;
  lookhead?: number;
  lookbody?: number;
  looklegs?: number;
  lookfeet?: number;
  mount?: number;
  resize?: boolean;
}): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!validOutfitKeys.includes(key)) {
      continue;
    }
    search.append(key, (value ?? 0).toString());
  }
  if (resize) {
    search.append('resize', '1');
  }
  return `/api/outfit?${search.toString()}`;
}

interface Outfit {
  looktype: number;
  lookaddons?: number;
  lookhead?: number;
  lookbody?: number;
  looklegs?: number;
  lookfeet?: number;
  mount?: number | null;
  lookmount?: number | null;
}

interface Frame {
  image: HTMLImageElement;
  duration: number;
}

interface OutfitComponentProps {
  outfit: Outfit;
  alt: string;
  className?: string;
}

const OutfitComponent = ({ outfit, alt, className }: OutfitComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);

  const hasMount =
    (outfit.lookmount && outfit.lookmount > 0) ||
    (outfit.mount && outfit.mount > 0);

  useEffect(() => {
    const sourceChanged = async () => {
      setFrames([]);

      if (!outfit) return;

      try {
        const url = outfitURL({
          ...outfit,
          mount: outfit.mount ?? outfit.lookmount ?? 0,
          resize: true,
        });
        console.log('Fetching outfit data from:', url);

        const response = await fetch(url);
        if (!response.ok) {
          console.error('Failed to fetch outfit data:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Received outfit data:', data);

        if (!data.frames || data.frames.length === 0) {
          console.error('No frames received:', data);
          return;
        }

        const framesPromises = data.frames.map((frame: any) => {
          return new Promise<Frame>((resolve, reject) => {
            const image = new Image();
            image.src = frame.image;
            image.onload = () => {
              resolve({
                ...frame,
                image,
              });
            };
            image.onerror = (error) => {
              console.error('Image failed to load:', frame.image, error);
              reject(error);
            };
          });
        });

        const newFrames = await Promise.all(framesPromises);
        setFrames(newFrames);
      } catch (error) {
        console.error('Error fetching outfit data:', error);
      }
    };

    sourceChanged();
  }, [outfit]);

  useEffect(() => {
    if (!canvasRef.current || frames.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frameIndex = 0;
    let frameStartTime = performance.now();

    const drawFrame = () => {
      const frame = frames[frameIndex];
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        frame.image,
        0,
        0,
        frame.image.width,
        frame.image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    const animate = (time: number) => {
      const elapsed = time - frameStartTime;
      if (elapsed >= frames[frameIndex].duration) {
        frameStartTime = time;
        frameIndex = (frameIndex + 1) % frames.length;
        drawFrame();
      }
      requestAnimationFrame(animate);
    };

    drawFrame();
    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [frames]);

  return (
    <div className={cn(`relative h-20 w-20`, className)}>
      <div
        className={`absolute ${
          hasMount ? '-bottom-1 -left-7' : '-left-8 bottom-4'
        }`}
      >
        {frames.length > 0 && outfit.looktype > 0 ? (
          <canvas
            ref={canvasRef}
            className='h-20 w-20 whitespace-nowrap'
            aria-details={alt}
            width={64}
            height={64}
          />
        ) : (
          <div>not</div>
        )}
      </div>
    </div>
  );
};

export default OutfitComponent;
