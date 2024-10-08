import {
    Animation,
    ArgumentAxis,
    Chart,
    CommonSeriesSettings,
    Legend,
    SeriesTemplate,
    Tick,
    Title,
} from 'devextreme-react/chart';
import dataSource from './data.js';

const TimelineChart = () => {
    const axisCategories = ['Royal Houses'];
    return (
        <div className='pl-20 pr-20 pt-20'>
            <Chart
                id="chart"
                dataSource={dataSource}
                barGroupPadding={0.2}
                rotated={true}
            >
                <ArgumentAxis categories={axisCategories}>
                    <Tick visible={false} />
                </ArgumentAxis>
                <Title
                    text="The British Monarchy"
                    subtitle="An Abbreviated Timeline"
                />
                <CommonSeriesSettings
                    type="rangebar"
                    argumentField="monarch"
                    rangeValue1Field="start"
                    rangeValue2Field="end"
                    barOverlapGroup="monarch"
                    minBarSize={4}
                ></CommonSeriesSettings>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                >
                    <Title text="Royal Houses" />
                </Legend>
                <SeriesTemplate nameField="house" />
                <Animation enabled={false} />
            </Chart>
        </div>
    );
};



export default TimelineChart;