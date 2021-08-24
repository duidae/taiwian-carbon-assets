import {merge} from "lodash";
import ReactApexChart from "react-apexcharts";
import {useTheme} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";
import BaseOptionChart from "./BaseOptionChart";

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function PiChart() {
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
        <Card>
            <CardHeader title="公有資產盤點" />
            <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} />
        </Card>
    );
}
