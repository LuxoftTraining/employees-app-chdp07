
import DATA from '../employees-json';
import {Renderer} from './Renderer';

export class Report {

    constructor() {
        this.entities = "tasks";
        this.columns = ["department","amount"];
        this.columnNames = [
            "Наименование",
            "Ответственный"
        ]
    }

    amountInDep(dep) {
        return DATA.map(e=>e.department)
            .filter(d=>d===dep)
            .length;
    }

    generateReport() {
        const report = new Renderer(DATA[this.entities],this.columns,this.columnNames);
        const html = report.renderTable();
        document.getElementById("report").innerHTML = html;
    }
}