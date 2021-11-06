import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

import {AppStore} from "stores";
import {ReduecCarbonMethod} from "models";

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
    private categories = Object.values(ReduecCarbonMethod).map(category => {
        return <MenuItem>{category}</MenuItem>;
    });

    private handleCategoryChange = (ev) => {
        AppStore.Instance.selectCarbonMethod(ev.target.value);
    };

    public render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root} variant="outlined">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">減碳方式</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={AppStore.Instance.selectCarbonMethod} label="減碳方式" onChange={this.handleCategoryChange}>
                        {this.categories}
                    </Select>
                </FormControl>
            </Card>
        );
    }
}

export const SiteFilter = withStyles(styles as {})(siteFilter);
