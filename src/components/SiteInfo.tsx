import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";

import {AppStore} from "stores";
import {FieldName, SITE_INFO} from "models";

const styles = theme => ({
    root: {
        height: "100%"
    },
    field: {
        width: 200
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
            [FieldName.Link, caseInfo.link]
        ]);

        return (
            <Card className={classes.root} variant="outlined">
                <CardHeader title="案場資訊" />
                <img height={250} src={`matching/${AppStore.Instance.selectedCaseID}.jpg`} alt={`${AppStore.Instance.selectedCaseID}.jpg`} />
                <TableContainer>
                    <Table>
                        <TableBody>
                            {Object.values(FieldName).map(field => {
                                return (
                                    <TableRow>
                                        <TableCell className={classes.field}>
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
