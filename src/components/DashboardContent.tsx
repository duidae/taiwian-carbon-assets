import {Grid, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {CarbonSinkEstimation, GoogleMap, PiChartComponent, SiteFilter, SitePicture, SiteInfo} from ".";
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
    const selectedArea = props.selectedArea;
    const classes = props.classes;
    return (
        <Container className={classes.root} maxWidth="xl">
            <Grid className={classes.gridContainer} container direction={"row"} spacing={2}>
                <Grid item xs={7}>
                    <GoogleMap />
                </Grid>
                {selectedArea !== "案場媒合" ? (
                    <Grid item xs={5} className={classes.chartContainer}>
                        <Grid item className={classes.chart}>
                            <CarbonSinkEstimation />
                        </Grid>
                        <Grid item className={classes.chart}>
                            <PiChartComponent data={AppStore.Instance.selectedPiChartData} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs={5} className={classes.chartContainer}>
                        <Grid item className={classes.chart}>
                            <SiteFilter />
                        </Grid>
                        <Grid item className={classes.chart}>
                            <SiteInfo />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export const DashboardContentComponent = withStyles(styles as {})(DashboardContent);
