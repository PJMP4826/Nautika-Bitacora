type AnimatedWaveProps = {
    speed?: number; // Multiplicador de velocidad (1 = normal, 2 = doble velocidad)
    color?: string; // Color de la ola
    opacity1?: number; // Opacidad de la primera capa
    opacity2?: number; // Opacidad de la segunda capa
    opacity3?: number; // Opacidad de la tercera capa
    height?: string; // Altura del SVG (ej: "30vw", "200px")
    maxHeight?: string; // Altura máxima
};

export const AnimatedWave = ({
                                 speed = 1,
                                 color = "#1b75be",
                                 opacity1 = 1,
                                 height = "7vw",
                                 maxHeight = "200px"
                             }: AnimatedWaveProps) => {
    const duration1 = 7 / speed;
    const duration2 = 6 / speed;
    const duration3 = 3 / speed;
    const delay1 = -2 / speed;
    const delay2 = -3 / speed;
    const delay3 = -4 / speed;

    return (
        <>
            <svg
                className="svg-wave"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: height,
                    maxHeight: maxHeight,
                    transform: "rotate(180deg)"
                }}
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="waves">
                    <use
                        className="w-layer-1"
                        xlinkHref="#gentle-wave"
                        x="50"
                        y="0"
                        fill={color}
                        fillOpacity={opacity1}
                    />
                </g>
            </svg>

            <style>{`
                .w-layer-1 {
                    animation: wave-animation ${duration1}s ${delay1}s linear infinite;
                }

                .w-layer-2 {
                    animation: wave-animation ${duration2}s ${delay2}s linear infinite;
                }

                .w-layer-3 {
                    animation: wave-animation ${duration3}s ${delay3}s linear infinite;
                }

                @keyframes wave-animation {
                    0% {
                        transform: translate(-90px, 0%);
                    }
                    100% {
                        transform: translate(85px, 0%);
                    }
                }
            `}</style>
        </>
    );
};
