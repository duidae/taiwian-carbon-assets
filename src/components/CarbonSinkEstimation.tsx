import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Slider} from "@material-ui/core";

import {AppStore} from "stores";

const CO2_EQ = 50.9; // 1 m^2 solar panel can reduce 50.9 kg equivalent weight of CO2 (Taipei area)

const styles = theme => ({
    root: {
        height: "100%"
    }
});

function CarbonSink(props) {
    const classes = props.classes;

    const percentages = [
        {
            value: 50,
            label: "50%"
        },
        {
            value: 25,
            label: "25%"
        },
        {
            value: 10,
            label: "10%"
        }
    ];

    const percentageText = value => {
        return `${value}%`;
    };

    const carbonSinkValue = percentage => {
        return AppStore.Instance.selectedAreaSolarPanelArea * percentage * CO2_EQ;
    };

    const formulaDescription = (
        <p>
            台北市10平方公尺（約3坪）的屋頂可利用面積
            <br />
            ＝1kWp的裝置容量
            <br />
            ＝每年大概發電1000度電
            <br />
            ＝約可減下509公斤的二氧化碳當量
        </p>
    );

    return (
        <Card className={classes.root}>
            <CardHeader title="碳匯估算" />
            <Slider aria-label="Custom marks" defaultValue={50} getAriaValueText={percentageText} step={10} valueLabelDisplay="on" marks={percentages} />
            <p>預估每年效益</p>
            {`約可減下${carbonSinkValue(50)}公斤CO2當量`}
            {"計算公式"}
        </Card>
    );
}

export const CarbonSinkEstimation = withStyles(styles as {})(CarbonSink);
