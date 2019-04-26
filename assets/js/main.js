(function ($) {

	var $window = $(window),
		$body = $('body'),
		$document = $(document);

	// Breakpoints.
	breakpoints({
		desktop: ['737px', null],
		wide: ['1201px', null],
		narrow: ['737px', '1200px'],
		narrower: ['737px', '1000px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.

	// Height hack.

	var $sc = $('#sidebar, #content'), tid;

	$window
		.on('resize', function () {
			window.clearTimeout(tid);
			tid = window.setTimeout(function () {
				$sc.css('min-height', $document.height());
			}, 100);
		})
		.on('load', function () {
			$window.trigger('resize');
		})
		.trigger('resize');


	// Title Bar.
	$(
		'<div id="titleBar">' +
		'<a href="#sidebar" class="toggle"></a>' +
		'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>'
	)
		.appendTo($body);

	// Sidebar
	$('#sidebar')
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'sidebar-visible'
		});

})(jQuery);





var iter = 0;
var error = 100;
var xr = 0;
var xp1 = 0;



function f(x) {
	var errormsg = document.getElementById('errormsg')
	var value = document.getElementById('hidden').innerText.toLowerCase(); //Get input math field
	var scope = {
		x: x//solve for X, used by mathjs library
	};

	try {
		var eqn = math.compile(value); //from Mathjs library
		var result = eqn.eval(scope); //Subsitute x in the input function
	} catch (err) { //Catch any errors
		errormsg.innerHTML = '<span style="color: red;">' + err.toString() + '</span>';
	}

	return result; //Return the substitution of x in the function <-- f(x)
}

function clrtab() {
	$('html, body').animate({
		scrollTop: $("#disp").offset().top
	}, 2000);
	document.getElementById('disp').getElementsByTagName('tbody')[0].innerHTML = ''; //Clear table contents
	var errormsg = document.getElementById('errormsg');
	errormsg.innerHTML = '';
}



function bisection(xl, xu, eps) {
	//Uses output function to print results in rows
	var maxiter = document.getElementById('maxiter'); //Get max iterations
	if (error >= eps && iter < maxiter.value) {
		xr = (xl * 1 + xu * 1) / 2;
		error = Math.abs(xl - xu) * 100;
		output_bisection(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return bisection(xl, xu, eps);
	} else { //After finishing the recursive if, we output root, and reset variable values
		var root = document.getElementById('root'); //Select the label where we output root
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toPrecision(5) * 1 + '</span>'; //Output root
		iter = 0;
		error = 100; //since error is now 100, table contents will be reset
	}

}


function output_bisection(iter, xl, fxl, xu, fxu, xr, fxr, error) { //Used for displaying
	var xlf = parseFloat(xl).toPrecision(5) * 1; //for decimal point precision (for example 0.535235535 to 0.53)
	var xuf = parseFloat(xu).toPrecision(5) * 1;
	var fxlf = parseFloat(f(xl)).toPrecision(5) * 1;
	var fxuf = parseFloat(f(xu)).toPrecision(5) * 1;
	var xrf = parseFloat(xr).toPrecision(5) * 1;
	var fxrf = parseFloat(f(xr)).toPrecision(5) * 1;
	var errorf = parseFloat(error).toPrecision(5) * 1; //We multiply by * 1 in the end so if an integer like 3 doesn't display as 3.000
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0]; //inserts a row in the table body
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}

function falsepos(xl, xu, eps) {
	//Uses output function to print results in rows
	var maxiter = document.getElementById('maxiter'); //Get max iterations
	if (error >= eps && iter < maxiter.value) {
		fp = f(xu) * (xl - xu);
		sp = f(xl) - f(xu);
		xr = xu - (fp / sp);
		//xr = xu - ((f(xu)*(xl - xu)) / (f(xl) - f(xu)));
		error = Math.abs(xl - xu) * 100;
		output_falsepos(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return falsepos(xl, xu, eps);
	} else { //After finishing the recursive if, we output root, and reset variable values
		var root = document.getElementById('root'); //Select the label where we output root
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toPrecision(5) * 1 + '</span>'; //Output root
		iter = 0;
		error = 100; //since error is now 100, table contents will be reset
	}

}


function output_falsepos(iter, xl, fxl, xu, fxu, xr, fxr, error) { //Used for displaying
	var xlf = parseFloat(xl).toPrecision(5) * 1; //for decimal point precision (for example 0.535235535 to 0.53)
	var xuf = parseFloat(xu).toPrecision(5) * 1;
	var fxlf = parseFloat(f(xl)).toPrecision(5) * 1;
	var fxuf = parseFloat(f(xu)).toPrecision(5) * 1;
	var xrf = parseFloat(xr).toPrecision(5) * 1;
	var fxrf = parseFloat(f(xr)).toPrecision(5) * 1;
	var errorf = parseFloat(error).toPrecision(5) * 1; //We multiply by * 1 in the end so if an integer like 3 doesn't display as 3.000
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0]; //inserts a row in the table body
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}

function fxp(x0, eps) {
	output_fxp(iter, x0, error, f(x0)); //Uses output function to print results in rows
	var maxiter = document.getElementById('maxiter'); //Get max iterations
	if (error >= eps && iter < maxiter.value) {
		++iter;
		error = Math.abs(x0 - f(x0)) * 100;
		return fxp(f(x0), eps);
	} else { //After finishing the recursive if, we output root, and reset variable values
		var root = document.getElementById('root'); //Select the label where we output root
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>'; //Output root
		iter = 0;
		error = 100; //since error is now 100, table contents will be reset
	}

}


function output_fxp(iter, x0, error, fxo) { //Used for displaying
	var x0f = parseFloat(x0).toPrecision(5) * 1; //for decimal point precision (for example 0.535235535 to 0.53)
	var errorf = parseFloat(error).toPrecision(5) * 1; //We multiply by * 1 in the end so if an integer like 3 doesn't display as 3.000
	var fxof = parseFloat(fxo).toPrecision(5) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0]; //inserts a row in the table body
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + errorf + " %</th></th>";
}

function newton(x0, eps) {

	var maxiter = document.getElementById('maxiter'); //Get max iterations
	xp1 = x0 - (f(x0) / fD(x0));
	error = Math.abs(xp1 - x0) * 100;
	output_newton(iter, x0, f(x0), fD(x0), xp1, error);
	++iter;
	if (error >= eps && iter < maxiter.value) {
		newton(xp1, eps);
	} else { //After finishing the recursive if, we output root, and reset variable values
		var root = document.getElementById('root'); //Select the label where we output root
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>'; //Output root
		iter = 0;
		error = 100; //since error is now 100, table contents will be reset
	}

}

function fD(xin) {
	var MQ = MathQuill.getInterface(2);
	var dervarea = document.getElementById('derv'); //define variable to point to empty span area to output derv

	var expr = document.getElementById('hidden').innerText.toLowerCase(); //Get input math from html

	const x = xin;
	var scope = {
		x: xin //solve for X, used by mathjs library
	};

	var eqn = math.compile(expr); //from Mathjs library  
	var derv = math.derivative(expr, 'x')

	dervarea.innerHTML = derv; //Output derivative in field
	MQ.StaticMath(dervarea);

	var result = derv.eval(scope);
	return result;
}

function output_newton(iter, x0, fx0, fdx0, xp1, error) { //Used for displaying
	var x0f = parseFloat(x0).toPrecision(5) * 1; //for decimal point precision (for example 0.535235535 to 0.53)
	var errorf = parseFloat(error).toPrecision(5) * 1; //We multiply by * 1 in the end so if an integer like 3 doesn't display as 3.000
	var fxof = parseFloat(fx0).toPrecision(5) * 1;
	var fdox = parseFloat(fdx0).toPrecision(5) * 1;
	var xp1f = parseFloat(xp1).toPrecision(5) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0]; //inserts a row in the table body
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + fdox + "</th><th>" + xp1f + "</th><th>" + errorf + " %</th></th>";
}


function clraug() {
	for (var i = 0; i < 12; i++) {
		document.getElementById('augtab').getElementsByTagName('input')[i].value = ''; //Clear table contents - Ehab Osama El-Nabarawy - ehab.ossama@gmail.com
	}
}

$(function () {
	$('#augmat').hide();
	$('#selection').change(function () {
		clrans();
		if ($('#selection').val() == 'sl_gs' || 'sl_lu') {
			$('#augmat').show();
			$('#buttons').show();
			$('.augtab').css('border-radius', '10px/40px');
		}
		if ($('#selection').val() == 'sl_cr') {
			$('#buttons').show();
			$('.augtab').css('border-radius', '0px');
		}

	});
});



$(function btnc() {
	$('#calcbtn').click(function btnc() {
		clrans();
		$('html, body').animate({
			scrollTop: $("#outdiv").offset().top
		}, 1000);
		if ($('#selection').val() == 'sl_gs') { gauss(); }
		if ($('#selection').val() == 'sl_lu') { LU(); }
		if ($('#selection').val() == 'sl_cr') { cramer(); }
	});
});


function clrans() {
	document.getElementById('resdiv').innerHTML = '';
	document.getElementById('outdiv').innerHTML = '';
}


// create a 2D array
function a(rows, cols) {
	var array = new Array(rows);
	for (let i = 0; i < cols; i++) {
		array[i] = new Array(cols);
	}
	return array;
}

function getmatrix() {
	var in_matrix = a(3, 4);

	in_matrix[0][0] = document.getElementById('a1').value;
	in_matrix[0][1] = document.getElementById('a2').value;
	in_matrix[0][2] = document.getElementById('a3').value;
	in_matrix[0][3] = document.getElementById('x1').value;
	in_matrix[1][0] = document.getElementById('b1').value;
	in_matrix[1][1] = document.getElementById('b2').value;
	in_matrix[1][2] = document.getElementById('b3').value;
	in_matrix[1][3] = document.getElementById('x2').value;
	in_matrix[2][0] = document.getElementById('c1').value;
	in_matrix[2][1] = document.getElementById('c2').value;
	in_matrix[2][2] = document.getElementById('c3').value;
	in_matrix[2][3] = document.getElementById('x3').value;

	return in_matrix;

}

function printMatrix(matrix, rows, cols) {

	var out = '<table class="augtab">';
	for (var i = 0; i < rows; i++) {
		out += "<tr>";
		for (var j = 0; j < cols; j++) {
			if ((cols == 4) && (j == cols - 1)) {
				out += "<td style='border: 1px solid #555555; border-top-color: transparent; border-bottom-color: transparent; border-right-color: transparent;'>" + matrix[i][j]; + "</td>";
			}
			else {
				out += "<td>" + matrix[i][j]; + "</td>";
			}
		}
		out += "</tr>";
	}
	document.getElementById('outdiv').innerHTML += out + "</table>" + "<br>";

}






// Gauss Elimination
function gauss() {

	var a = getmatrix();
	var augMat = a;
	//

	$(function () {
		$('.augtab').css('border-radius', '10px/40px');
	});

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}
	// The augmented matrix after the first 2 zeroes
	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> m21 =  ' + m21 + '<br> R2 - (m21)R1 --> R2 </p>';
	printMatrix(augMat, 3, 4);

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}
	// The augmented matrix after the 3 zeroes
	document.getElementById('outdiv').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;"> m32 =  ' + m32 + '<br> R3 - (m22)R2 --> R3 </p>';
	printMatrix(augMat, 3, 4);

	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";

}

// LU Decomposition
function LU() {

	var X = getmatrix();
	var augMat = X;

	$(function () {
		$('.augtab').css('border-radius', '10px/40px');
	});

	var b = [augMat[0][3], augMat[1][3], augMat[2][3]];
	// write gauss elimination code statements again instead of calling the function

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}


	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];

	// end of Gauss Elimination code

	var U = a(3, 4);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			U[i][j] = augMat[i][j];
		}
	}


	U[1][0] = U[2][0] = U[2][1] = 0;
	var L = a(3, 4);
	L = [
		[1, 0, 0, 0],
		[m21, 1, 0, 0],
		[m31, m32, 1, 0]
	];

	// L Matrix
	document.getElementById('outdiv').innerHTML += '<b>L = </b> <br>'; printMatrix(L, 3, 3);
	// U Matrix
	document.getElementById('outdiv').innerHTML += '<b>U = </b> <br>'; printMatrix(U, 3, 3);


	var C = [[augMat[0][3]], [augMat[1][3]], [augMat[2][3]]];
	/*
	var C = new Array(3); // creates an array with 3 undefined elements
	C[0] = b[0] / L[0][0]; 
	C[1] = (b[1] - (L[1][0] * C[0])) / L[1][1]; 
	C[2] = (b[2] - (L[2][0] * C[0]) - (L[2][1] * C[1])) / L[2][2];
	*/
	x3 = C[2] / U[2][2];
	x2 = (C[1] - (U[1][2] * x3)) / U[1][1];
	x1 = (C[0] - (U[0][1] * x2) - (U[0][2] * x3)) / U[0][0];
	document.getElementById('outdiv').innerHTML += '<b>C = </b> <br>'; printMatrix(C, 3, 1);
	//var results = document.getElementById('augmat').getElementById('foot')[0];
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";

}
// ---------------------------------------------------

// Matrix Determinant



function cramer() {
	function matrixDet() {
		return in_matrix[0][0] * (in_matrix[1][1] * in_matrix[2][2] - in_matrix[2][1] * in_matrix[1][2])
			- in_matrix[0][1] * (in_matrix[1][0] * in_matrix[2][2] - in_matrix[2][0] * in_matrix[1][2])
			+ in_matrix[0][2] * (in_matrix[1][0] * in_matrix[2][1] - in_matrix[2][0] * in_matrix[1][1]);
	}
	$(function () {
		$('.augtab').css('border-radius', '0px');
	});

	var X = getmatrix();
	var AA = a(3, 4);
	var in_matrix = a(3, 4);
	AA = in_matrix = X;

	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A| = </p>';
	printMatrix(AA, 3, 3);
	// Cramer's rule
	var Adet = matrixDet(AA);
	console.log("A = " + Adet);
	for (let i = 0; i < 3; i++) {
		// swapping in javascript ==> [x, y] = [y, x];
		// [A/b]
		// swap A1 with b
		[AA[i][0], AA[i][3]] = [AA[i][3], AA[i][0]];
	}

	var A1det = matrixDet(AA);
	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A1| = ' + A1det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A1 = " + A1det);
	for (let i = 0; i < 3; i++) {
		[AA[i][0], AA[i][3]] = [AA[i][3], AA[i][0]];
		[AA[i][1], AA[i][3]] = [AA[i][3], AA[i][1]];
	}


	var A2det = matrixDet(AA);

	document.getElementById('outdiv').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;"> |A2| = ' + A2det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A2 = " + A2det);
	for (let i = 0; i < 3; i++) {
		[AA[i][1], AA[i][3]] = [AA[i][3], AA[i][1]];
		[AA[i][2], AA[i][3]] = [AA[i][3], AA[i][2]];
	}


	var A3det = matrixDet(AA);

	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A3| = ' + A3det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A3 = " + A3det);

	var x1 = (A1det / Adet);
	var x2 = (A2det / Adet);
	var x3 = (A3det / Adet);

	document.getElementById('resdiv').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";


}