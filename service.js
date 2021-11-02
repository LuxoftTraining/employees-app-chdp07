function findByName(name, surname) {
    let res = [];
    for (var e of DATA.employees) {
        if ((!name || e.name === name) &&
            (!surname || e.surname === surname)) {
            res.push(e);
        }
    }
    return res;
}



function addEmployee(name, surname) {
    if (!name || name.length == 0 || !surname || surname.length == 0) {
        throw new Error("name and surname should be not empty");
    };
    let max = 0;
    for (let e of DATA.employees) {
        if (e.id > max)
            max = e.id;
    }
    let id = max + 1;
    DATA.employees.push({ id, name, surname });
    return id;
} 

function findById(id) {
    for (var e of DATA.employees) {
     if (id==e.id) {
      return e;
     }
    }
   }
   

function addPhone(id, phone) {
    const employee = findById(id);
    const phones = employee.phones;
    if (!phones) {
     employee.phones = [];
    }
    employee.phones.push(phone);
   }
   




