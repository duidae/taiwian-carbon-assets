import {Grid, Container} from '@material-ui/core';
import {Map} from "../Map";
import PiChart from "../components/PiChart";
import ForceChart from "../components/ForceChart";

// ----------------------------------------------------------------------

export const DashboardApp: React.FC = props => {
  return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Map />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PiChart />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ForceChart />
          </Grid>
        </Grid>
      </Container>
  );
}
