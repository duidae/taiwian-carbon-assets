import React from "react";
import {InputBase} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
    root: {}
});

function SearchInput(props) {
    return (
        <React.Fragment>
            <SearchIcon />
            <InputBase placeholder="搜尋地號…" inputProps={{"aria-label": "search"}} />
        </React.Fragment>
    );
}

export const SearchInputComponent = withStyles(styles as {})(SearchInput);
