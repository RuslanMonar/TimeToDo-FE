import PieChart from "../components/Statistics/PieChart";
import StackedBar from "../components/Statistics/StackedBarChart";
import TimelineChart from "../components/Statistics/TimelineChart";

const Statistics = () => {
    

    return (
        <div>
            <div className='flex justify-center flex-col' style={{ width: "100%" }}>
                <PieChart />
                <TimelineChart/>
                <StackedBar />
            </div>
        </div>
    )
}

export default Statistics;