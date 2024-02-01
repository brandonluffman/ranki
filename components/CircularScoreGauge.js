import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const CircularScoreGauge = ({ score }) => {
    const data = {
        datasets: [{
            data: [score, 100 - score],
            backgroundColor: [
                '#4bb543',
                'rgba(255, 255, 255, .1)'
            ],
            borderColor: [
                'rgba(255, 255, 255, .5)',
                'rgba(255, 255, 255, .1)'
            ],
            borderWidth: 1,
            cutout: '70%',
        }],
        labels: [
            'Score',
            'Remaining'
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        circumference: 360,
        rotation: 270
    };

    return <Doughnut data={data} options={options} />;
};

export default CircularScoreGauge;
