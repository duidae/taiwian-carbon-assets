import {Grid, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {CarbonSinkEstimation, GoogleMap, PiChartComponent} from ".";
import {AppStore} from "stores";

const styles = theme => ({
    root: {
        height: "calc(100% - 64px)",
        paddingTop: "15px"
    },
    gridContainer: {
        height: "100%"
    },
    chartContainer: {
        display: "flex",
        flexDirection: "column"
    },
    chart: {
        flex: 1
    }
});

function DashboardContent(props) {
    const classes = props.classes;
    return (
        <Container className={classes.root} maxWidth="xl">
            <Grid className={classes.gridContainer} container direction={"row"} spacing={2}>
                <Grid item xs={8}>
                    <GoogleMap />
                </Grid>
                <Grid item xs={4} className={classes.chartContainer}>
                    <Grid item className={classes.chart}>
                        <CarbonSinkEstimation />
                    </Grid>
                    <Grid item className={classes.chart}>
                        <PiChartComponent data={AppStore.Instance.selectedPiChartData} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export const DashboardContentComponent = withStyles(styles as {})(DashboardContent);
