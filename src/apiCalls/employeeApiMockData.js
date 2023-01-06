export const employeeList = [
    {
        "IdEmployee": 1,
        "Name": "Jan",
        "SecondName": "Andrzej",
        "Surname": "Kowalski",
        "Email": "akowalski@absence.com"
    },
    {
        "IdEmployee": 2,
        "Name": "Andrzej",
        "SecondName": "Jan",
        "Surname": "Niekowalski",
        "Email": "jniekowalski@absence.com"
    },
    {
        "IdEmployee": 3,
        "Name": "Michał",
        "SecondName": null,
        "Surname": "Testowy",
        "Email": "mtestowy@absence.com"
    },
    {
        "IdEmployee": 4,
        "Name": "Kazimierz",
        "SecondName": null,
        "Surname": "Tetmajer",
        "Email": "ktetmajer@absence.com"
    },
    {
        "IdEmployee": 5,
        "Name": "Janina",
        "SecondName": "Anna",
        "Surname": "Bąk",
        "Email": "jbak@absence.com"
    }
]

export const employeeDetailList = [
    {
        "IdEmployee": 1,
        "Name": "Jan",
        "SecondName": "Andrzej",
        "Surname": "Kowalski",
        "Email": "akowalski@absence.com",
        "absences": [
            {
                "IdAbsence": 1,
                "IdEmployee": 1,
                "IdReason": 2,
                "DateFrom": "2022-09-05T00:00:00.000Z",
                "DateTo": "2022-09-09T00:00:00.000Z",
                "IsAccepted": true,
                "reason": {
                    "IdReason": 2,
                    "Name": "Zwolnienie lekarskie",
                    "SalaryPercentage": "0.80"
                }
            },
            {
                "IdAbsence": 2,
                "IdEmployee": 1,
                "IdReason": 1,
                "DateFrom": "2022-10-10T00:00:00.000Z",
                "DateTo": "2022-10-14T00:00:00.000Z",
                "IsAccepted": true,
                "reason": {
                    "IdReason": 1,
                    "Name": "Urlop",
                    "SalaryPercentage": "1.00",
                }
            }
        ]
    },
    {
        "IdEmployee": 2,
        "Name": "Andrzej",
        "SecondName": "Jan",
        "Surname": "Niekowalski",
        "Email": "jniekowalski@absence.com",
        "absences": []
    },
    {
        "IdEmployee": 3,
        "Name": "Michał",
        "SecondName": null,
        "Surname": "Testowy",
        "Email": "mtestowy@absence.com",
        "absences": [
            {
                "IdAbsence": 4,
                "IdEmployee": 3,
                "IdReason": 1,
                "DateFrom": "2022-10-31T00:00:00.000Z",
                "DateTo": "2022-11-05T00:00:00.000Z",
                "IsAccepted": false,
                "reason": {
                    "IdReason": 1,
                    "Name": "Urlop",
                    "SalaryPercentage": "1.00"
                }
            }
        ]
    },
    {
        "IdEmployee": 4,
        "Name": "Kazimierz",
        "SecondName": null,
        "Surname": "Tetmajer",
        "Email": "ktetmajer@absence.com",
        "absences": []
    },
    {
        "IdEmployee": 5,
        "Name": "Janina",
        "SecondName": "Anna",
        "Surname": "Bąk",
        "Email": "jbak@absence.com",
        "absences": [
            {
                "IdAbsence": 3,
                "IdEmployee": 5,
                "IdReason": 1,
                "DateFrom": "2022-10-31T00:00:00.000Z",
                "DateTo": "2022-11-05T00:00:00.000Z",
                "IsAccepted": false,
                "reason": {
                    "IdReason": 1,
                    "Name": "Urlop",
                    "SalaryPercentage": "1.00"
                }
            }
        ]
    }
]