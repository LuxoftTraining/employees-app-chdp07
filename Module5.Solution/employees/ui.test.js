import {employeeManagerView} from './ui';
import DATA from './employees-json';
const employees = DATA.employees;

String.prototype.trimAll = function() {
    return this.replace(/>\s+</g,'><').replace(/\s\s+/g,' ').trim()
};

test('employeeManagerView', ()=>
    expect(employeeManagerView(employees,135).trimAll()).toEqual(`
        <span>
            <select>
                <option value="1" selected="false">Пафнутий Пафнутьев</option>
                <option value="133" selected="false">Иван Иванов</option>
                <option value="134" selected="false">Анна Петрова</option>
                <option value="135" selected="true">Николай Сидоров</option>
            </select>
         </span>
    `.trimAll())
);

String.prototype.removeTags = function() {
    return this.replace(/<[^>]+>/g,'').trimAll()
};

test('employeeManagerView Text', ()=>
    expect(employeeManagerView(employees,135).removeTags())
        .toEqual("Пафнутий ПафнутьевИван ИвановАнна ПетроваНиколай Сидоров")
);


