import React from "react"; 
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title i.e Coronavirus cases */}
                <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
                {/* Number of new cases */}
                <h2>{cases}</h2>
                {/* Number of total cases */}
                <Typography className="infoBox_cases" color="textSecondary">{total} Total</Typography>
            </CardContent>
       </Card>
    );
}

export default InfoBox;
 