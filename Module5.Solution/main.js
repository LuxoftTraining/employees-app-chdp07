
import { runUI, addEmployeeUI, openTab, searchEmployeeUI, removeEmployeeUI }
	from './employees/ui-all';
import {Employee} from './employees/model/Employee';
import './style.css';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.removeEmployeeUI = removeEmployeeUI;

runUI();

if (module.hot) {

	module.hot.dispose(function (data) {
		// Очистка слушателей и передача данных data
		// в обновленный модуль
		data.info = "some info";
	});

	module.hot.accept();
}