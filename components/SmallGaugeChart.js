import React from 'react';
import dynamic from "next/dynamic";

// Dynamic import of GaugeComponent
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const SmallGaugeChart = ({ id, percent, width }) => {
    const getColorSet = (score) => {
        if (score <= 30) return ["#e60000", "#ff3300"]; // Red to Orange for low scores
        if (score <= 60) return ["#FF5F6D", "#FFC371"]; // Orange to Yellow for medium scores
        return ["#85C1E9", "#52BE80"]; // Blue to Green for high scores
    };

    const colorSet = getColorSet(percent);

    return (
        <div style={{ width: '300px' }} className='gauge-chart gauge-chart-sm'>
            {/* <GaugeComponent
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
            /> */}

<GaugeComponent
id={id}
  value={percent}
  type="radial"
  labels={{
    tickLabels: {
      type: "inner",
      ticks: [
        { value: 20 },
        { value: 40 },
        { value: 60 },
        { value: 80 },
        { value: 100 }
      ]
    }
  }}
  arc={{
    colorArray: colorSet, // Using colorSet based on percent
    subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
    padding: 0.02,
    width: 0.3
  }}
  pointer={{
    elastic: true,
    animationDelay: 0
  }}
/>
        </div>
    );
};

export default SmallGaugeChart;
