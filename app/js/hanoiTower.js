// Проверка подклчения библиотеки hanoiTower.js в которой находиться алгоритм башни Ханоя
console.log("hanoiTower.js is included");
// Хех, начнем переписывать код с C++ на JS

// Эти переменные нужны мне для исполненя ебаной задержки в анимации перемещения колец с одной башни на другую
// Массивы с номерами перемещения башен
var start_array = [],
		finish_array = [],
		start_finish_i=0,
		// delay - задержка анимации (в ms) 
		delay = 250,
		size_buffers = number_of_towers - 2,
		buffers = [];

		// Заполняем массив с буферами
		for(var i=1, x=0; i<=number_of_towers;i++)
		{
			// Буфферы занимают все свободные столбцы, а заняты на данный момет только столбцы начала и конца
			if((i!=number_of_start_tower)&&(i!=number_of_finish_tower))
			{
				buffers[x]=i;
				console.log("buffers[i]= "+buffers[i]);
				x++
			}
		}

function hanoiAlgor(n, start, finish, buffer)
{
	// Запускаем алгоритм Башни Ханоя
	if (number_of_towers==3) 
	{
	algorithm(n,start,finish,buffer);
	}
	else
	{
		// // Заполняем массив с буферами
		// for(var i=1, x=0; i<=number_of_towers;i++)
		// {
		// 			// Буфферы занимают все свободные столбцы, а заняты на данный момет только столбцы начала и конца
		// 	if((i!=number_of_start_tower)&&(i!=number_of_finish_tower))
		// 	{
		// 		buffers[x]=i;
		// 		x++;
		// 	}
		// }
		// function algorithm_n(n, start, finish, buffers, size_buffers)
		algorithm_n(n,start,finish,buffers,size_buffers);

		console.log("number_of_towers>3");
	}

	// Запускаем визуализацию
	// начать повторы с интервалом 2 сек
	// start_finish_k - счетчик
	var start_finish_k=0;
	var timerId = setInterval(function() {
		if (start_finish_k<start_finish_i) 
		{
			swap(start_array[start_finish_k],finish_array[start_finish_k]);
			start_finish_k++;
		}
		else
		{
			//Обнуляем глобальные переменные
			start_array = [];
			finish_array = [];
			start_finish_i = 0;
			clearInterval(timerId);
		}
	}, delay);
}

// Итак теперь у нас есть баня Старта(start) башня конца(finish) и массив башен-буфферов(занимают все отличные от начала и конца башни)
// Начальная позиция             - start  = 1
// Конечная позиция              - finish
// Количестов столбов            - columns
// Количестов колец              - rings
// Буффер         при columns=3  - buffer1
// Размер буффера при columns>3  - size_buffers
// Буфер при columns>3           - buffers

// Функция алгоритма башни Ханоя для N башен
function algorithm_n(n, start, finish, buffers, size_buffers)
{
	// 1. Перекладываем самые маленькие кольца на дополнительные буфферы (start->buffers)
	for(var i=0;i<size_buffers-1;i++)
	{
		// std::cout << start << " " << buffers[i] << '\n';
		console.log(start+" "+buffers[i]);
		start_array[start_finish_i] = start;
		finish_array[start_finish_i] = buffers[i];
		start_finish_i++;
	}
	console.log("Переложил");
	// 2. После чего забываем про все вспомогательные буфферы кроме последнего(buffers[size_buffers-1]), который мы будем использовать для функции hanoi
	//    Запускаем рекурсивную функцию hanoi с параметрами n = n-size_buffers+1, start, finish и последним свободным буффером - buffers[size_buffers-1]
	//    n = n-size_buffers+1 - Общее количество колец - кольца оставшиеся на столбцах-буфферах
	//    и +1 из за того, что на последнем столбце-буффере нет кольца, так как мы используем этот буффер для функции hanoi
	algorithm(n-size_buffers+1,start,number_of_finish_tower,buffers[size_buffers-1]);
	// После этого все кольца,кроме колец, оставленных на столбцах-буфферах, будут находиться на конечной башне.
	// Для окончания алгоритма нам осталось переложить кольца с столбцов буфферов на конечную башню, что мы и сделаем.
	// 3. Перекладываем кольца c дополнительных буфферов на конечную башню в порядке убывания,
	// В начале самое большое(buffer[size_buffers-2]) а в конце самое маленькое(buffer[0]) (buffers->finish)
	console.log("Переложил");
	console.log(size_buffers-1+" --");
	for(var i=size_buffers-1;i>0;i--)
	{
		// std::cout << start << " " << buffers[i] << '\n';
		console.log(buffers[i-1]+" "+number_of_finish_tower);
		start_array[start_finish_i] = buffers[i-1];
		finish_array[start_finish_i] = number_of_finish_tower;
		start_finish_i++;
		console.log(start_finish_i);
	}


}


// Функция алгоритма башни Ханоя для трех башен
function algorithm(n, start, finish, buffer)
{
	//Если количество колец(n) == 0 то выходим из функции(рекурсии) под названием hanoi
	if (n==0)
	{
		// console.log("n=0");
		return;
	}
	// Eсли количество колец на башне под номером start больше нуля то :
	else
	{
		// console.log("n>0");
		// 1. Перекладываем n-1 колец с башни начала(start) на башню-буффер(buffer)
		algorithm(n-1,start,buffer,finish);
		// setTimeout(algorithm, 500,n-1,start,buffer,finish);
		//    Самое большое кольцо останеться на начальной(start) башне, а остальные перейдут на башню буффер
		// 2. После чего перекладываем самое большое кольцо с стартовой позиции на конечную (start -> finish)
		// std::cout << start << " " << finish << '\n';
		console.log(start+" "+finish);
		start_array[start_finish_i] = start;
		finish_array[start_finish_i] = finish;
		start_finish_i++;
		//    Теперь Самое большое кольцо находится на финишной позостальные кольца на дополнительной башне(buffer)
		//    Начальная башня(start) теперь пуста
		// 3. Чтобы завершить алгоритм нам нужно переместить оставшие кольца c башни-буффера на конечную позицию
		//    Теперь в роли буффера будет выступать башня start она пустая,
		//    В роли стартовой башни - buffer
		//
		//    Начальная башня - buffer
		//    Конечная башня - finish
		//    Башня буффер - start
		// setTimeout(algorithm, 1000,n-1,buffer,finish,start);
		algorithm(n-1,buffer,finish,start);
		// Итого все башни находятся на конечной башне
		// Finish!!!
	}
}

