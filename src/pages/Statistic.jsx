import PieChart, {
    Connector,
    Label,
    Legend,
    Series,
} from 'devextreme-react/pie-chart';
import CenterTemplate from '../components/Statistics/CenterTemplate';

const data = [
    { country: 1, commodity: 'Project 1', total: 21 },
    { country: 2, commodity: 'Project 2', total: 14 },
    { country: 3, commodity: 'Project 3', total: 5 },
    { country: 4, commodity: 'Project 4', total: 43 }
];

const Statistics = () => {
    //console.log(countries)
    const customizeLabel = (e) => `${e.argumentText}\n${e.valueText}h`;

    return (
        <div className='flex justify-center' style={{width:"100%"}}>
            <div className="pies-container" style={{width:"40%"}}>
                <PieChart
                    id="pie-chart"
                    key={data.country}
                    dataSource={data}
                    resolveLabelOverlapping="shift"
                    sizeGroup="piesGroup"
                    innerRadius={0.65}
                    centerRender={CenterTemplate}
                    type="doughnut"
                >
                    <Series
                    className='flex justify-center items-center'
                        argumentField="commodity"
                        valueField="total"
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
                    <Legend font={{size:"20px"}} margin={{top:150}} visible={true}></Legend>
                </PieChart>
            </div>
        </div>
    )
}

export default Statistics;