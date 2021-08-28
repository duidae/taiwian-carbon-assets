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

function PiChart(props) {
    const classes = props.classes;
    const theme = useTheme();
    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main],
        labels: ["閒置空地", "建築物", "溼地", "林地"],
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: false, horizontalAlign: "center"},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: seriesName => seriesName,
                title: {
                    formatter: seriesName => `#${seriesName}`
                }
            }
        },
        plotOptions: {
            pie: {donut: {labels: {show: false}}}
        }
    });

    return (
        <Card className={classes.root}>
            <CardHeader title="公有資產盤點" />
            <div className={classes.chart}>
                <ReactApexChart className={classes.chart} type="pie" series={props.data} options={chartOptions} height={"95%"} />
            </div>
        </Card>
    );
}

export const PiChartComponent = withStyles(styles as {})(PiChart);
