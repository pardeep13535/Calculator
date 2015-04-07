var parameter1 = "0", parameter2 = "", operator1 = "";
var performOp = false, finish = false;

$(document).ready(function()
{
	window.addEventListener("keydown", function(e)
	{
		if (e.keyCode == 8
				&& document.activeElement !== 'text') {
			e.preventDefault();
			performBackSpace();
		}
		else if (e.keyCode == 46
				&& document.activeElement !== 'text') {
			e.preventDefault();
			performDelete();
		}
	});
				
	$('body').keypress(function(event)
	{
		var charCode = (event.charCode) ? event.which : event.keyCode;

		if (charCode > 47 && charCode < 58) {
			if(operator1 == "="){
				parameter1  = "0";
				operator1 = "";
			}
			addParam(charCode - 48);
		}
		else if (charCode == 46) {
			addDot();
		}
		else if (performOp && operator1 && (charCode == 43 || charCode == 42 || charCode == 45 || charCode == 47 || charCode == 61 || charCode == 13)) {
			if(parameter1 == "0" && operator1 == "/"){
				$('.screen3').html("cannot divide by zero");
			} else{
				performOp = false;
				finish = true; 
				parameter1 = "" + eval(parameter2 + operator1 + parameter1);
				parameter2 = "";
				performOperation(performOp, charCode, event);
			}
		}
		else {
			performOperation(performOp, charCode, event);
		}
	});

	$('.buttons').click(function()
	{
		var pressedButton = $(this).text();
		var data = $('.screen3').text();
		if (pressedButton == "1/x") {
			if (parameter1 == "0") {
				$('.screen3').html("cannot divide by zero");
			}
			else {
				data = eval("1/" + data);
				$('.screen3').html(data);
				if ($('.screen1').text()) {
					parameter2 = "" + data;
				}
				else {
					parameter1 = "" + data;
				}
			}
		}
		else if (pressedButton == "SqR") {
			data = Math.sqrt(data);
			$('.screen3').html(data);
			if ($('.screen1').text()) {
				parameter2 = "" + data;
			}
			else {
				parameter1 = "" + data;
			}
		}
		else if (pressedButton == "Sq") {
			data = Math.pow(data, 2);
			$('.screen3').html(data);
			if ($('.screen1').text()) {
				parameter2 = "" + data;
			}
			else {
				parameter1 = "" + data;
			}
		}
		else if (pressedButton == "CL") {
			performBackSpace();
		}
		else if (pressedButton == "Del") {
			performDelete();
		}
		else if (pressedButton == ".") {
			addDot();
		}
		else if (pressedButton == "/" || pressedButton == "*" || pressedButton == "-" || pressedButton == "+" || pressedButton == "=") {
			if(performOp && parameter1 == "0" && operator1 == "/"){
				$('.screen3').html("cannot divide by zero");
			} else{
				if(performOp && operator1){
					performOp = false;
					finish = true; 
					parameter1 = "" + eval(parameter2 + operator1 + parameter1);
					parameter2 = "";
				}
				performOperation(performOp, pressedButton.charCodeAt(0));
			}
		}
		else {
			if(operator1 == "="){
				parameter1  = "0";
				operator1 = "";
			}
			addParam(pressedButton);
		}

	});
});

function performOperation(performOp, charCode, event)
{
	if (!performOp && charCode == 43) {
		$('.screen1').html(parameter1);
		operator1 = "+";
		$('.screen2').html(operator1);
		$('.screen3').html("0");
	}
	else if (!performOp && charCode == 45) {
		$('.screen1').html(parameter1);
		operator1 = "-";
		$('.screen2').html(operator1);
		$('.screen3').html("0");
	}
	else if (!performOp && charCode == 42) {
		$('.screen1').html(parameter1);
		operator1 = "*";
		$('.screen2').html(operator1);
		$('.screen3').html("0");
	}
	else if (!performOp && charCode == 47) {
		if (event) {
			event.preventDefault();
		}

		$('.screen1').html(parameter1);
		operator1 = "/";
		$('.screen2').html(operator1);
		$('.screen3').html("0");
		
	}
	else if (!performOp && finish && (charCode == 61 || charCode == 13)) {
		operator1 = "=";
		finish = false;
		$('.screen1').html("");
		$('.screen2').html("");
		$('.screen3').html(parameter1);
	}
}

function addDot()
{
	if (parameter1.indexOf(".") === -1) {
		parameter1 += '.';
		$('.screen3').html(parameter1);
	}
}

function addParam(val)
{
	if (operator1 && !parameter2) {
		parameter2 = parameter1;
		parameter1 = "0";
		performOp = true;
	}
	if (parameter1 == "0") parameter1 = "";

	parameter1 += val;
	$('.screen3').html(parameter1);
}

function performDelete()
{
	parameter1 = "0";
	parameter2 = "";
	operator1 = "";
	$('.screen1').html("");
	$('.screen2').html("");
	$('.screen3').html(parameter1);
}

function performBackSpace()
{
	if($('.screen3').text() != "0"){
		parameter1 = parameter1.slice(0, -1);
		if (parameter1 == "") parameter1 = "0";
		$('.screen3').html(parameter1);
	}
}