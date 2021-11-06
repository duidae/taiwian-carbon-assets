import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Slider, Tooltip, Typography} from "@material-ui/core";

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
class siteInfo extends React.Component<any, any> {
    public render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root} variant="outlined">
                <CardHeader title="案場資訊" />
                <Typography variant="h5" noWrap></Typography>
                <br />
                <Typography variant="h6" noWrap>
                    {AppStore.Instance.selectedAreaGreenFacilityDescription.type}覆蓋率 {Math.floor(AppStore.Instance.coverRatio * 100)}%
                </Typography>
                <Typography variant="h6" noWrap>
                    預估每年效益可減下CO<sub>2</sub>當量數
                </Typography>
                <br />
            </Card>
        );
    }
}

export const SiteInfo = withStyles(styles as {})(siteInfo);
