export const reasonList =
    [
        {
            "IdReason": 1,
            "Name": "Urlop",
            "SalaryPercentage": "1.00",
            "createdAt": "2023-01-07T11:08:47.000Z",
            "updatedAt": "2023-01-07T11:08:47.000Z"
        },
        {
            "IdReason": 2,
            "Name": "Zwolnienie lekarskie",
            "SalaryPercentage": "0.80",
            "createdAt": "2023-01-07T11:08:47.000Z",
            "updatedAt": "2023-01-07T11:08:47.000Z"
        }
    ]
export const reasonDetailList = [
    {
        "IdReason": 1,
        "Name": "Urlop",
        "SalaryPercentage": "1.00",
        "createdAt": "2023-01-07T11:08:47.000Z",
        "updatedAt": "2023-01-07T11:08:47.000Z",
        "absences": [
            {
                "IdAbsence": 2,
                "IdEmployee": 1,
                "IdReason": 1,
                "DateFrom": "2022-10-10T00:00:00.000Z",
                "DateTo": "2022-10-14T00:00:00.000Z",
                "IsAccepted": true,
                "createdAt": "2023-01-07T11:08:47.000Z",
                "updatedAt": "2023-01-07T11:08:47.000Z",
                "employee": {
                    "IdEmployee": 1,
                    "Name": "Jan",
                    "SecondName": "Andrzej",
                    "Surname": "Kowalski",
                    "Email": "akowalski@absence.com",
                    "Password": "$2a$08$7Ojudu326ST18I3Qva2eAufbaMvqhsIX3OukMzgjS7oKao.SSCY3S",
                    "createdAt": "2023-01-07T11:08:47.000Z",
                    "updatedAt": "2023-01-07T11:08:47.000Z"
                }
            },
            {
                "IdAbsence": 3,
                "IdEmployee": 5,
                "IdReason": 1,
                "DateFrom": "2022-10-31T00:00:00.000Z",
                "DateTo": "2022-11-05T00:00:00.000Z",
                "IsAccepted": false,
                "createdAt": "2023-01-07T11:08:47.000Z",
                "updatedAt": "2023-01-07T11:08:47.000Z",
                "employee": {
                    "IdEmployee": 5,
                    "Name": "Janina",
                    "SecondName": "Anna",
                    "Surname": "Bąk",
                    "Email": "jbak@absence.com",
                    "Password": "$2a$08$7Ojudu326ST18I3Qva2eAuIAWzcn7K04zz/wngspiplKL2QBUAng2",
                    "createdAt": "2023-01-07T11:08:47.000Z",
                    "updatedAt": "2023-01-07T11:08:47.000Z"
                }
            },
            {
                "IdAbsence": 4,
                "IdEmployee": 3,
                "IdReason": 1,
                "DateFrom": "2022-10-31T00:00:00.000Z",
                "DateTo": "2022-11-05T00:00:00.000Z",
                "IsAccepted": false,
                "createdAt": "2023-01-07T11:08:47.000Z",
                "updatedAt": "2023-01-07T11:08:47.000Z",
                "employee": {
                    "IdEmployee": 3,
                    "Name": "Michał",
                    "SecondName": null,
                    "Surname": "Testowy",
                    "Email": "mtestowy@absence.com",
                    "Password": "$2a$08$7Ojudu326ST18I3Qva2eAuhxS0eZvSBhyI2bW7.XvUlq2XEImX8F.",
                    "createdAt": "2023-01-07T11:08:47.000Z",
                    "updatedAt": "2023-01-07T11:08:47.000Z"
                }
            }
        ]
    },
    {
        "IdReason": 2,
        "Name": "Zwolnienie lekarskie",
        "SalaryPercentage": "0.80",
        "createdAt": "2023-01-07T11:08:47.000Z",
        "updatedAt": "2023-01-07T11:08:47.000Z",
        "absences": [
            {
                "IdAbsence": 1,
                "IdEmployee": 1,
                "IdReason": 2,
                "DateFrom": "2022-09-05T00:00:00.000Z",
                "DateTo": "2022-09-09T00:00:00.000Z",
                "IsAccepted": true,
                "createdAt": "2023-01-07T11:08:47.000Z",
                "updatedAt": "2023-01-07T11:08:47.000Z",
                "employee": {
                    "IdEmployee": 1,
                    "Name": "Jan",
                    "SecondName": "Andrzej",
                    "Surname": "Kowalski",
                    "Email": "akowalski@absence.com",
                    "Password": "$2a$08$7Ojudu326ST18I3Qva2eAufbaMvqhsIX3OukMzgjS7oKao.SSCY3S",
                    "createdAt": "2023-01-07T11:08:47.000Z",
                    "updatedAt": "2023-01-07T11:08:47.000Z"
                }
            }
        ]
    }
]