
import { getEmployees, removeEmployee, addEmployee,
	findById, searchEmployees, setEmployeeManager} from './service';
import {DATA} from "./employees-json";
import {Employee,jsonToEmployees} from "./model/Employee";
import * as server from './server';

const PLACEHOLDER = "employeesPlaceholder";

export async function runUI() {
	const employeesOptions = await getEmployeesOptions();
    employeesOptions.unshift({text:"-----------",value:""});
	fillSelect(document.getElementById("managerSelect"), employeesOptions);
	fillSelect(document.getElementById("managerSearch"), employeesOptions);
	showEmployees(await server.getEmployees());
	document.getElementById("searchButton").click();
	assignSendOnEnter("searchPane","searchEmploy	eesButton");
	assignSendOnEnter("addPane", "addEmployeeButton");
}


export async function addEmployeeUI() {
	let errorHTML = "";
	const name = document.getElementById("name").value;
	if (name=="") {
		errorHTML += "- Имя сотрудника должно быть задано<br>";
		document.getElementById("name").style.backgroundColor = '#FFEEEE';
	}
	const surname = document.getElementById("surname").value;
	if (surname=="") {
		errorHTML += "- Фамилия сотрудника должна быть задана<br>";
		document.getElementById("surname").style.backgroundColor = '#FFEEEE';
	}
	document.getElementById("addEmployeeFormErrorMessage")
		.innerHTML = errorHTML;
	if (errorHTML.length != 0) return;
	const managerId = document.getElementById("managerSelect").value;
    let employee = await server.addEmployee(name, surname);
	await server.setEmployeeManager(employee.id, managerId);

	showEmployees(await server.getEmployees());
	document.getElementById("name").value = "";
	document.getElementById("surname").value = "";

}


/**
 * Метод должен заполнять дроп-бокс с id selectId значениями values
 * каждое значение содержит text - видимый текст и id - то значение,
 * которое становится результатом этого select
 * (в нашем случае это может быть employee id или task id)
 *
 * @param selectId
 * @param values список значений {text,value} где text -
 * то, что видит пользователь, а value - то, что использует программа
 * @param selectedValue выбранное значение (если есть)
 *
 */
function fillSelect(select, values, selectedValue) {
	select.innerHTML = "";
	for (let val of values) {
		const option = document.createElement("option");
		option.text = val.text;
		option.value = val.value;
		if (selectedValue==option.value) option.selected=true;
		select.appendChild(option);
	}
}

async function getEmployeesOptions() {
	let employees = await server.getEmployees();
	return employees.map(e=> {
		return {text:e.name+' '+e.surname, value:e.id}
	});
}

function clearEmployeesPlaceholder() {
	document.getElementById(PLACEHOLDER).innerHTML = "";
}

export async function removeEmployeeUI(id) {
	await server.removeEmployee(id);
    showEmployees(await server.getEmployees());
}

export function selectView(values) {
    const values_html = values.map(v=>
        `<option value="${v.value}" 
			${v.selected?'selected':''}>${v.text}</option>`
    ).join("");
    return `<select>${values_html}</select>`;
}

async function showEmployees(employeesJSON) {
	let employees = jsonToEmployees(employeesJSON);
	let allEmployees = await server.getEmployees();
	const html = showEmployeesView(allEmployees, employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;
}

export function employeeManagerView(employees, selectedId) {
	if (!selectedId) return "";
	let values = employees.map(e=>{
		return { text:e.name+" "+e.surname,
				 value:e.id,
				 selected: e.id===selectedId
				}
	});
	return `<span>${selectView(values)}</span>`;
}

function showEmployeesView(allEmployees, employees) {
	let li_items = employees.map(e=>
		`<li>${e} <button onclick="removeEmployeeUI(${e.id})">X</button>
			${employeeManagerView(allEmployees,e.managerId)}
		</li>`
	).join("");

	return `<ul>${li_items}</ul>`;
}


export async function searchEmployeeUI() {
	const name = document.getElementById("nameSearch").value||null;
	const surname = document.getElementById("surnameSearch").value||null;
	const managerId = document.getElementById("managerSearch").value||null;
    const example = { name, surname, managerId } ;

    showEmployees(await server.findByExample(example));
}

/**
 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */
export function openTab(evt, id) {
	// Определяем переменные
	var i, tabcontent, tablinks;

	// Получаем все элементы с class="tabcontent" и прячем их
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Получаем все элементы с class="tablinks" и удаляем класс "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Показываем текущий таб и добавляем класс "active"
	// на кнопку, которая открывает этот таб
	document.getElementById(id).style.display = "block";
	evt.currentTarget.className += " active";
}

function assignSendOnEnter(paneId, buttonId) {
	let allInput = document.querySelectorAll("#"+paneId+" input");
	for (let input of allInput) {
		input.addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				document.getElementById(buttonId).click();
			}
		});
	}
}

