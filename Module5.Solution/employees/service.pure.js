import {fromJS} from 'immutable';

export function removeEmployee(employees, id) {
    return employees.filter(e=>e.id!==id);
}
export function addEmployee(employees, employee) {
    return fromJS(employees).push(employee).toJS();
}
