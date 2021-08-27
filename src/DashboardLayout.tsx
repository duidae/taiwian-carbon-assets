import * as React from "react";
import {observer} from "mobx-react";
import {action, makeObservable, observable, ObservableMap} from "mobx";
import clsx from "clsx";
import {AppBar, Collapse, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListSubheader, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";
import {createTheme, ThemeProvider, withStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EcoIcon from "@material-ui/icons/Eco";
import LayersIcon from "@material-ui/icons/Layers";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {DashboardApp} from "./pages/DashboardApp";

import {AppStore} from "./stores";

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
    logo: {
        width: 32,
        height: 32,
        marginRight: 10
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
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    nested: {
        paddingLeft: theme.spacing(3)
    }
});


const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32',
        },
        secondary: blue,
    }
});

enum AreaType {
    CITY,
    COUNTRY_SIDE
}

enum LayerType {
    PUBLIC_ASSET = "公有資產",
    OTHERS = "其他"
}

type Area = string;

@observer
class DashboardLayout extends React.Component<any, any> {
    @observable isDrawerOpen: boolean;
    @observable isAreaOpen: ObservableMap<Area, boolean>;

    private static DATA_LAYER_ICON = new Map<LayerType, JSX.Element>([
        [LayerType.PUBLIC_ASSET, <MonetizationOnIcon />],
        [LayerType.OTHERS, <LocationOnIcon />]
    ]);

    private static GET_AREA_TYPE = (areaName: string): AreaType => {
        return areaName?.includes("市") ? AreaType.CITY : AreaType.COUNTRY_SIDE;
    };

    // TODO: find proper type
    private static GET_LAYER_ICON = (index: number, isActive: boolean): JSX.Element | undefined => {
        return DashboardLayout.DATA_LAYER_ICON.get(index === 0 ? LayerType.PUBLIC_ASSET : LayerType.OTHERS);
    };

    private PRIMARY_CONTROLS = [{key: "碳收支", icon: <EcoIcon />}];

    constructor(props: any) {
        super(props);
        makeObservable(this);
        this.isDrawerOpen = true;
        this.isAreaOpen = new ObservableMap<Area, boolean>([]);
        AppStore.Instance.analysisAreas?.forEach(area => this.isAreaOpen.set(area.folder, true));
    }

    @action private handleDrawerOpen = () => {
        this.isDrawerOpen = true;
    };

    @action private handleDrawerClose = () => {
        this.isDrawerOpen = false;
    };

    @action private handleAreaOpenClick = (area: Area) => {
        this.isAreaOpen.set(area, !this.isAreaOpen.get(area));
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
                    <img className={classes.logo} alt="碳匯城鄉" src="logo.png"/>
                    <Typography variant="h5" noWrap>
                        {`碳匯城鄉 - 公有資產減碳評估儀表板${AppStore.Instance.selectedArea ? `： [ ${AppStore.Instance.selectedArea} ]` : ""}`}
                    </Typography>
                    {/*
                    <SearchIcon />
                    <InputBase placeholder="搜尋地號…" inputProps={{"aria-label": "search"}} />
                    */}
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
                <List subheader={<ListSubheader color="primary" className={classes.listHeader}>{this.isDrawerOpen ? "城鄉評估" : "評"}</ListSubheader>}>
                    {AppStore.Instance.analysisAreas?.map(analysisArea => (
                        <React.Fragment>
                            <ListItem key={`list-${analysisArea.folder}`} button onClick={() => AppStore.Instance.selectAreaLayers(analysisArea.folder)}>
                                <ListItemIcon>
                                    {DashboardLayout.GET_AREA_TYPE(analysisArea.folder) === AreaType.CITY ? (
                                        <LocationCityIcon color={AppStore.Instance.selectedArea === analysisArea.folder ? "primary" : "disabled"} />
                                    ) : (
                                        <EmojiNatureIcon color={AppStore.Instance.selectedArea === analysisArea.folder ? "primary" : "disabled"} />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={analysisArea.folder} />
                                {this.isDrawerOpen && (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments" onClick={() => this.handleAreaOpenClick(analysisArea.folder)}>
                                            {this.isAreaOpen.get(analysisArea.folder) ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                )}
                            </ListItem>
                            <Collapse key={`collapse-${analysisArea.folder}`} in={this.isAreaOpen.get(analysisArea.folder)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {analysisArea.layerGeojsons?.map(layerGeojson => {
                                        const layerGeojsonPath = `${analysisArea.folder}/${layerGeojson}`;
                                        return (
                                            <ListItem key={layerGeojson} button className={classes.nested} onClick={() => AppStore.Instance.selectLayer(layerGeojsonPath)}>
                                                <ListItemIcon>
                                                    <LayersIcon color={AppStore.Instance.isLayerSelected?.get(layerGeojsonPath) ? "primary" : "disabled"} />
                                                </ListItemIcon>
                                                <ListItemText primary={layerGeojson.replace(/\.json$/, "")} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
                <List subheader={<ListSubheader color="primary" className={classes.listHeader}>{this.isDrawerOpen ? "碳收支" : "碳"}</ListSubheader>}>
                    {this.PRIMARY_CONTROLS.map(controlItem => (
                        <ListItem button key={controlItem.key}>
                            <ListItemIcon>{controlItem.icon}</ListItemIcon>
                            <ListItemText primary={controlItem.key} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );

        return (
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    {appBar}
                    {drawer}
                </ThemeProvider>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DashboardApp />
                </main>
            </div>
        );
    }
}

export default withStyles(styles as {})(DashboardLayout);
