jQuery(document).ready(function($){
	/* *** Deals Timer *** */
    var timer_status = false;
    //var timeinterval = false;
    function showProductPopUp(){
        $("#toggle-slide-right").modal('show');
        var time_in_minutes = 5;
        var time_counter = 0;
        var total_sec = time_in_minutes*60;
        var current_time = Date.parse(new Date());
        var deadline = new Date(current_time + time_in_minutes*60*1000);
        function time_remaining(endtime){
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
        }
        function run_clock(id,endtime){
            var clock = document.getElementById(id);
            function update_clock(){
            //timer_status = true;
            time_counter++;
            var t = time_remaining(endtime);
            clock.innerHTML = t.minutes+'<sub>m</sub>'+' : '+t.seconds+'<sub>s</sub>';
            var timer_progress = Math.ceil((((total_sec-time_counter)/(total_sec)) *100));
            $('.progress-bar').css('width',timer_progress+'%');
                if(t.total<=0){ clearInterval(timeinterval);
                    // $('#deal_timer').hide();
                    $('#deal_timer').addClass('hidden-timer');
                    // $('.modal-header .progress').hide();
                    $('.modal-header .progress').addClass('progress_hidden');
                    // $('.products-area').addClass("timer-hidden");
                }
            } 
            update_clock(); // run function once at first to avoid delay
            if(timer_status == false){
                var timeinterval = setInterval(update_clock,1000);
                timer_status = true;
            }else{
            //clearInterval(timeinterval);
            //timeinterval = null;
            //timeinterval = setInterval(update_clock,1000);
            }
        }
        run_clock('deal_timer',deadline);
        }
    /* **** Deals Timer End **** */
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }
	
	/* **** UTC Deals Timer End **** */
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }
	
	/* **** UTC Deals Timer End **** */

	/* **** Footer Timer **** */
	function getTimeRemainingUTC(endtime){
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;
		const currentDate = new Date();
		const currentDateUTC = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
		const total = endtime - currentDateUTC;
		
		var days = Math.floor(total / day);
		var hours = Math.floor((total % day) / hour);
		var minutes = Math.floor((total % hour) / minute);
		var seconds = Math.floor((total % minute) / second);
		
		return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
		
	}
	
	Date.prototype.addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	
	/* UTC Timer Restart */
	function timerRestartUTC(start_date, timer_days){
		if(start_date == ''){
			const currentDateTime = new Date();
			var endtime = new Date(currentDateTime.getUTCFullYear(),currentDateTime.getUTCMonth(),currentDateTime.getUTCDate()+5, 0, 0, 0);
		}else{
			var start_date = $('#pgCountDown').attr("data-start-date");
			start_date = start_date.split('/');
			end_year = start_date[2];
			end_month = start_date[0]-1;
			end_day = start_date[1];
			
			const startDateTime = new Date();
			var d = parseInt(end_day);
			startDateTime.setDate(parseInt(end_day));
			startDateTime.setMonth( parseInt(end_month));
			startDateTime.setYear(parseInt(end_year));
			var timer_expiry = new Date(startDateTime.getUTCFullYear(), startDateTime.getUTCMonth(), startDateTime.getUTCDate(), 0, 0, 0);

			var current_date_now = new Date();
			var current_date_UTC = new Date(
				current_date_now.getUTCFullYear(),
				current_date_now.getUTCMonth(),
				current_date_now.getUTCDate(),
				current_date_now.getUTCHours(),
				current_date_now.getUTCMinutes(),
				current_date_now.getUTCSeconds()
			);
			endtime = timer_expiry

			while(current_date_UTC > endtime){
				endtime = timer_expiry.setDate(timer_expiry.getDate() + parseInt(timer_days));
			}

		}
		console.log(new Date(endtime));
		initializeClock('clockdiv', endtime);
		
	}
	
    //const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    //initializeClock('clockdiv', deadline);
	
    /* ***** Page Timer Countdown ***** */
    $("#pgCountDown").each(function () {
        var end_year = 0;
        var end_month = 0;
        var end_day = 0;
        var end_time = 0;
        var end_min = 0;
        var StartDate = new Date();
		
        if ( (typeof $(this).attr("data-end-date") !== "undefined") && ($('#pgCountDown').attr("data-timer-type") == 'regular') ) {
            var end_date = $(this).attr("data-end-date");
			end_date = end_date.split('/');
			end_year = end_date[2];
			end_month = end_date[0]-1;
			end_day = end_date[1];
        }
		
		if ( (typeof $(this).attr("data-start-date") !== "undefined") && ($('#pgCountDown').attr("data-timer-type") == 'evergreen') ) {
			var start_date = $(this).attr("data-start-date");
			start_date = start_date.split('/');
			start_year = start_date[2];
			start_month = start_date[0]-1;
			start_day = start_date[1];
		}
		
        if (typeof $(this).attr("data-end-time") !== "undefined") {
            end_time = $(this).attr("data-end-time");
        }
        if (typeof $(this).attr("data-end-min") !== "undefined") {
            end_min = $(this).attr("data-end-min");
        }
		
		var expire_date = new Date(end_year, end_month, end_day, end_time, end_min, 0);
		
        console.log("expire_date " + expire_date);
        var c_date = new Date();
        var current_date = new Date(
            c_date.getUTCFullYear(),
            c_date.getUTCMonth(),
            c_date.getUTCDate(),
			c_date.getUTCHours(),
			c_date.getUTCMinutes(),
			c_date.getUTCSeconds()
			
        );
		//current_date = new Date(Date.UTC(2022, 5, 14,18, 0, 0));
        console.log("current_date> " + current_date);
		
		if ( (typeof $('#pgCountDown').attr("data-timer-type") !== "undefined") && ($('#pgCountDown').attr("data-timer-type") == 'regular')) {
			if (expire_date > current_date) {
				initializeClock($(this).attr("id"), expire_date);
			} else {
				$('#clockdiv .days').html(0);
				$('#clockdiv .hours').html(0);
				$('#clockdiv .minutes').html(0);
				$('#clockdiv .seconds').html(0);
			}
		}
		
		if ( (typeof $('#pgCountDown').attr("data-timer-type") !== "undefined") && ($('#pgCountDown').attr("data-timer-type") == 'evergreen')) {
			
			var start_date = $(this).attr("data-start-date");
			var timer_days = $(this).attr("data-days");
			start_date = start_date.split('/');
			start_year = start_date[2];
			start_month = start_date[0]-1;
			start_day = start_date[1];
			
			const startDate = new Date(start_year, start_month, start_day, 0, 0, 0);
			const timerStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());
			
			const startDateTime = new Date();
			var d = parseInt(timer_days);
			//startDateTime.setDate(startDateTime.getDate() + d);
			//if(timerStartDate >)
			var expire_date = new Date(startDateTime.getUTCFullYear(), startDateTime.getUTCMonth(), startDateTime.getUTCDate(), end_time, end_min, 0);
			
			console.log('Start Date UTC: ' + timerStartDate);
			console.log('Current Date UTC: ' + current_date);
			console.log('Expire Date UTC: ' + expire_date);
			
			if(timerStartDate > current_date){
				$('#clockdiv .days').html(0);
				$('#clockdiv .hours').html(0);
				$('#clockdiv .minutes').html(0);
				$('#clockdiv .seconds').html(0);
			}else if(timerStartDate < current_date){
				if (expire_date > current_date) {
					initializeClock($(this).attr("id"), expire_date);
				}else{
					timerRestartUTC($(this).attr("data-start-date"),$(this).attr("data-days"));
					
				}
			}
			
		}
		
		
        
    });
    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        if (clock != null) {
            var daysSpan = clock.querySelector(".days");
            var hoursSpan = clock.querySelector(".hours");
            var minutesSpan = clock.querySelector(".minutes");
            var secondsSpan = clock.querySelector(".seconds");
            function updateClock() {
                var t = getTimeRemainingUTC(endtime);
                if (t.total > -1) {
                    // condition added to avoid -1 in hour, min and sec
                    daysSpan.innerHTML = t.days;
                    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
                    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
                    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
                }
                if (t.total <= 0) {
                    clearInterval(timeinterval);
					if ( (typeof $('#pgCountDown').attr("data-timer-type") !== "undefined") && ($('#pgCountDown').attr("data-timer-type") == 'evergreen')) {
					timerRestartUTC($('#pgCountDown').attr("data-start-date"),$('#pgCountDown').attr("data-days"));
					}
                    // timerRestart();
                    //expire action will go here
                }
            }
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }
    }
     
    $(document).ready(function () {
        window.localStorage.clear();
        /* **** Add Products ID in Links **** */
        $('.products-area input[type="checkbox"]').change(function () {
            // var buy_link = "https://prezentar.pay.clickbank.net/?cbitems=PREZ{products}&cbskin=37593&cbtimer=1494&cbfid=50975";
            var buy_link = "https://ecoverly.pay.clickbank.net/?cbitems=ECOVER{products}&cbskin=41881&coupon=ANIMATE";
            var bump_products = "";
            var coupon_products = $('.get_coupon_text').html();
            $('.products-area input[type="checkbox"]').each(function () {
                if ($(this).is(":checked")) {
                    bump_products += "." + $(this).val();
                }
            });
            if (bump_products == "") {
                // buy_link = "https://prezentar.pay.clickbank.net/?cbitems=PREZ&cbskin=37593&cbtimer=1494&cbfid=50975";
                buy_link = "https://ecoverly.pay.clickbank.net/?cbitems=ECOVER&cbskin=41881&coupon=ANIMATE";
            } else {
                buy_link = buy_link.replace("{products}", bump_products);
            }
            // $("a.proceed").attr("href", buy_link+"&coupon="+coupon_products);
            $("a.proceed").attr("href", buy_link);
        });
    });
});