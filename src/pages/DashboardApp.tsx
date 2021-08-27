import {Grid, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {GoogleMap} from "../GoogleMap";
import {PiChart, ForceChart} from "../components";
import {AppStore} from "../stores";

const styles = theme => ({
    root: {
    }
});

function DashboardContent(props) {
    return (
        <Container maxWidth="xl">
            <Grid container direction={"row"} spacing={2}>
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
};

export const DashboardContentComponent = withStyles(styles as {})(DashboardContent);
