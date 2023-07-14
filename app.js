window.onload = setTimeout(function(){
    let preloader = document.getElementById('preloader')
    preloader.style.display = 'none'
}, 1000);

$(document).ready(function (){
    $('.burger').click(function (event) {
        $('.burger, .mobile-link').toggleClass('active');
    })
})
$('.mobile-link a').click(function (event) {
    $('.mobile-link').removeClass('active');
});

$(function () {
    $("#card-items").slideUp();
    $(".cardbs").on("click", function () {
        $("#card-items").slideToggle();
    });

    function calculateTotalPrice(){
     var totalPrice = 0;
     $(",eachPrice").each(function() {
      var priceText = $(this).text().replace(/\s/g,"").replace(",",".")
        var price = parseFloat(priceText);
        totalPrice += price;
     });
     $("#total-price").text(totalPrice.toFixed(2) + "р")
    
        if ($("list-item").children().legth > 0) {
            $("btn-basket").show();
        } else {
            $(".btn-basket").hide();
        }
   
    }

    $(".i-card .basket").on("click", function () {
        var name = $(this).closest(".i-card ").find("h3").text();
        var priceText = $(this).closest(".i-card ").find(".price").text();
        var price = parseFloat(priceText.replace(/\s/g,"").replace(",","."));
        var remove = "<button class='remove'> X </button>";
        var cena =  "<span class='eachPrice'>" + price.toFixed(2) + " р</span>";

        $("#list-item").append("<li>" + name + " - " + cena + remove + "</li>")
    
        $("#items-basket").text("(" + ($("#list-item").children().length) + ")")

        calculateTotalPrice();

        var orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
        orderItems.push({ name: name, price: price})
        localStorage.setItem("orderItems", JSON.stringify(orderItems))

        updateOrderItems();
    });

    $("#list-item").on("click",".remove", function () {
      $(this).parent().remove();
      $("#items-basket").text("("  +  ($("#list-item").children().length) + ")");
      
      calculateTotalPrice();

      updateOrderItems();
    })

    
})

