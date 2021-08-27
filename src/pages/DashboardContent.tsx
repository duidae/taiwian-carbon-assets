import {Grid, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {GoogleMap} from "../GoogleMap";
import {PiChart, ForceChart} from "../components";
import {AppStore} from "../stores";

const styles = theme => ({
    root: {
        height: 'calc(100% - 64px)',
        paddingTop: "15px",
    },
    gridContainer: {
        height: "100%"
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
                <Grid direction={"column"} xs={4}>
                    <Grid item>
                        <PiChart data={AppStore.Instance.selectedPiChartData} />
                    </Grid>
                    <Grid item>
                        <ForceChart data={AppStore.Instance.selectedForceChartData} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export const DashboardContentComponent = withStyles(styles as {})(DashboardContent);
