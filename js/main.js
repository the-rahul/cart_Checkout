/* =================================
------------------------------------
	Divisima | eCommerce Template
	Version: 1.0
 ------------------------------------
 ====================================*/

'use strict';


	
	
	
	/******* IN PROGRESS **********/
	
	function applyPromo(){
		if(event.key === 'Enter') {
			var promo = document.getElementById('promocode').value;
			if(promo.toLowerCase() === 'rahul'){
				$('.card-right').find('input')[0].value = "";
				$('.card-right').find('input').attr('disabled','disabled');
				$('.card-right').find('span')[0].innerHTML = "<div id='appliedPromo'  class='alert alert-success'><span>" + promo + "</span></span><span class='close' onclick='removePromo()'>x</span></div>";
				
				document.getElementById('promostatus').innerHTML += "<div style='color:green; text-align : center' id='promoinfo'>Got 20% off</div>";
				
				var total = parseFloat(sessionStorage.getItem("grandtotal"));
				total = (total - (total/5)).toFixed(2);
				
				document.getElementById('total-cost').innerHTML = "<h6 style='text-decoration: line-through;' id='originalPrice'>$" + parseFloat(sessionStorage.getItem("grandtotal")).toFixed(2) + "</h6>" + "<h6>Total <span id='grand_total'>$" + total + "</span></h6>";
				
				sessionStorage.setItem("isdiscount", "yes");
				sessionStorage.setItem("discount", total);
				sessionStorage.setItem("promocode", promo);
				
				
			} else {
				document.getElementById('promostatus').innerHTML = "<div style='color:red; text-align : center'>Wrong Promocode<br>Use Code 'rahul' to get 20% off</div>";
				
				$('#originalPrice').remove();
				
				document.getElementById('grand_total').innerHTML = "$" + parseFloat(sessionStorage.getItem("grandtotal")).toFixed(2);
				
				sessionStorage.removeItem("isdiscount");
				sessionStorage.removeItem("promocode");
				sessionStorage.removeItem("discount");
				
			}        
		}
	}
		
		
	/******* IN PROGRESS **********/
	
	
	/*-------------------
		Change Shipping 		****** TODO ******
	-------------------*/
	
	function changeShipping(change){
		if(!change){
			document.getElementById('shipping').innerHTML = "free";
			var grandtotal = document.getElementById('grandTotal').innerHTML;
			grandtotal = parseFloat(grandtotal.substring(1));
			if(document.getElementById("ship-2").disabled){
				grandtotal = grandtotal - 3.45;
			}
			document.getElementById("ship-2").disabled = false;
			document.getElementById("ship-1").disabled = true;
			//console.log(grandtotal + " -- " + typeof grandtotal);
			document.getElementById('grandTotal').innerHTML = "$" + grandtotal.toFixed(2);
		} else {
			var r = confirm("You will be charged $3.45 as shipping charge!");
			if(r == false){
				return false;
			}
			document.getElementById('shipping').innerHTML = "$3.45";
			document.getElementById("ship-2").disabled = true;
			document.getElementById("ship-1").disabled = false;
			var grandtotal = document.getElementById('grandTotal').innerHTML;
			grandtotal = grandtotal.substring(1);
			//console.log(grandtotal + " -- " + typeof grandtotal);
			grandtotal = parseFloat(grandtotal) + 3.45;
			document.getElementById('grandTotal').innerHTML = "$" + grandtotal.toFixed(2);
		}
	}
	

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.main-menu').slicknav({
		prependTo:'.main-navbar .container',
		closedSymbol: '<i class="flaticon-right-arrow"></i>',
		openedSymbol: '<i class="flaticon-down-arrow"></i>'
	});


	/*------------------
		ScrollBar
	--------------------*/
	$(".cart-table-warp, .product-thumbs").niceScroll({
		cursorborder:"",
		cursorcolor:"#afafaf",
		boxzoom:false
	});


	/*------------------
		Category menu
	--------------------*/
	$('.category-menu > li').hover( function(e) {
		$(this).addClass('active');
		e.preventDefault();
	});
	$('.category-menu').mouseleave( function(e) {
		$('.category-menu li').removeClass('active');
		e.preventDefault();
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	/*------------------
		Hero Slider
	--------------------*/
	var hero_s = $(".hero-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
        navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        onInitialized: function() {
        	var a = this.items().length;
            $("#snh-1").html("<span>1</span><span>" + a + "</span>");
        }
    }).on("changed.owl.carousel", function(a) {
        var b = --a.item.index, a = a.item.count;
    	$("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");

    });

	hero_s.append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
	$(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo('.slider-nav');



	/*------------------
		Brands Slider
	--------------------*/
	$('.product-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin : 30,
		autoplay: true,
		navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
		responsive : {
			0 : {
				items: 1,
			},
			480 : {
				items: 2,
			},
			768 : {
				items: 3,
			},
			1200 : {
				items: 4,
			}
		}
	});


	/*------------------
		Popular Services
	--------------------*/
	$('.popular-services-slider').owlCarousel({
		loop: true,
		dots: false,
		margin : 40,
		autoplay: true,
		nav:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive : {
			0 : {
				items: 1,
			},
			768 : {
				items: 2,
			},
			991: {
				items: 3
			}
		}
	});


	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});


	/*-------------------
		Range Slider
	--------------------- */
	var rangeSlider = $(".price-range"),
		minamount = $("#minamount"),
		maxamount = $("#maxamount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function (event, ui) {
			minamount.val('$' + ui.values[0]);
			maxamount.val('$' + ui.values[1]);
		}
	});
	minamount.val('$' + rangeSlider.slider("values", 0));
	maxamount.val('$' + rangeSlider.slider("values", 1));
	
	/*-------------------
			Zoom
	--------------------- */	
	
	$('.product-pic-zoom').zoom();



	/*------------------
		Single Product
	--------------------*/
	$('.product-thumbs-track > .pt').on('click', function(){
		$('.product-thumbs-track .pt').removeClass('active');
		$(this).addClass('active');
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product-big-img').attr('src');
		if(imgurl != bigImg) {
			$('.product-big-img').attr({src: imgurl});
			$('.zoomImg').attr({src: imgurl});
		}
	});
	
	/*-------------------
		 calculation
	--------------------- */
	
	
	$(document).ready(function() {

		var pathname = window.location.pathname;
		var count = getCount();
		if(count > 0)
			document.getElementById('cart-count').innerHTML = count;
		
		if(pathname.includes("checkout.html")){

			if(count >0){
				var t = 1;
				var grand_total = 0;
				while(t <= count){
					var total = sessionStorage.getItem("total" + t);
					total = parseFloat(total);
					var str = "<li><div class='pl-thumb'><img src='img/" + sessionStorage.getItem("imgsrc" + t) + "' alt=''></div>"
							+ "<h6>" + sessionStorage.getItem("name" + t) + "</h6>" 
							+ "<p>$" + total.toFixed(2) + "</p></li>";
					document.getElementById("cart_list").innerHTML += str;
					grand_total += total;
					t++;
				}
				sessionStorage.setItem("grandtotal", grand_total);
				
				document.getElementById("total").innerHTML = "$" + grand_total.toFixed(2);
				document.getElementById('grandTotal').innerHTML = "$" + grand_total.toFixed(2);
				
				var discount = sessionStorage.getItem("discount");
				console.log(discount);
				if(discount != null && discount != '0.00'){
					var oldHTML = document.getElementById('grandTotal').innerHTML;
					document.getElementById('total-cost').innerHTML = "<span style='text-decoration: line-through;'>" + oldHTML + "</span>" + "<br>Total<span id='grandTotal'>$" + discount + "</span>";
				}
			} else { // Cart is Empty
				document.getElementById('checkout').innerHTML = "<div><h3>Your Cart is Empty</h3></div>"
			}
			
		} else if(pathname.includes("cart.html")){
			if(count > 0) {
				document.getElementById('productsInCart').innerHTML = "";
				document.getElementById('grand_total').innerHTML = "$0.00";
				var t = 1;
				var grand_total = 0;
				while(t <= count){
					var name = sessionStorage.getItem("name" + t);
					var price = parseFloat(sessionStorage.getItem("price" + t)).toFixed(2);
					var qty = sessionStorage.getItem("qty" + t);
					var total = parseFloat(sessionStorage.getItem("total" + t));
					var imgsrc = sessionStorage.getItem("imgsrc" + t);
					
					document.getElementById('productsInCart').innerHTML += "<tr><td class='product-col'>"
					+ "<img src='img/" + imgsrc + "' alt=''>"
					+ "<div class='pc-title'><h4>" + name + "</h4>"
					+ "<p>$" + price + "</p></div></td>"
					+ "<td class='quy-col'>"
					+ "<div class='quantity'>"
					+ "<input type='hidden' value='" + price + "'>"
					+ "<div class='pro-qty'>"
					+ "<input type='text' value='" + qty + "' disabled></div></div></td>"
					+ "<td class='size-col'><h4>$" + price + "</h4></td>"
					+ "<td class='total-col'><h4>$" + total.toFixed(2) + "</h4></td></tr>";
					
					grand_total += total;
					t++;
				}
				
				document.getElementById('grand_total').innerHTML = "$" + parseFloat(grand_total).toFixed(2);
				
				var total = parseFloat(sessionStorage.getItem("grandtotal"));
				
				var discount = sessionStorage.getItem("discount");
				console.log(discount);
				
				if(discount != null && discount != '0.00'){
					discount = (total - (total/5)).toFixed(2);
					sessionStorage.setItem("discount", discount);
					document.getElementById('total-cost').innerHTML = "<h6 style='text-decoration: line-through;' id='originalPrice'>$" + parseFloat(sessionStorage.getItem("grandtotal")).toFixed(2) + "</h6>" + "<h6>Total <span id='grand_total'>$" + discount + "</span></h6>";
				}
				
				var isDiscount = sessionStorage.getItem("isdiscount");
				var promocode = sessionStorage.getItem("promocode");
				console.log(isDiscount);
				console.log(promocode);
				if(isDiscount != null){
					$('.card-right').find('input').attr('disabled','disabled');
					$('.card-right').find('span')[0].innerHTML = "<div id='appliedPromo' class='alert alert-success'><span>" + promocode + "</span><span class='close' onclick='removePromo()'>x</span></div>";
				}
					
			} else {//TODO : empty cart
				document.getElementById('tableDiv').innerHTML = "<div><h3>Your Cart is Empty</h3></div>"
			}
		}
		

		
		/*-------------------
			Quantity change
		--------------------- */
		
		var proQty = $('.pro-qty');
		proQty.prepend('<span class="dec qtybtn">-</span>');
		proQty.append('<span class="inc qtybtn">+</span>');
		proQty.on('click', '.qtybtn', function () {
			var $button = $(this);
			var oldValue = $button.parent().find('input').val();
			if ($button.hasClass('inc')) {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				// Don't allow decrementing below zero
				if (oldValue > 1) {
					newVal = parseFloat(oldValue) - 1;
				} else {
					alert("Remove Item?");
					newVal = 0;
					$(this).parent().parent().parent().parent().remove();
					location.reload(true);
					//console.log($(this).parent().parent().parent().parent().remove());
				}
			}
			$button.parent().find('input').val(newVal);
		});
		
		/*---------------------------------------------------------
		 For changing Total Price when clicked on quantity
		----------------------------------------------------------- */
		$(document).on("click", ".quantity", function( event ) {         
			var product_quantity = 0;
			var product_price = 0;
			var sub_total = 0;
			var grand_total = 0;
			var inputs = $(this).find('input');
			//Saving this data before clearing storage
			var discount = sessionStorage.getItem("discount");
			var isDiscount = sessionStorage.getItem("isdiscount");
			var promocode = sessionStorage.getItem("promocode");
			
			product_quantity = $(this).find(inputs[1]).val();
			product_price = $(this).find(inputs[0]).val();
			sub_total = parseFloat (product_price * product_quantity).toFixed(2);
			window.sessionStorage.clear(); //clear local storage
			$(this).parent().next().next().html("<h4>$" + sub_total + "</h4>");
			
			$('.quantity').each( function( k, v ) {
				var product_name = $(this).parent().prev().find('h4').text();
				var inputs = $(this).find('input');
				product_quantity = parseInt ( $(this).find(inputs[1]).val() ) ? parseInt ( $(this).find(inputs[1]).val() ) : 0;
				product_price = parseFloat($(this).find(inputs[0]).val())?parseFloat($(this).find(inputs[0]).val()):0;
				sub_total = parseFloat (product_price * product_quantity);
				grand_total += sub_total;
				var imgsrc = $(this).parent().prev().find('img')[0].src;
				imgsrc = imgsrc.split("img/")[1]; //Latest
				setSessionStorage(product_name, product_price, product_quantity, sub_total, imgsrc); //set local storage for each product
	
			});
			
			sessionStorage.setItem("grandtotal", grand_total);
			grand_total = parseFloat(grand_total).toFixed(2);
			$("#grand_total").html("$" + grand_total);
			sessionStorage.setItem("discount", discount);
			if(discount != null){
				$("#originalPrice").html("$" + grand_total);
				var total = parseFloat(sessionStorage.getItem("grandtotal"));
				total = (total - (total/5)).toFixed(2);
				sessionStorage.setItem("discount", total);
				sessionStorage.setItem("promocode", promocode);
				sessionStorage.setItem("isdiscount", isDiscount);
				document.getElementById('grand_total').innerHTML = "$" + total;
			}
			
		});
		
		/*---------------------------------------------------------
		 For setting sessionStorage when clicked on Checkout Button
		----------------------------------------------------------- */
		
		$(document).on("click", ".card-right", function(event){
			var product_quantity = 0;
			var product_price = 0;
			var sub_total = 0;
			var grand_total = 0;
			//Saving this data before clearing storage
			var discount = sessionStorage.getItem("discount");
			var isDiscount = sessionStorage.getItem("isdiscount");
			var promocode = sessionStorage.getItem("promocode");
			
			window.sessionStorage.clear(); //clear local storage
			
			$('.quantity').each( function( k, v ) {
				var product_name = $(this).parent().prev().find('h4').text();
				var inputs = $(this).find('input');
				product_quantity = parseInt ( $(this).find(inputs[1]).val() ) ? parseInt ( $(this).find(inputs[1]).val() ) : 0;
				product_price = parseFloat($(this).find(inputs[0]).val())?parseFloat($(this).find(inputs[0]).val()):0;
				sub_total = parseFloat (product_price * product_quantity);
				grand_total += sub_total;
				var imgsrc = $(this).parent().prev().find('img')[0].src;
				//console.log(imgsrc);
				//imgsrc = imgsrc.substring(imgsrc.lastIndexOf("/")+1);
				imgsrc = imgsrc.split("img/")[1];
				//console.log(imgsrc);
				setSessionStorage(product_name, product_price, product_quantity, sub_total, imgsrc); //set local storage for each product
				
			});
			
			sessionStorage.setItem("grandtotal", grand_total);
			sessionStorage.setItem("discount", discount);
			sessionStorage.setItem("promocode", promocode);
			sessionStorage.setItem("isdiscount", isDiscount);
		});
		
		$('.pi-text').each(function( index ) {
				var p_name = $(this).find('p')[0].innerHTML;
				var t=1;
				var sessionName;
				while(count >= t){
					sessionName = sessionStorage.getItem('name' + t);
					if(p_name === sessionName){
						$(this).prev().find('div.pi-links')[0].innerHTML = "<div class='alreadyAddedToCart'>Already Added to Cart</div>";
					}
					t++;
				}
		});
		
	});
	// End Document Ready
	
	/*------------------------
			Add To Cart
	------------------------ */
	
	$(document).on("click", ".add-card", function(event){
		
		var p_name = $(this).parent().parent().next().find('p').text();
		var p_price = $(this).parent().parent().next().find('h6').text();
		p_price = p_price.substring(1);
		var p_qty = '1';
		var total = p_price;
		var imgsrc = $(this).parent().parent().find('img')[0].src;
		imgsrc = imgsrc.split("img/")[1];
		
		var grandTotal = parseFloat(sessionStorage.getItem("grandtotal"));
		if(grandTotal == null)
			sessionStorage.setItem("grandtotal", total);
		else {
			total = parseFloat(total) + grandTotal;
			console.log(total);
			sessionStorage.setItem("grandtotal", total);
		}
		//console.log("p_name : " + p_name + "\np_price : " + p_price + "\np_qty : " + p_qty + "\ntotal : " + total + "\nimgsrc : " + imgsrc );
		
		setSessionStorage(p_name, p_price, p_qty, total, imgsrc);
		
		$(this).parent().parent().find('div.pi-links')[0].outerHTML = "<div class='addedToCart'>Added to Cart</div>";
		
		var pathname = window.location.pathname;
		if(pathname.includes("cart.html")){
			location.reload(true);
		}
		
	});
	
	
	
	
	/*------------------------
			Local Storage
	------------------------ */
	
	function setSessionStorage(name, price, qty, total, imgsrc){
		if(qty == 0){
			return false;
		}
		setCount();
		var count = getCount();
		sessionStorage.setItem("name" + count, name);
		sessionStorage.setItem("price" + count, price);
		sessionStorage.setItem("qty" + count, qty);
		sessionStorage.setItem("total" + count, total);
		sessionStorage.setItem("imgsrc" + count, imgsrc);
	}
	
	//Set the count of products
	function setCount(){
		var count = parseInt(getCount());
		sessionStorage.setItem("count", ++count);
	}
	
	//Get the count of products from local storage
	function getCount(){
		var count;
		var tmp = sessionStorage.getItem("count");
		if(isNaN(tmp))
			count = 0;
		else if(tmp == null)
			count = 0;
		else
			count = tmp;
		return count;
	}
	
	
	//End of Local Storage


})(jQuery);


	function removePromo(){
		$('.card-right').find('input').removeAttr('disabled');
		$('#appliedPromo').remove();
		sessionStorage.removeItem("isdiscount");
		sessionStorage.removeItem("promocode");
		sessionStorage.removeItem("discount");
		
		var originalPrice = $('#originalPrice').text();
		$('#originalPrice').remove();
		$('#grand_total').text(originalPrice);
		$('#promoinfo').remove();
		console.log("originalPrice : " + originalPrice);
	}
