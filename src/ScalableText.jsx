// src/ScalableText.js
import React, { useState, useEffect, useRef } from "react";

const ScalableText = ({ text }) => {
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    const [fontSize, setFontSize] = useState(20);

    const containerRef = useRef(null);

    useEffect(() => {
        const updateSvgSize = () => {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;

            const newFontSize = Math.min(containerWidth / 10, containerHeight);
            setFontSize(newFontSize);

            const svgTextWidth = text.length * newFontSize * 0.6;
            const svgTextHeight = newFontSize * 1.2;

            setSvgSize({
                width: Math.min(svgTextWidth, containerWidth),
                height: Math.min(svgTextHeight, containerHeight),
            });
        };

        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        return () => window.removeEventListener("resize", updateSvgSize);
    }, [text, fontSize]);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
            ref={containerRef}
        >
            <svg
                width={svgSize.width}
                height={svgSize.height}
                viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    height: "70%",
                    width: "80%",
                    objectFit: "contain",
                }}
            >
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize={fontSize}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

export default ScalableText;
