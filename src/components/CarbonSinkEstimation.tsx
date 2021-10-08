import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Slider, Tooltip, Typography} from "@material-ui/core";

import {AppStore} from "stores";

// 1 m^2 solar panel can reduce 0.0509 mt (50.9 kg) equivalent weight of CO2 (Taipei area)
const CO2_EQ = 0.0509; 

const styles = theme => ({
    root: {
        height: "100%"
    },
    slider: {
        padding: "5px",
    },
    formula: {
        textDecoration: "underline dashed"
    }
});

@observer
class CarbonSink extends React.Component<any, any> {
    private percentages = [
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

    private percentageText = value => {
        return `${value}%`;
    };

    private carbonSinkValue = percentage => {
        return Math.floor(AppStore.Instance.selectedAreaSolarPanelArea * percentage * CO2_EQ)?.toLocaleString();
    };

    private formulaDescription = (
        <p>
            台北市10平方公尺(約3坪)的屋頂可利用面積
            <br />
            ＝1kWp的裝置容量
            <br />
            ＝每年大概發電1000度電
            <br />
            ＝約可減下509公斤的二氧化碳當量
        </p>
    );

    private handlSliderChange = (ev, newValue) => {
        AppStore.Instance.setSolarCoverRatio(newValue);
    };

    public render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root} variant="outlined">
                <CardHeader title="碳匯估算" />
                <Typography variant="h5" noWrap>
                    公有建築頂層面積約
                    <b> {AppStore.Instance.selectedAreaSolarPanelArea?.toLocaleString()} </b>
                    m<sup>2</sup>
                </Typography>
                <br/><br/>
                <Typography variant="h6" noWrap>
                    太陽能板覆蓋率
                </Typography>
                <div className={classes.slider}>
                    <Slider className={classes.slider} aria-label="Custom marks" defaultValue={45} getAriaValueText={this.percentageText} step={1} valueLabelDisplay="on" marks={this.percentages} onChange={this.handlSliderChange} />
                </div>
                <br/><br/>
                <Typography variant="h5" noWrap>
                    預估每年效益可減下
                </Typography>
                <br/>
                <Typography variant="h3" noWrap>
                    <b>{`${this.carbonSinkValue(AppStore.Instance.solarCoverRatio)} 公噸 `}</b>
                    CO<sub>2</sub>當量
                </Typography>
                <Tooltip title={this.formulaDescription}>
                    <p className={classes.formula}>計算公式</p>
                </Tooltip>
            </Card>
        );
    }
}

export const CarbonSinkEstimation = withStyles(styles as {})(CarbonSink);
