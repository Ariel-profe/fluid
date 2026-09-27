"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Valves {
    description: string;
    title: string;
    src: string;
}
interface Colors {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
}
interface FontSizes {
    name?: string;
    designation?: string;
    quote?: string;
}
interface CircularTestimonialsProps {
    valves: Valves[];
    autoplay?: boolean;
    colors?: Colors;
    fontSizes?: FontSizes;
}

function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const ValveExperience = ({
    valves,
    autoplay = true,
    colors = {},
    fontSizes = {},
}: CircularTestimonialsProps) => {

    const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
    
    // Color & font config
    const colorName = colors.name ?? "#000";
    const colorDesignation = colors.designation ?? "#6b7280";
    const colorTestimony = colors.testimony ?? "#4b5563";
    const colorArrowBg = colors.arrowBackground ?? "#295d85";
    const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
    const fontSizeName = fontSizes.name ?? "1.5rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);
    const [isMobile, setIsMobile] = useState(true);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const valvesLength = useMemo(() => valves.length, [valves]);
    const activeTestimonial = useMemo(
        () => valves[activeIndex],
        [activeIndex, valves]
    );

    // Responsive detection & width calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
            setIsMobile(window.innerWidth < 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % valvesLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, valvesLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex, valvesLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % valvesLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [valvesLength]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + valvesLength) % valvesLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [valvesLength]);

    // Compute transforms for each image
    function getImageStyle(index: number): React.CSSProperties {
        const isActive = index === activeIndex;

        if (isMobile) {
            return {
                zIndex: isActive ? 3 : 1,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transform: `translateX(0px) translateY(0px) scale(${isActive ? 1 : 0.95})`,
                transition: "all 0.5s ease-in-out",
            };
        }

        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const isLeft = (activeIndex - 1 + valvesLength) % valvesLength === index;
        const isRight = (activeIndex + 1) % valvesLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div ref={headRef} className="testimonial-container container mx-auto my-10 lg:my-20">
            <div className="valve-grid">
                {/* Images */}
                <div className="image-container" ref={imageContainerRef}>
                    {valves.map((valve, index) => (
                        <img
                            key={valve.src}
                            src={valve.src}
                            alt={valve.title}
                            className="testimonial-image"
                            data-index={index}
                            style={getImageStyle(index)}
                        />
                    ))}
                </div>
                {/* Content */}
                <div className="testimonial-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h3
                                className="name"
                                style={{ color: colorName, fontSize: isMobile ? "1.5rem" : fontSizeName }}
                            >
                                {activeTestimonial.title}
                            </h3>
                            <motion.p
                                className="quote"
                                style={{ color: colorTestimony, fontSize: isMobile ? "1rem" : fontSizeQuote }}
                            >
                                {activeTestimonial.description.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.22,
                                            ease: "easeInOut",
                                            delay: 0.025 * i,
                                        }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="arrow-buttons">
                        <button
                            className="arrow-button prev-button"
                            onClick={handlePrev}
                            style={{
                                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverPrev(true)}
                            onMouseLeave={() => setHoverPrev(false)}
                            aria-label="Previous testimonial"
                        >
                            <MoveLeft size={20} color={colorArrowFg} />
                        </button>
                        <button
                            className="arrow-button next-button"
                            onClick={handleNext}
                            style={{
                                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverNext(true)}
                            onMouseLeave={() => setHoverNext(false)}
                            aria-label="Next testimonial"
                        >
                            <MoveRight size={20} color={colorArrowFg} />
                        </button>
                    </div>
                </div>
            </div>
            
          <style jsx>{`
                .testimonial-container {
                    width: 100%;
                    max-width: 56rem;
                    padding: 1rem;
                    margin-left: auto;
                    margin-right: auto;
                }
                .valve-grid {
                    display: grid;
                    gap: 1.5rem;
                }
                .image-container {
                    position: relative;
                    width: 100%;
                    height: 16rem;
                    perspective: 1000px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .testimonial-image {
                    position: absolute;
                    width: 95%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    background-color: white;
                }
                .testimonial-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    text-align: center;
                    padding-right: 12px;
                    padding-left: 12px;
                }
                .name {
                    margin-top: 1rem;
                    margin-bottom: 0.75rem;
                    font-weight: 700;
                }
                .quote {
                    line-height: 1.6;
                    min-height: 5rem;
                }
                .arrow-buttons {
                    display: flex;
                    gap: 1.5rem;
                    padding-top: 2rem;
                    justify-content: center;
                }
                .arrow-button {
                    width: 2.75rem;
                    height: 2.75rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                    border: none;
                }
                .arrow-button:active {
                    transform: scale(0.95);
                }
                
                /* --- MEDIA QUERIES PARA ESCRITORIO (MD EN ADELANTE) --- */
                @media (min-width: 768px) {
                    .testimonial-container {
                        padding: 2rem;
                    }
                    .valve-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 5rem;
                    }
                    .image-container {
                        height: 24rem;
                        margin-bottom: 0;
                    }
                    .testimonial-image {
                        width: 100%;
                    }
                    .testimonial-content {
                        text-align: left;
                        justify-content: space-between;
                    }
                    .name {
                        margin-top: 0;
                        margin-bottom: 0.25rem;
                    }
                    .quote {
                        line-height: 1.75;
                        min-height: auto;
                    }
                    .arrow-buttons {
                        padding-top: 3rem;
                        justify-content: flex-start;
                    }
                    .arrow-button {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

