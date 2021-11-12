import {removeEmployee} from './service.pure';

const employees = [
    {
        id: 1,
        name: "Пафнутий",
        surname: "Пафнутьев",
        department: "IT",
        dateOfBirth: "2000-01-01"
    },
    {
        id: 133,
        name: "Иван",
        surname: "Иванов",
        department: "HR",
        managerRef: 135,
    },
    {
        id: 134,
        name: "Анна",
        surname: "Петрова",
        department: "HR"
    },
    {
        id: 135,
        name: "Николай",
        surname: "Сидоров",
        department: "IT"
    }
];

const employeesRemoved135 = [
    {
        id: 1,
        name: "Пафнутий",
        surname: "Пафнутьев",
        department: "IT",
        dateOfBirth: "2000-01-01"
    },
    {
        id: 133,
        name: "Иван",
        surname: "Иванов",
        department: "HR",
        managerRef: 135,
    },
    {
        id: 134,
        name: "Анна",
        surname: "Петрова",
        department: "HR"
    }];


test('removeEmployee', ()=>
    expect(removeEmployee(employees,135)).toEqual(employeesRemoved135)
);

