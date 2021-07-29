import {Grid, Container} from "@material-ui/core";
import {Map} from "../Map";
import PiChart from "../components/PiChart";
import ForceChart from "../components/ForceChart";

// ----------------------------------------------------------------------

export const DashboardApp: React.FC = props => {
    return (
        <Container maxWidth="xl">
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={8}>
                    <Map />
                </Grid>
                <Grid direction={"column"} xs={4}>
                    <Grid item>
                        <PiChart />
                    </Grid>
                    <Grid item>
                        <ForceChart />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};