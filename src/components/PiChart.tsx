import {merge} from "lodash";
import ReactApexChart from "react-apexcharts";
import {useTheme, styled} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";
import BaseOptionChart from "./BaseOptionChart";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

/*
const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));
*/

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function PiChart() {
    const theme = useTheme();

    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main],
        labels: ["閒置空地", "建築物", "溼地", "林地"],
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: "center"},
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
            <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
            {/*<ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
      */}
        </Card>
    );
}