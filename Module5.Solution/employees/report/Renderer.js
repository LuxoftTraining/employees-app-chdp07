
import DATA from '../employees-json';

export class Renderer {

	constructor(items, columns, columnNames) {
		this.items = items;
		this.columns = columns;
		this.columnNames = columnNames;
	}

	renderCell(cell) {
		return `<td>${cell}</td>`;
	}

	renderTable() {
		const header = this.columnNames.map(col=>`<th>${col}</th>`).join('');
		const items = this.items.map(item=>"<tr>"+this.renderItem(item)+"</tr>").join('');
		return `<table border="1"><tr>${header}</tr>${items}</table>`;
	}

	renderItem(item) {
		return this.columns
			.map(c=> {
					let value = c
					return `<td>${value}</td>`
			}).join('');
	}

}