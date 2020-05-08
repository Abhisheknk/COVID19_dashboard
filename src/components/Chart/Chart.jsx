import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line,Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths, active, closed}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
             setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length 
          ?(      
            <Line 
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed ),
                        label: 'Infected',
                        borderColor: '#fcba03',
                        fill: true,

                    } , {
                        data: dailyData.map(({ deaths }) => deaths ),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],

                }}
            /> 
          ) : null
        );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths', 'Active', 'Closed'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgb(237, 209, 71)',
                            'rgb(50, 168, 82)',
                            'rgb(27, 9, 46)',
                            'rgb(237, 17, 9)',
                            'rgb(6, 120, 120)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value, active, closed]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`}
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            <h4>Total number of Infected and Deaths</h4>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;