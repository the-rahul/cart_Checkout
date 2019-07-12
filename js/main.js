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
				document.getElementById('promostatus').innerHTML = "<div style='color:green; text-align : center'>Get 20% off</div>";
				
				var total = parseFloat(sessionStorage.getItem("grandtotal")).toFixed(2);
				total = total - (total/5);
				console.log(total);
				
			} else {
				document.getElementById('promostatus').innerHTML = "<div style='color:red; text-align : center'>Wrong Promocode</div>";
			}        
		}
	}
	
	/******* IN PROGRESS **********/
	
	
	/*-------------------
		Change Shipping
	-------------------*/
	
	function changeShipping(change){
		if(!change){
			document.getElementById('shipping').innerHTML = "free";
			var grandtotal = parseFloat(sessionStorage.getItem("grandtotal"));
			//console.log(grandtotal + " -- " + typeof grandtotal);
			document.getElementById('grandTotal').innerHTML = "$" + grandtotal.toFixed(2);
		} else {
			var r = confirm("You will be charged $3.45 as shipping charge!");
			if(r == false){
				return false;
			}
			document.getElementById('shipping').innerHTML = "$3.45";
			var grandtotal = parseFloat(sessionStorage.getItem("grandtotal"));
			//console.log(grandtotal + " -- " + typeof grandtotal);
			grandtotal += 3.45;
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
		if(pathname.includes("checkout.html")){
			document.getElementById('cart-count').innerHTML = count;
			var t = 1;
			var grand_total = 0;
			while(t <= count){
				//console.log(sessionStorage.getItem("imgsrc" + t));
				var total = sessionStorage.getItem("total" + t);
				total = parseFloat(total);
				var str = "<li><div class='pl-thumb'><img src='img/cart/" + sessionStorage.getItem("imgsrc" + t) + "' alt=''></div>"
						+ "<h6>" + sessionStorage.getItem("name" + t) + "</h6>" 
						+ "<p>$" + total.toFixed(2) + "</p></li>";
				document.getElementById("cart_list").innerHTML += str;
				grand_total += total;
				t++;
			}
			sessionStorage.setItem("grandtotal", grand_total);
			document.getElementById("total").innerHTML = "$" + grand_total.toFixed(2);
			document.getElementById('grandTotal').innerHTML = "$" + grand_total.toFixed(2);
			
		} else if(pathname.includes("cart.html")){ // For cart get from local sorage (if available)
			if(count > 0) {
				document.getElementById('cart-count').innerHTML = count;
				document.getElementById('productsInCart').innerHTML = "";
				document.getElementById('grand_total').innerHTML = "$0.00";
				var t = 1;
				var grand_total = 0;
				while(t <= count){
					var name = sessionStorage.getItem("name" + t);
					var price = sessionStorage.getItem("price" + t);
					var qty = sessionStorage.getItem("qty" + t);
					var total = parseFloat(sessionStorage.getItem("total" + t));
					var imgsrc = sessionStorage.getItem("imgsrc" + t);
					
					document.getElementById('productsInCart').innerHTML += "<tr><td class='product-col'>"
					+ "<img src='img/cart/" + imgsrc + "' alt=''>"
					+ "<div class='pc-title'><h4>" + name + "</h4>"
					+ "<p>$" + price + "</p></div></td>"
					+ "<td class='quy-col'>"
					+ "<div class='quantity'>"
					+ "<input type='hidden' value='" + price + "'>"
					+ "<div class='pro-qty'>"
					+ "<input type='text' value='" + qty + "'></div></div></td>"
					+ "<td class='size-col'><h4>$" + price + "</h4></td>"
					+ "<td class='total-col'><h4>$" + total + "</h4></td></tr>";
					
					grand_total += total;
					t++;
				}
				
				document.getElementById('grand_total').innerHTML = "$" + grand_total;
				
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
					//console.log($(this).parent().parent().parent().parent().remove());
				}
			}
			$button.parent().find('input').val(newVal);
		});
		
		/*---------------------------------------------------------
		 For changing Total Price when clicked on quantity
		----------------------------------------------------------- */
		$(document).on("input click", ".quantity", function( event ) {         
			var product_quantity = 0;
			var product_price = 0;
			var sub_total = 0;
			var grand_total = 0;
			var inputs = $(this).find('input');
			
			product_quantity = $(this).find(inputs[1]).val();
			product_price = $(this).find(inputs[0]).val();
			sub_total = parseFloat (product_price * product_quantity).toFixed(2);
			window.sessionStorage.clear(); //clear local storage
			$(this).parent().next().next().html("$" + sub_total);
			
			$('.quantity').each( function( k, v ) {
				var product_name = $(this).parent().prev().find('h4').text();
				var inputs = $(this).find('input');
				product_quantity = parseInt ( $(this).find(inputs[1]).val() ) ? parseInt ( $(this).find(inputs[1]).val() ) : 0;
				product_price = parseFloat($(this).find(inputs[0]).val())?parseFloat($(this).find(inputs[0]).val()):0;
				sub_total = parseFloat (product_price * product_quantity);
				grand_total += sub_total;
				var imgsrc = $(this).parent().prev().find('img')[0].src;
				//imgsrc = imgsrc.substring(34); //Earlier
				imgsrc = imgsrc.substring(imgsrc.lastIndexOf("/")+1); //NOW
				setSessionStorage(product_name, product_price, product_quantity, sub_total, imgsrc); //set local storage for each product
	
			});
			sessionStorage.setItem("grandtotal", grand_total);
			grand_total = parseFloat(grand_total).toFixed(2);
			$("#grand_total").html("$" + grand_total);
			
		});
		
		/*---------------------------------------------------------
		 For setting sessionStorage when clicked on Checkout Button
		----------------------------------------------------------- */
		
		$(document).on("click", ".card-right", function(event){
			var product_quantity = 0;
			var product_price = 0;
			var sub_total = 0;
			var grand_total = 0;
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
				imgsrc = imgsrc.substring(imgsrc.lastIndexOf("/")+1);
				//console.log(imgsrc);
				setSessionStorage(product_name, product_price, product_quantity, sub_total, imgsrc); //set local storage for each product
				
			});
			
			sessionStorage.setItem("grandtotal", grand_total);
		});
		
	});
	// End Document Ready
	
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
