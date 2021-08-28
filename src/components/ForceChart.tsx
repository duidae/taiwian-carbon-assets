import {merge} from "lodash";
import ReactApexChart from "react-apexcharts";
import {withStyles, useTheme} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";
import BaseOptionChart from "./BaseOptionChart";

const styles = theme => ({
    root: {
        height: "100%"
    },
    chart: {
        height: "calc(100% - 64px)"
    }
});

function ForceChart(props) {
    const classes = props.classes;
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
        <Card className={classes.root}>
            <CardHeader title="減碳策略" />
            <div className={classes.chart}>
                <ReactApexChart type="radar" series={props.data} options={chartOptions} height={"95%"} />
            </div>
        </Card>
    );
}

export const ForceChartComponent = withStyles(styles as {})(ForceChart);
