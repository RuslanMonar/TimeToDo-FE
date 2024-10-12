import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import projectsGateway from "../../gateways/projectsGateway";

const ApexStackedBar = () => {
    const [chartData, setchartData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await projectsGateway.GetProjectsStatisticTimeRange();
            const weekStartDates = result.data[0].weekStartDates.map(date => {
                const parsedDate = new Date(date);
                return parsedDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short'
                });
            });
            setchartData({
                series: result.data.map(project => ({
                    name: project.name,
                    data: project.data
                })),
                options: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
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
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            borderRadius: 10,
                            borderRadiusApplication: 'end', // 'around', 'end'
                            borderRadiusWhenStacked: 'last', // 'all', 'last'
                            dataLabels: {
                                total: {
                                    enabled: true,
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 900
                                    }
                                }
                            }
                        },
                    },
                    xaxis: {
                        type: 'category',
                        categories: weekStartDates,
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1
                    },
                    title: {
                        text: 'Project Focus Time by Weeks',
                    },
                },
            });
        }

        fetchData().catch(console.error)
    }, [])


    return (
        <div className="m-16 rounded-md" style={{backgroundColor:"white"}}>
            {
                Object.keys(chartData).length === 0 && chartData.constructor === Object ?
                    (<></>)
                    :
                    (
                        <div id="chart">
                            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
                        </div>
                    )
            }

        </div>
    );
}

export default ApexStackedBar;