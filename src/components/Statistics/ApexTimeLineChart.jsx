import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import projectsGateway from '../../gateways/projectsGateway';

const ApexTimeLineChar = () => {
    const [chartData, setchartData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await projectsGateway.GetProjectsTimeline()
            setchartData({
                series: transformChartData(result.data),
                options: {
                    chart: {
                        height: 750,
                        type: 'rangeBar',
                        //redrawOnWindowResize: true
                    },
                    colors: [
                        "#ff5754", // Яскраво-червоний
                        "#29abe2", // Яскраво-блакитний
                        "#fed94e", // Яскраво-жовтий
                        "#8cc152", // Салатовий (світло-зелений)
                        "#f06eaa", // Рожевий
                        "#73c8e8", // Світло-блакитний
                        "#ffd966", // Світло-жовтий
                        "#e09f40"  // Помаранчевий
                    ],
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            barHeight: '100%',
                            rangeBarGroupRows: true,
                            borderRadiusWhenStacked: 'last',
                        },
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    yaxis: {
                        title: {
                            text: 'Projects',
                        },
                    },
                    legend: {
                        position: 'top',
                    },
                    title: {
                        text: 'Tasks Timeline',
                    },
                },
            })
        }

        fetchData().catch(console.error)
    }, [])

    const transformChartData = (data) => {
        return data.map(project => ({
          name: project.name,
          data: project.data.map(task => ({
            x: task.x,
            y: [
              new Date(task.y[0]).getTime(), 
              new Date(task.y[1]).getTime(),
            ],
          })),
        }));
      };

    return (
        <div className="m-16 rounded-md" style={{backgroundColor:"white"}}>
            {
                Object.keys(chartData).length === 0 && chartData.constructor === Object ?
                    (<></>)
                    :
                    (<Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="rangeBar"
                        height={750}
                    />)
            }

        </div>
    );
};

export default ApexTimeLineChar;
