import { EditorialBreak } from "@/components/about/editorial-break";
import { Gallery } from "@/components/about/gallery";
import { Logistics } from "@/components/about/logistics";
import { Values } from "@/components/about/values";
import { PageHero } from "@/components/page-hero";

export default function AboutPage(){




    return (
        <section>
            <PageHero
                subtitle="Nosotros"
                title="Construimos soluciones industriales."
            />
            <Values/>
            <Gallery />
            <Logistics />
            <EditorialBreak />
        </section>
    )
}