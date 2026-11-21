import React, { useEffect, useRef, useState } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  rootMargin?: string;
  threshold?: number;
  eager?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = 'w-full h-full',
  rootMargin = '200px 0px',
  threshold = 0.01,
  eager = false,
  onLoad,
  onError,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(
    () => eager || typeof IntersectionObserver === 'undefined'
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (isInView) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, rootMargin, threshold]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-slate-800/40 animate-pulse pointer-events-none"
        />
      )}
      {isInView && src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={(e) => {
            setIsLoaded(true);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            setIsLoaded(true);
            if (onError) onError(e);
          }}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...rest}
        />
      )}
    </div>
  );
};

export default LazyImage;
