import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

import {AppStore} from "stores";
import {ReduecCarbonMethod} from "models";

const styles = theme => ({
    root: {
        height: "100%"
    },
    content: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    formControl: {
        minWidth: 140,
        marginRight: 10
    },
    textField: {
        width: 170
    },
    lastTextField: {
        width: 170,
        marginLeft: 5
    },
    searchButton: {
        marginLeft: 15
    }
});

@observer
class siteFilter extends React.Component<any, any> {
    private categories = Object.values(ReduecCarbonMethod).map(category => {
        return <MenuItem value={category}>{category}</MenuItem>;
    });

    private handleCategoryChange = ev => {
        AppStore.Instance.selectCarbonMethod(ev.target.value);
    };

    public render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.content}>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="demo-simple-select-label">減碳方式</InputLabel>
                        <Select value={AppStore.Instance.filterCarbonType} label="減碳方式" onChange={this.handleCategoryChange}>
                            {this.categories}
                        </Select>
                    </FormControl>
                    <Divider orientation="vertical" flexItem />
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <TextField
                                label="年減量額度"
                                className={classes.textField}
                                value={AppStore.Instance.filterRangeLowerBound}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">tCO2e/yr</InputAdornment>
                                }}
                                variant="outlined"
                            />
                        }
                        label=""
                    />
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <TextField
                                label="年減量額度"
                                className={classes.lastTextField}
                                value={AppStore.Instance.filterRangeUpperBound}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">tCO2e/yr</InputAdornment>
                                }}
                                variant="outlined"
                            />
                        }
                        label="至"
                    />
                    <Button className={classes.searchButton} variant="outlined" color="primary">
                        搜尋
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

export const SiteFilter = withStyles(styles as {})(siteFilter);
