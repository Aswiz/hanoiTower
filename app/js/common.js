var hanoi = [];
		hanoi[1] = document.body.children[2].children[0];
		hanoi[2] = document.body.children[2].children[1];
		hanoi[3] = document.body.children[2].children[2];
		hanoi[4] = document.body.children[2].children[3];
		hanoi[5] = document.body.children[2].children[4];
		hanoi[6] = document.body.children[2].children[5];
		hanoi[7] = document.body.children[2].children[6];
		hanoi[8] = document.body.children[2].children[7];

// Номер начальной башни
var number_of_start_tower="1";

for(var i=0; i<hanoi[1].children.length; i++)
{
	hanoi[1].children[i].style.display = "none";
	hanoi[2].children[i].style.display = "none";
	hanoi[3].children[i].style.display = "none";
	hanoi[4].children[i].style.display = "none";
	hanoi[5].children[i].style.display = "none";
	hanoi[6].children[i].style.display = "none";
	hanoi[7].children[i].style.display = "none";
	hanoi[8].children[i].style.display = "none";
}
// Функция выводит сообщение с просьбой ввести количество используемых башен
function input_number_of_towers()
{
	var message="Введите количество башен";
	var number_of_towers = prompt(message, 3);
	if ((number_of_towers<3)||(number_of_towers>8)) 
	{
		alert("Башен должно быть больше двух и меньше восьми!")
		input_number_of_towers();
	}
	return number_of_towers;
}
// Функция выводит сообщение с просьбой ввести количество колец
function input_number_of_rings()
{
	var message="Введите количество колец";
	var number_of_rings = prompt(message, 3);
	if (number_of_rings<3) 
	{
		alert("Колец должно быть больше двух!")
		input_number_of_rings();
	}
	return number_of_rings;
}
// Функция выводит сообщение с просьбой ввести номер конечной башни
function input_number_of_finish_tower(number_of_towers,number_of_start_tower)
{
	var message="Введите номер конечной башни";
	var number_of_finish_tower = prompt(message, 3);
	if ((number_of_finish_tower>number_of_towers)||(number_of_finish_tower===number_of_start_tower))
	{
		alert("Номер конечной башни должен быть меньше количества башен и не должен быть равен номеру начальной башни!")
		input_number_of_finish_tower(number_of_towers,number_of_start_tower);
	}
	return number_of_finish_tower;
}


var number_of_towers = input_number_of_towers(),
		number_of_rings = input_number_of_rings(),
		number_of_finish_tower = input_number_of_finish_tower(number_of_towers,number_of_start_tower);
displayTowers(number_of_start_tower);


// Показывает всю башню по её номеру
function displayTower(tower,number_of_rings)
{
	for(var i=0; i<number_of_rings; i++)
	{
		hanoi[tower].children[i].style.display = "inline";
	}
}
// Скрывает всю башню по её номеру
function hideTower(tower)
{
	for(var i=0; i<hanoi[tower].children.length; i++)
	{
		hanoi[tower].children[i].style.display = "none";
	}
}
// Показывает Nное количестов башен начиная с первой
function displayTowers(number_of_towers)
{
	for(var i=1; i<=number_of_towers;i++)
	{
		displayTower(i,number_of_rings);
	}
}

// Функция ищет первый видимый блок на башне
function minTower(tower)
{
	var number;
	for(var i = 0; i<hanoi[tower].children.length; i++)
	{
		if (hanoi[tower].children[i].style.display === "inline") 
		{
			number=i;
		}
	}
	//console.log(number+" - minTower " + tower);
	return number;
}
// Функция перемещает кольцо с башни под номером start на башню под номером finish
function swap(start, finish)
{
	if ((start<=number_of_towers)&&(finish<=number_of_towers))
	{
		if ((minTower(start)>minTower(finish))||(minTower(finish)===undefined))
		{
			console.log(minTower(start)+" minTower(start)");
			console.log(minTower(finish)+" minTower(finish)");
			//			
			var ring=minTower(start);
			//console.log(ring+" ring");
			hanoi[start].children[ring].style.display = "none";
			hanoi[finish].children[ring].style.display = "inline";
		}
	}
}





// console.log(hanoi[1].children);