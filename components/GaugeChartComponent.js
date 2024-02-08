import React from 'react';
import dynamic from "next/dynamic";

// Dynamic import of GaugeComponent
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeChartComponent = ({ id, percent, width }) => {
    const getColorSet = (score) => {
        if (score <= 30) return ["#e60000", "#ff3300"]; // Red to Orange for low scores
        if (score <= 60) return ["#FF5F6D", "#FFC371"]; // Orange to Yellow for medium scores
        return ["#85C1E9", "#52BE80"]; // Blue to Green for high scores
    };

    const colorSet = getColorSet(percent);

    return (
        <div style={{ width: 300 }} className='gauge-chart'>
            <GaugeComponent
                id={id} 
                value={percent}
 
                arc={{
                    colorArray: colorSet, // Using colorSet based on percent
                    nbSubArcs: [5],
                    padding: 0.02,
                    width: 0.2,
                }}
                pointer={{
                    elastic: true,
                    animationDelay: 0
                }}
            />
        </div>
    );
};

export default GaugeChartComponent;
