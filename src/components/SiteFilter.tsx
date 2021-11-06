import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader} from "@material-ui/core";

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
class siteFilter extends React.Component<any, any> {
    public render() {
        const classes = this.props.classes;
        return <Card className={classes.root} variant="outlined"></Card>;
    }
}

export const SiteFilter = withStyles(styles as {})(siteFilter);
