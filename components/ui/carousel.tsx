"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel(): CarouselContextProps {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps): React.ReactNode {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactNode {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactNode {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<"button">): React.ReactNode {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Anterior"
      className={cn(
        "absolute inline-flex size-10 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground/80 backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        orientation === "horizontal"
          ? "top-1/2 -left-4 -translate-y-1/2 max-[850px]:left-2"
          : "-top-4 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowLeft className="size-4" />
    </button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<"button">): React.ReactNode {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Siguiente"
      className={cn(
        "absolute inline-flex size-10 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground/80 backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        orientation === "horizontal"
          ? "top-1/2 -right-4 -translate-y-1/2 max-[850px]:right-2"
          : "-bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowRight className="size-4" />
    </button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
