/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";

if (process.env.REACT_APP_ENVIRONMENT) {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(React, {
        titleColor: "green",
        diffNameColor: "aqua",
        trackAllPureComponents: true
    });
}
