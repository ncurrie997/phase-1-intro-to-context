// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
};

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord)
};

function createTimeInEvent(employeeRecord, dateStamp) {
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0]
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecords, dateStamp) {
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0],
    }
    employeeRecords.timeOutEvents.push(timeOutEvent);
    return employeeRecords;
}

function hoursWorkedOnDate(employeeRecords, date) {
    let timeIn = employeeRecords.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecords.timeOutEvents.find(event => event.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecords, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecords, date);
    let payOwed = hoursWorked * employeeRecords.payPerHour;
    return payOwed;
};

function allWagesFor(employeeRecords) {
    const daysWorked = employeeRecords.timeInEvents.map(event => event.date);
    const wagesArr = daysWorked.map(date => wagesEarnedOnDate(employeeRecords, date));
    const allWages = wagesArr.reduce((func, wageFromDay) => (func + wageFromDay), 0);
    return allWages
};

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((func, employeeRecords) => func + allWagesFor(employeeRecords), 0);
    return totalPayroll;
};