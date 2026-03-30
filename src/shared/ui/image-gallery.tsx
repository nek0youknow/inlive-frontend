"use client";

import { useState, useCallback, useMemo } from "react";
import {Dialog, DialogContent, DialogTitle} from "@/shared/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageGalleryProps = {
  images: string[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  const preloadImages = useMemo(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    return [prevIndex, nextIndex];
  }, [currentIndex, images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;

    if (e.key === "ArrowLeft") {
      setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
    } else if (e.key === "ArrowRight") {
      setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
    } else if (e.key === "Escape") {
      setLightboxOpen(false);
    }
  }, [lightboxOpen, images.length]);

  useState(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  });

  return (
      <>
        <div className="overflow-x-auto py-2">
          <div className="flex gap-2 sm:gap-3">
            {images.map((url, i) => (
                <button
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="flex-shrink-0 w-48 h-36 sm:w-56 sm:h-40 md:w-64 md:h-48 rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                      src={url}
                      alt={`Фото ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </button>
            ))}
          </div>
        </div>

        {lightboxOpen && (
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogTitle className="sr-only">Просмотр изображения</DialogTitle>
              <DialogContent className="md:min-w-6xl w-[90dvw] h-[90dvh]  p-0 bg-black/95 border-none">
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  {/* Кнопка закрытия */}
                  <button
                      onClick={closeLightbox}
                      className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      aria-label="Закрыть"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {images.length > 1 && (
                      <button
                          onClick={goPrev}
                          className="absolute left-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          aria-label="Предыдущее изображение"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                  )}

                  {images.length > 1 && (
                      <button
                          onClick={goNext}
                          className="absolute right-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          aria-label="Следующее изображение"
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                  )}

                  <img
                      key={currentIndex}
                      src={images[currentIndex]}
                      alt={`Фото ${currentIndex + 1}`}
                      className="max-w-full max-h-full object-contain select-none"
                      draggable={false}
                  />

                  {preloadImages.map((idx, index) => (
                      <link key={index} rel="preload" as="image" href={images[idx]} />
                  ))}

                  {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Перейти к изображению ${i + 1}`}
                            />
                        ))}
                      </div>
                  )}

                  {images.length > 1 && (
                      <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm">
                        {currentIndex + 1} / {images.length}
                      </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
        )}
      </>
  );
}