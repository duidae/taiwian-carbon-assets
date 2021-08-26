import {Grid, Container} from "@material-ui/core";
import {GoogleMap} from "../GoogleMap";
import PiChart from "../components/PiChart";
import ForceChart from "../components/ForceChart";

import {AppStore} from "../stores";

export const DashboardApp: React.FC = props => {
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
