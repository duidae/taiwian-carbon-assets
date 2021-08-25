import * as React from "react";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import clsx from "clsx";
import {AppBar, Collapse, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {blue, lightGreen} from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EcoIcon from "@material-ui/icons/Eco";
import LayersIcon from "@material-ui/icons/Layers";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "./DashboardLayout.scss";
import {DashboardApp} from "./pages/DashboardApp";

import {AppStore, AreaType} from "./stores";

const DRAWER_WIDTH = 250;
const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    nested: {
        paddingLeft: theme.spacing(3)
    }
});

/*
  const theme = createTheme({
      palette: {
          primary: lightGreen,
          secondary: blue,
      }
  });
*/

@observer
class DashboardLayout extends React.Component<any, any> {
    @observable isDrawerOpen: boolean;
    @observable isDataLayerOpen: boolean;

    private PRIMARY_CONTROLS = [
        {key: "公有資產", icon: <MonetizationOnIcon />},
        {key: "碳收支", icon: <EcoIcon />}
    ];

    constructor(props: any) {
        super(props);
        makeObservable(this);
        this.isDrawerOpen = true;
        this.isDataLayerOpen = true;
    }

    @action private handleDrawerOpen = () => {
        this.isDrawerOpen = true;
    };

    @action private handleDrawerClose = () => {
        this.isDrawerOpen = false;
    };

    @action private handleDataLayersClick = () => {
        // this.isDataLayerOpen = !this.isDataLayerOpen;
    };

    public render() {
        const classes = this.props.classes;
        const appBar = (
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: this.isDrawerOpen
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: this.isDrawerOpen
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        碳匯城鄉
                    </Typography>
                    <SearchIcon />
                    <InputBase placeholder="搜尋地號…" inputProps={{"aria-label": "search"}} />
                </Toolbar>
            </AppBar>
        );

        const drawer = (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: this.isDrawerOpen,
                    [classes.drawerClose]: !this.isDrawerOpen
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: this.isDrawerOpen,
                        [classes.drawerClose]: !this.isDrawerOpen
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {this.PRIMARY_CONTROLS.map(controlItem => (
                        <ListItem button key={controlItem.key}>
                            <ListItemIcon>{controlItem.icon}</ListItemIcon>
                            <ListItemText primary={controlItem.key} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {AppStore.Instance.analysisAreas?.map(area => (
                        <React.Fragment>
                            <ListItem button key={area.key} onClick={() => AppStore.Instance.selectAreaDataLayers(area.key)}>
                                <ListItemIcon>{area.type === AreaType.CITY ? <LocationCityIcon color="primary" /> : <EmojiNatureIcon color="primary" />}</ListItemIcon>
                                <ListItemText primary={area.key} />
                                {/*this.isDataLayerOpen ? <ExpandLess /> : <ExpandMore />*/}
                            </ListItem>
                            <Collapse in={this.isDataLayerOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {area.dataLayers?.map(dataLayer => {
                                        return (
                                            <ListItem button className={classes.nested} onClick={() => AppStore.Instance.selectDataLayer(dataLayer)}>
                                                <ListItemIcon><LayersIcon color={AppStore.Instance.isDataLayerSelected?.get(dataLayer) ? "primary" : "disabled"} /></ListItemIcon>
                                                <ListItemText primary={dataLayer} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        );

        return (
            <div className={classes.root}>
                {appBar}
                {drawer}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DashboardApp />
                </main>
            </div>
        );
    }
}

export default withStyles(styles as {})(DashboardLayout);
