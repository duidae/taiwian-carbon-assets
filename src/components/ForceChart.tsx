import {merge} from "lodash";
import ReactApexChart from "react-apexcharts";
import {useTheme} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";
import BaseOptionChart from "./BaseOptionChart";

const CHART_DATA = [
    {name: "光電設施", data: [80, 50, 30, 40, 100, 20]},
    {name: "探捕捉設施", data: [20, 30, 40, 80, 20, 80]},
    {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
];

export default function AppCurrentSubject() {
    const theme = useTheme();

    const chartOptions = merge(BaseOptionChart(), {
        stroke: {width: 2},
        fill: {opacity: 0.48},
        legend: {floating: false, horizontalAlign: "center"},
        xaxis: {
            categories: ["節能", "減碳", "開發經費", "環境評估", "綜和效益", "人力"],
            labels: {
                style: {
                    colors: [theme.palette.text.secondary, theme.palette.text.secondary, theme.palette.text.secondary, theme.palette.text.secondary, theme.palette.text.secondary, theme.palette.text.secondary]
                }
            }
        }
    });

    return (
        <Card>
            <CardHeader title="減碳策略" />
            <ReactApexChart type="radar" series={CHART_DATA} options={chartOptions}/>
        </Card>
    );
}
