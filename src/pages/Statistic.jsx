import ApexStackedBar from "../components/Statistics/ApexStackedBar";
import ApexTimeLineChar from "../components/Statistics/ApexTimeLineChart";
import PieChart from "../components/Statistics/PieChart";

const Statistics = () => {
    

    return (
        <div>
            <div className='flex justify-center flex-col' style={{ width: "100%" }}>
                <PieChart />
                <ApexTimeLineChar />
                <ApexStackedBar />
            </div>
        </div>
    )
}

export default Statistics;