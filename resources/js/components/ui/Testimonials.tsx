import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import type { TestimonialsProps } from '@/types';

export function Testimonials({testimonials}: TestimonialsProps) {
    const plugin = React.useRef(
        AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })
    )

    return (
        <section className="text-slate-900 overflow-hidden">
            <div className="container px-4 mx-auto text-center mb-12">

                <h2 className="text-4xl md:text-4xl font-extrabold mb-4 tracking-tight">
                    Lo que dicen nuestros clientes
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto mb-6 text-lg">
                    Únase a una red global de líderes de opinión, desarrolladores de productos y creadores.
                </p>

            </div>

            {/* Contenedor del Carrusel con degradados laterales para suavizar la entrada/salida */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {[...testimonials, ...testimonials].map((t, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                                    <CardContent className="p-8 flex flex-col justify-between h-full gap-6">
                                        <div className="flex gap-0.5">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>

                                        <p className="text-slate-600 leading-relaxed">
                                            "{t.content}"
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 border border-slate-100">
                                                <AvatarImage src={t.avatar} alt={t.name} />
                                                <AvatarFallback className="bg-slate-100 text-slate-400">
                                                    {t.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                                                    {t.role}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
