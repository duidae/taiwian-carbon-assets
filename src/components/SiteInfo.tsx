import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";

import {AppStore} from "stores";
import {FieldName, SITE_INFO} from "models";

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
        const caseInfo = SITE_INFO.get(AppStore.Instance.selectedCaseID);
        const castInfoMap = new Map<FieldName, string | number>([
            [FieldName.Name, caseInfo.name],
            [FieldName.Type, caseInfo.type],
            [FieldName.Quota, caseInfo.quota],
            [FieldName.Cost, caseInfo.cost],
            [FieldName.Means, caseInfo.means],
            [FieldName.Effect, caseInfo.effect],
            [FieldName.Method, caseInfo.method],
            [FieldName.Unit, caseInfo.unit],
            [FieldName.Link, caseInfo.link],
            [FieldName.Comment, caseInfo.comment]
        ]);

        return (
            <Card className={classes.root} variant="outlined">
                <TableContainer>
                    <Table>
                        <TableBody>
                            {Object.values(FieldName).map(field => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <b>{field}</b>
                                        </TableCell>
                                        <TableCell>
                                            {field === FieldName.Link && castInfoMap.get(field) ? (
                                                <a href={`${castInfoMap.get(field) as string}`} target="_blank">
                                                    {castInfoMap.get(field)}
                                                </a>
                                            ) : (
                                                castInfoMap.get(field)
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        );
    }
}

export const SiteInfo = withStyles(styles as {})(siteInfo);
