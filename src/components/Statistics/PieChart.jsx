import {
    Connector,
    Label,
    Legend,
    PieChart as PieChartLibrary,
    Series,
} from 'devextreme-react/pie-chart';
import { useEffect, useState } from 'react';
import projectsGateway from '../../gateways/projectsGateway';
import CenterTemplate from './CenterTemplate';

const PieChart = () => {
    const [data, setData] = useState([]);
    // const data = [
    //     { projectId: 1, projectTitle: 'Project 1', totalHours: 21 },
    //     { projectId: 2, projectTitle: 'Project 2', totalHours: 14 },
    //     { projectId: 3, projectTitle: 'Project 3', totalHours: 5 },
    //     { projectId: 4, projectTitle: 'Project 4', totalHours: 43 }
    // ];

    const customizeLabel = (e) => `${e.argumentText}\n${e.valueText}h`;

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await projectsGateway.GetProjectsSatistic();
            console.log(data);
            setData(data);
        }

        fetchData().catch(console.error)
    }, [])

    return (
        <div className="pies-container" style={{ width: "100%" }}>
            {
                data.length > 0 ?
                    (
                        <PieChartLibrary
                            id="pie-chart"
                            key={data.country}
                            dataSource={data}
                            resolveLabelOverlapping="shift"
                            sizeGroup="piesGroup"
                            innerRadius={0.65}
                            centerRender={CenterTemplate}
                            type="doughnut"
                            margin={{ left: 500 }}
                        >
                            <Series
                                className='flex justify-center items-center'
                                argumentField="projectTitle"
                                valueField="totalHours"
                            >
                                <Label
                                    font={{ size: "20px" }}
                                    visible={true}
                                    format="fixedPoint"
                                    customizeText={customizeLabel}
                                    backgroundColor="none"
                                >
                                    <Connector visible={true}></Connector>
                                </Label>
                            </Series>
                            <Legend font={{ size: "20px" }} margin={{ top: 150, right: 500 }} visible={true}></Legend>
                        </PieChartLibrary>
                    )
                    : (<></>)
            }

        </div>
    );
}

export default PieChart;