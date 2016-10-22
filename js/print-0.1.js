// Move the center of the div that contains the overlay of text on the image and also verify that the string is not longer than 12 or 0.
function calculateCenter(field, str) {
		if (str.length > 0 && str.length < 13) {
			// Turns out 52 is the middle of the div on the image when printing.
			document.getElementById(field).style.left = 52-(str.length/2);
			document.getElementById(field).innerHTML = str;
			return true;
		} else {
			return false;
		}
}

// If calculateCenter returns true then fill in our fields in the print div
function submitForm() {
	if (calculateCenter('store_text_shirt',document.getElementById('text').value)) { 
		var currentdate = new Date(); 
		var datetime = currentdate.getFullYear() + "-"
			+ (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + " "  
			+ currentdate.getHours() + ":"  
			+ currentdate.getMinutes();
		calculateCenter('customer_text_shirt',document.getElementById('text').value);
		document.getElementById('store_text').innerHTML = "<h4>"+document.getElementById('text').value+"</h4>";
		document.getElementById('customer_text').innerHTML = "<h4>"+document.getElementById('text').value+"</h4>";
		document.getElementById('store_color').innerHTML = "<h4>"+document.getElementById('color').value+"</h4>";
		document.getElementById('customer_color').innerHTML = "<h4>"+document.getElementById('color').value+"</h4>";
		document.getElementById('store_font').innerHTML = "<h4>"+document.getElementById('font').value+"</h4>";
		document.getElementById('customer_font').innerHTML = "<h4>"+document.getElementById('font').value+"</h4>";
		document.getElementById('store_size').innerHTML = "<h4>"+document.getElementById('size').value+"</h4>";
		document.getElementById('customer_size').innerHTML = "<h4>"+document.getElementById('size').value+"</h4>";
		document.getElementById('store_time').innerHTML = "<h4>"+datetime+"</h4>";
		document.getElementById('customer_time').innerHTML = "<h4>"+datetime+"</h4>";
		$('#print').show();
		return true;
	} else {
		$('#error').show();
		document.getElementById('text').focus();
		setTimeout(function(){ $('#error').hide(); }, 5000);
		return false;
	}
}

// If submitForm returns true, then hide the form and show the page to be printed instead
function printForm() {
	if (submitForm()) {
		$('#form').hide();
		$('#print_page').show();
		window.print();
		$('#print_page').hide();
		$('#form').show();
	}
}

// Since we don't actually post things in our form, this will remove the enter functionality and send it to our printForm function instead
$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			printForm();
	    }
	});
});
