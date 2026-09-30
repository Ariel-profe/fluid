
export const ProductsPageHero = () => {
    return (
        <div className="relative container mx-auto overflow-hidden bg-primary py-12 px-6 sm:px-12 lg:px-16 rounded-sm shadow-xl">
            {/* Fondo con grilla técnica sutil */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:34px_34px]"></div>

            {/* Destellos de color para volumen visual */}
            <div className="absolute -top-24 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                {/* Textos Informativos */}
                <div className="space-y-5 max-w-xl">
                    <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                        Ingeniería y Conducción de Fluidos
                    </span>
                    <h2 className="text-2xl sm:text-3xl mt-3 font-bold tracking-tight text-white">
                        Productos para optimizar los <br /> procesos de abastecimiento industrial
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Explora nuestro catálogo certificado bajo estándares internacionales. <br /> Todo nuestro stock cuenta con soporte de ingeniería personalizado.
                    </p>
                </div>

                {/* Buscador Técnico Rápido */}
                <div className="w-full lg:w-1/2  p-5 ">
                
                </div>
            </div>
        </div>
    )
}
