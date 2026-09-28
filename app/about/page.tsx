import { EditorialBreak } from "@/components/editorial-break";
import { PageHero } from "@/components/page-hero";

export default function AboutPage(){




    return (
        <section className="container mx-auto px-3">
            <PageHero
                subtitle="Nosotros"
                title="Construimos soluciones industriales."
            />
            <EditorialBreak />
        </section>
    )
}