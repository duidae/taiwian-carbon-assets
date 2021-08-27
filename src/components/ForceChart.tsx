import {merge} from "lodash";
import ReactApexChart from "react-apexcharts";
import {useTheme} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";
import BaseOptionChart from "./BaseOptionChart";

export const ForceChart = props => {
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
            <ReactApexChart type="radar" series={props.data} options={chartOptions} />
        </Card>
    );
};
