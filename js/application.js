var form = $('form');
var body = $('body');
var tr = $('tr');
var btnCalculate = $('.btnCalc');
var totalDisplay = $('#total-display');

var createItem = function(event) {
    event.preventDefault();
    var name  = $(this).children('input[name="name"]').val();
    var price = parseFloat($(this).children('input[name="price"]').val()).toFixed(2);
    var quantity = parseInt($(this).children('input[name="quantity"]').val());
    var subtotal = (Math.round(price * quantity * 100)/100).toFixed(2);
    var btnRemove ='<button class="btn btn-primary btnRemove">Remove from Cart</button>'
    $('tbody').append(`<tr><td>${name}</td><td>$${price}</td><td><input class="changeQty" type="number" value=${quantity}></td><td><b>$${subtotal}</b></td><td>${btnRemove}</td></tr>`)
}

var removeItem = function() {
  $(this).closest('tr').remove();
}

var changeQuantity = function() {
   var quantity = parseInt($(this).val());
   var price = parseFloat($(this).parent().prev().text().replace("$",""));
   $(this).parent().next().text(`$ ${(Math.round(price * quantity * 100)/100).toFixed(2)}`);
}

var getTotal = function() {
   var sum = 0;
   $('tr').slice(1).each(function(){
     sum += parseFloat($(this).children('td').eq(3).text().replace("$",""));
   });
   totalDisplay.text(`Total: $ ${sum.toFixed(2)}`);
}

// Event Listeners
form.on('submit',createItem);
body.on('click','.btnRemove',removeItem) 
body.on('change','.changeQty',changeQuantity);
btnCalculate.on('click',getTotal);
