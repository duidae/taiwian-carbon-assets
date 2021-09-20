import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";

const styles = theme => ({
    root: {
        height: "100%"
    },
    chart: {
        height: "calc(100% - 64px)"
    }
});

function CarbonSink(props) {
    const classes = props.classes;

    return (
        <Card className={classes.root}>
            <CardHeader title="碳匯估算" />
            <div className={classes.chart}>
            </div>
        </Card>
    );
}

export const CarbonSinkEstimation = withStyles(styles as {})(CarbonSink);
