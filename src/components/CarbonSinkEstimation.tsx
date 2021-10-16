import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Slider, Tooltip, Typography} from "@material-ui/core";

import {AppStore} from "stores";

const styles = theme => ({
    root: {
        height: "100%"
    },
    sliderContainer: {
        margin: "20px"
    },
    formula: {
        textDecoration: "underline dashed"
    }
});

@observer
class CarbonSink extends React.Component<any, any> {
    private percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => {
        return {value: val, label: `${val}%`};
    });

    private percentageText = value => {
        return `${Math.floor(value)}%`;
    };

    private handlSliderChange = (ev, newValue) => {
        AppStore.Instance.setCoverRatio(newValue);
    };

    private workAroundForSquareMeter = () => {
        const desc = AppStore.Instance.selectedAreaGreenFacilityDescription.desc;
        return desc?.includes("平方公尺") ? (
            <React.Fragment>
                {desc.replace("平方公尺", "")}m<sup>2</sup>
            </React.Fragment>
        ) : desc;
    };

    public render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root} variant="outlined">
                <CardHeader title="碳匯估算" />
                <Typography variant="h5" noWrap>
                    {this.workAroundForSquareMeter()}
                </Typography>
                <br />
                <Typography variant="h6" noWrap>
                    {AppStore.Instance.selectedAreaGreenFacilityDescription.type}覆蓋率 {Math.floor(AppStore.Instance.coverRatio * 100)}%
                </Typography>
                <div className={classes.sliderContainer}>
                    <Slider
                        aria-label="Custom marks"
                        value={Math.floor(AppStore.Instance.coverRatio * 100)}
                        defaultValue={40}
                        getAriaValueText={this.percentageText}
                        step={1}
                        valueLabelDisplay="on"
                        marks={this.percentages}
                        onChange={this.handlSliderChange}
                    />
                </div>
                <br />
                <Typography variant="h6" noWrap>
                    預估每年效益可減下CO<sub>2</sub>當量數
                </Typography>
                <br />
                <Typography variant="h3" noWrap>
                    <b>{`${AppStore.Instance.carbonSink} 公噸 `}</b>
                </Typography>
                <Tooltip title={<p>綠能發電量1000度電/年＝約可減下509公斤的二氧化碳當量, 台北市10平方公尺(約3坪)的屋頂可利用面積＝1kWp的裝置容量</p>}>
                    <p className={classes.formula}>計算公式</p>
                </Tooltip>
            </Card>
        );
    }
}

export const CarbonSinkEstimation = withStyles(styles as {})(CarbonSink);
