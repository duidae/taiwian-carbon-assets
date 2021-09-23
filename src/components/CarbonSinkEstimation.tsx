import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Slider} from "@material-ui/core";

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

    function percentageText(value) {
        return `${value}%`;
    }

    return (
        <Card className={classes.root}>
            <CardHeader title="碳匯估算" />
            <Slider aria-label="Custom marks" defaultValue={50} getAriaValueText={percentageText} step={10} valueLabelDisplay="on" marks={percentages} />
        </Card>
    );
}

export const CarbonSinkEstimation = withStyles(styles as {})(CarbonSink);
