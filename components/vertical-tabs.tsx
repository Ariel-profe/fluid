"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Zap, Target, Sparkles, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccordionItem {
    id: number;
    title: string;
    Icon: LucideIcon;
    imgSrc: string;
    description: string;
}

interface AccordionButtonProps {
    item: AccordionItem;
    isOpen: boolean;
    onClick: () => void;
}

interface AccordionContentProps {
    item: AccordionItem;
}

export default function VerticalTabs() {
    const [openId, setOpenId] = useState(items[0].id);

    return (
        <div className="container mx-auto px-3 py-10 lg:py-20">
            <Card className="mx-auto w-full overflow-hidden p-0">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:h-125">
                        {/* Left Section: Accordion Buttons */}
                        <div className="w-full  md:w-1/3">
                            {items.map((item) => (
                                <AccordionButton
                                    key={item.id}
                                    item={item}
                                    isOpen={openId === item.id}
                                    onClick={() => setOpenId(item.id)}
                                />
                            ))}
                        </div>

                        {/* Right Section: Accordion Content */}
                        <div className="relative w-full md:w-2/3">
                            <AnimatePresence mode="wait">
                                {items.map(
                                    (item) =>
                                        openId === item.id && (
                                            <AccordionContent key={item.id} item={item} />
                                        )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function AccordionButton({ item, isOpen, onClick }: AccordionButtonProps) {
    return (
        <Button
            variant="ghost"
            className={`w-full justify-start rounded-none px-4 py-6 text-left text-zinc-900 transition-all ${isOpen ? "bg-primary/10" : "hover:bg-primary/5"
                }`}
            onClick={onClick}>
            <item.Icon className="mr-3 h-5 w-5" />
            <span className="font-semibold">{item.title}</span>
        </Button>
    );
}

function AccordionContent({ item }: AccordionContentProps) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}>
            <div className="p-6 grow overflow-y-auto">
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="mb-6 text-gray-600">{item.description}</p>
            </div>
            <div className="relative h-64 md:h-80 w-full">
                <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </motion.div>
    );
}

const items: AccordionItem[] = [
    {
        id: 1,
        title: "Innovate",
        Icon: Lightbulb,
        imgSrc: "/common/1.jpg",
        description:
            "Spark creativity and drive innovation in your organization with cutting-edge strategies and tools.",
    },
    {
        id: 2,
        title: "Accelerate",
        Icon: Zap,
        imgSrc: "/common/2.jpg",
        description:
            "Supercharge your processes and workflows to achieve unprecedented speed and efficiency.",
    },
    {
        id: 3,
        title: "Focus",
        Icon: Target,
        imgSrc: "/common/3.jpg",
        description:
            "Sharpen your team's focus on key objectives and priorities to maximize impact and results.",
    },
    {
        id: 4,
        title: "Transform",
        Icon: Sparkles,
        imgSrc: "/common/4.jpg",
        description:
            "Embrace digital transformation to revolutionize your business and stay ahead of the competition.",
    },
];