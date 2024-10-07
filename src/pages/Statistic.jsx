import ApexTimeLineChar from "../components/Statistics/ApexTimeLineChart";
import PieChart from "../components/Statistics/PieChart";
import StackedBar from "../components/Statistics/StackedBarChart";

const Statistics = () => {
    

    return (
        <div>
            <div className='flex justify-center flex-col' style={{ width: "100%" }}>
                <PieChart />
                {/* <TimelineChart/> */}
                <ApexTimeLineChar />
                <StackedBar />
            </div>
        </div>
    )
}

export default Statistics;