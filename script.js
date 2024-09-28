const chemicalData = [
	{
		name: "Ammonium Persulfate",
		vendor: "LG Chem",
		density: 3525.92,
		viscosity: 60.63,
		packaging: "Bag",
		packSize: 100.0,
		unit: "kg",
		quantity: 6495.18,
	},
	{
		name: "Caustic Potash",
		vendor: "Formosa",
		density: 3172.15,
		viscosity: 48.22,
		packaging: "Bag",
		packSize: 100.0,
		unit: "kg",
		quantity: 8751.9,
	},
	{
		name: "Dimethylaminopropylamino",
		vendor: "LG Chem",
		density: 8435.37,
		viscosity: 12.62,
		packaging: "Barrel",
		packSize: 75.0,
		unit: "L",
		quantity: 5964.61,
	},
	{
		name: "Mono Ammonium Phosphate",
		vendor: "Sinopec",
		density: 1597.65,
		viscosity: 76.51,
		packaging: "Bag",
		packSize: 105.0,
		unit: "kg",
		quantity: 8183.73,
	},
	{
		name: "Ferric Nitrate",
		vendor: "DowDuPont",
		density: 364.04,
		viscosity: 14.9,
		packaging: "Bag",
		packSize: 105.0,
		unit: "kg",
		quantity: 4154.33,
	},
	{
		name: "n-Pentane",
		vendor: "Sinopec",
		density: 4535.26,
		viscosity: 66.76,
		packaging: "N/A",
		packSize: "N/A",
		unit: "t",
		quantity: 6272.34,
	},
	{
		name: "Glycol Ether PM",
		vendor: "LG Chem",
		density: 6495.18,
		viscosity: 72.12,
		packaging: "Bag",
		packSize: 250.0,
		unit: "kg",
		quantity: 8749.54,
	},

	{
		name: "Sodium phosphate",
		vendor: "LG Chem",
		density: 1525.92,
		viscosity: 57.63,
		packaging: "Bag",
		packSize: 100.0,
		unit: "kg",
		quantity: 695.18,
	},
	{
		name: "Calcium carbonate",
		vendor: "Formosa",
		density: 172.15,
		viscosity: 48.22,
		packaging: "Bag",
		packSize: 100.0,
		unit: "kg",
		quantity: 751.9,
	},
	{
		name: "Phosphoric acid",
		vendor: "LG Chem",
		density: 435.37,
		viscosity: 12.62,
		packaging: "Barrel",
		packSize: 75.0,
		unit: "L",
		quantity: 964.61,
	},
	{
		name: "Nitric acid",
		vendor: "Sinopec",
		density: 197.65,
		viscosity: 76.51,
		packaging: "Bag",
		packSize: 105.0,
		unit: "kg",
		quantity: 883.73,
	},
	{
		name: "Acetate",
		vendor: "DowDuPont",
		density: 3264.04,
		viscosity: 14.9,
		packaging: "Bag",
		packSize: 105.0,
		unit: "kg",
		quantity: 7154.33,
	},
	{
		name: "Ethanol",
		vendor: "Sinopec",
		density: 535.26,
		viscosity: 66.76,
		packaging: "Bag",
		packSize: 100.0,
		unit: "Kg",
		quantity: 6272.34,
	},
	{
		name: "Silver nitrate",
		vendor: "LG Chem",
		density: 6495.18,
		viscosity: 72.12,
		packaging: "Bag",
		packSize: 250.0,
		unit: "kg",
		quantity: 8749.54,
	},
	{
		name: "Methane",
		vendor: "LG Chem",
		density: 6495.18,
		viscosity: 72.12,
		packaging: "Bag",
		packSize: 250.0,
		unit: "kg",
		quantity: 8749.54,
	},
];

function iterateTable() {
	const tableBody = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	tableBody.innerHTML = "";

	chemicalData.forEach((chemical, index) => {
		const row = tableBody.insertRow();

		const checkboxCell = row.insertCell(0);
		checkboxCell.innerHTML = '<input type="checkbox">';

		row.insertCell(1).innerHTML = chemical.name;
		row.insertCell(2).innerHTML = chemical.vendor;
		row.insertCell(3).innerHTML = chemical.density;
		row.insertCell(4).innerHTML = chemical.viscosity;
		row.insertCell(5).innerHTML = chemical.packaging;
		row.insertCell(6).innerHTML = chemical.packSize;
		row.insertCell(7).innerHTML = chemical.unit;
		row.insertCell(8).innerHTML = chemical.quantity;

		//Make all cells editable except the checkbox
		for (let i = 1; i < row.cells.length; i++) {
			row.cells[i].setAttribute("contenteditable", "false");
		}
	});
}

// Call iterateTable() to fill the table with the initial data
iterateTable();

let isEditMode = false;
function editRow() {
	const tableBody = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const rows = tableBody.getElementsByTagName("tr");

	isEditMode = !isEditMode;

	Array.from(rows).forEach(row => {
		const checkbox = row.querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			for (let i = 1; i < row.cells.length; i++) {
				row.cells[i].setAttribute("contenteditable", isEditMode);
			}
		} else {
			for (let i = 1; i < row.cells.length; i++) {
				row.cells[i].setAttribute("contenteditable", "false");
			}
		}
	});
}

let sortDirection = true;

function sortTable(columnIndex) {
	const table = document.getElementById("chemicalTable");
	const tbody = table.tBodies[0];
	const rows = Array.from(tbody.rows);

	sortDirection = !sortDirection;

	rows.sort((rowA, rowB) => {
		const cellA = rowA.cells[columnIndex].innerText.toLowerCase();
		const cellB = rowB.cells[columnIndex].innerText.toLowerCase();

		if (!isNaN(cellA) && !isNaN(cellB)) {
			return sortDirection ? cellA - cellB : cellB - cellA;
		}

		if (cellA < cellB) return sortDirection ? -1 : 1;
		if (cellA > cellB) return sortDirection ? 1 : -1;
		return 0;
	});

	rows.forEach(row => tbody.appendChild(row));

	updateSortArrows(columnIndex);
}

function updateSortArrows(columnIndex) {
	const headers = document.querySelectorAll("th");

	headers.forEach((header, index) => {
		if (index === columnIndex) {
			header.innerHTML = sortDirection
				? header.innerText.replace(/\u25B2|\u25BC/g, " &#x25B2;")
				: header.innerText.replace(/\u25B2|\u25BC/g, " &#x25BC;");
		} else {
			header.innerHTML = header.innerText.replace(
				/\u25B2|\u25BC/g,
				" &#x25B2;"
			);
		}
	});
}

function addRow() {
	const table = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const newRow = table.insertRow();

	const checkboxCell = newRow.insertCell(0);
	checkboxCell.innerHTML = '<input type="checkbox">';

	for (let i = 1; i <= 8; i++) {
		const cell = newRow.insertCell(i);
		cell.contentEditable = "true";
	}
}

function deleteRow() {
	const table = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');

	checkboxes.forEach(checkbox => {
		const row = checkbox.closest("tr");
		row.remove();
	});
}

function moveRowUp() {
	const table = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const rows = Array.from(table.rows);
	const selectedRow = rows.find(
		row => row.querySelector('input[type="checkbox"]').checked
	);

	if (selectedRow && selectedRow.previousElementSibling) {
		table.insertBefore(selectedRow, selectedRow.previousElementSibling);
	}
}

function moveRowDown() {
	const table = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const rows = Array.from(table.rows);
	const selectedRow = rows.find(
		row => row.querySelector('input[type="checkbox"]').checked
	);

	if (selectedRow && selectedRow.nextElementSibling) {
		table.insertBefore(selectedRow.nextElementSibling, selectedRow);
	}
}

function refressTable() {
	iterateTable();
}

function saveTable() {
	const tableBody = document
		.getElementById("chemicalTable")
		.getElementsByTagName("tbody")[0];
	const rows = tableBody.getElementsByTagName("tr");

	Array.from(rows).forEach(row => {
		const cells = row.querySelectorAll("td");

		const checkbox = cells[0].querySelector('input[type="checkbox"]');
		if (checkbox) {
			checkbox.checked = false;
		}

		for (let i = 1; i < cells.length; i++) {
			cells[i].setAttribute("contenteditable", "false");
		}
	});

	console.log(chemicalData);
	alert("Table saved successfully! ");
}
