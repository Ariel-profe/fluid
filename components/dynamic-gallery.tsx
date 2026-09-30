import { useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Interfaces para el tipado estricto de las constantes de datos
interface ImageData {
    src: string;
    slotIndex: number;
}

interface ImageGroup {
    label: string;
    images: ImageData[];
}

const groupImages: ImageGroup[] = [
    {
        label: "Válvulas",
        images: [
            {
                src: "/common/1.jpg",
                slotIndex: 0
            }
        ]
    },
    {
        label: "Actuadores",
        images: [
            {
                src: "/common/2.jpg",
                slotIndex: 1
            }
        ]
    },
    {
        label: "Caños",
        images: [
            {
                src: "/common/3.jpg",
                slotIndex: 2
            }
        ]
    },
    {
        label: "Temperatura",
        images: [
            {
                src: "/common/4.jpg",
                slotIndex: 3
            }
        ]
    },
    {
        label: "Áreas clasificadas",
        images: [
            {
                src: "/common/5.jpg",
                slotIndex: 4
            }
        ]
    },
];

export const DynamicGallery = () => {
    // Tipado del useRef para un contenedor HTMLDivElement
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // gsap.utils.toArray devuelve un array de Element de TypeScript
        const allImgs: Element[] = gsap.utils.toArray(".anim-img");
        const targetSlots: Element[] = gsap.utils.toArray(".target-slot");

        // Tipado implícito correcto de la timeline de GSAP
        const tl: gsap.core.Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1800",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        const targetRadiusPx: number = 2.4;

        allImgs.forEach((item: Element) => {
            const dataSlot = item.getAttribute("data-slot");
            if (!dataSlot) return;

            const slotIdx: number = parseInt(dataSlot, 10);
            const slot: Element | undefined = targetSlots[slotIdx];

            if (!slot) return;

            const startRect: DOMRect = item.getBoundingClientRect();
            const endRect: DOMRect = slot.getBoundingClientRect();

            const deltaX: number =
                endRect.left +
                endRect.width / 2 -
                (startRect.left + startRect.width / 2);

            const deltaY: number =
                endRect.top +
                endRect.height / 2 -
                (startRect.top + startRect.height / 2);

            const scale: number = endRect.width / startRect.width;

            tl.to(
                item,
                {
                    x: deltaX,
                    y: deltaY,
                    scale: scale,
                    opacity: 1,
                    borderRadius: `${targetRadiusPx / scale}px`,
                    ease: "power2.inOut"
                },
                (slotIdx % 40) * 0.03 + Math.floor(slotIdx / 5) * 0.02
            );
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative container mx-auto px-3 w-full h-screen text-slate-800 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden"
        >
            <div className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground mb-10">
                Cada productos que comercializamos es garantía
                {
                    groupImages.map((group: ImageGroup, index: number) => (
                        <span key={index} className="contents">
                            <span className="relative inline-block align-middle w-7 h-7 md:w-8 md:h-8 mx-1">
                                {
                                    group.images.map((img: ImageData, imgIndex: number) => (
                                        <img
                                            key={imgIndex}
                                            src={img.src}
                                            alt={`Imagen ${img.slotIndex + 1}`}
                                            data-slot={img.slotIndex} // Agregado para que funcione el getAttribute del JS
                                            className={`anim-img absolute inset-0 w-full h-full object-cover rounded-sm transform-gpu ${imgIndex === 0 ? "z-10 opacity-100" : "z-0 opacity-0"
                                                }`}
                                        />
                                    ))
                                }
                            </span>{" "}
                            {group.label}
                            {index < groupImages.length - 1 ? ", " : "."}
                        </span>
                    ))
                }
            </div>

            <div className="relative container mx-auto px-3 z-0 w-full bg-white rounded-sm p-3 md:p-5 border border-black/10 shadow flex flex-col justify-center">
                <div className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                    {
                        Array.from({ length: 5 }).map((_, i: number) => (
                            <div
                                key={i}
                                className="target-slot aspect-square rounded-sm bg-black/2.5 overflow-hidden"
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
