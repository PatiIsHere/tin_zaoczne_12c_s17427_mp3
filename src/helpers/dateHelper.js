import React from "react";

export function getFormattedDate(dateSource) {
    const dateObject = new Date(dateSource);
    return dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2)
}

export function getFormattedBoolean(booleanSource) {
    if (booleanSource) {
        return "Tak";
    }
    return "Nie";
}