import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
// import Plans from "./Plans";
import AuthorizationService from "../services/AuthorizationService";

const H = 6;

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(H)
    },
    appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: theme.spacing(H),
    },
    container: {
        height: `calc(100vh - ${theme.spacing(H)}px)`,
        overflow: 'auto'
    }
}));

export default function Layout() {

    const classes = useStyles();

    const [data, setData] = useState({});
    const [algorithms, setAlgorithms] = useState({});

    useEffect(() => {
        const subscription = AuthorizationService.get(
            `setup/account/${AuthorizationService.getXTenantId()}`
        ).subscribe(
            data => setData(data)
        );

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const subscription = AuthorizationService.get('setup/algorithm').subscribe(
            data => setAlgorithms(data)
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="flex column">
                    <strong>Tenant</strong>
                    <pre>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                    <strong>Algorithms</strong>
                    <pre>
                        {JSON.stringify(algorithms, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
