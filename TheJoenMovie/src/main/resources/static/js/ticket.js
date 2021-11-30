

$(function(){
	
	var select_movie = $('select[name=movie-cate]');
	
	var select_cinema = $('select[name=cinema-cate]');
					
	var select_date = $('select[name=date-cate]');
	
	var select_time = $('select[name=time-cate]');
	
	$.get('/getMovieCate',function(data){
		select_movie.empty();
		select_movie.append("<option value='0'> 영화 선택 </option>");
		$.each(data, function(i,vo){
			
			select_movie.append("<option value='"+vo.title+"'>"+vo.title+"</option>");
			
		});
	});
	select_movie.change(function(){
		var title = $(this).val();
		
		$('.movie-value').text(title);
		$('.cinema-value').text('영화관을 선택해주세요.');
		$('.date-value').text('날짜를 선택해주세요.');
		$('.time-value').text('시간읊 선택해주세요.');
		var jsonData = {"title" : title};
		$.get("/getCinemaCate",jsonData,function(data){
			select_cinema.empty();
			select_date.empty();
			select_time.empty();
			select_cinema.append("<option value='0'> 영화관 선택 </option>");
			select_date.append("<option value='0'> 날짜 선택 </option>");
			select_time.append("<option value='0'> 시간 선택 </option>");
			
			$.each(data, function(i,vo){
				select_cinema.append("<option value='"+vo.cinema_name+"'>"+vo.cinema_name+"</option>");
			});
		});
	});
	var cinema_name = '영화관을 선택해주세요.';
	select_cinema.change(function(){
		cinema_name = $(this).val();
		$('.cinema-value').text(cinema_name);
		$('.date-value').text('날짜를 선택해주세요.');
		$('.time-value').text('시간을 선택해주세요.');
		var jsonData = {"cinema_name" : cinema_name};
		$.get("/getDateCate",jsonData,function(data){
			
			select_date.empty();
			select_time.empty();
			select_date.append("<option value='0'> 날짜 선택 </option>");
			select_time.append("<option value='0'> 시간 선택 </option>");
			
			$.each(data, function(i,vo){
				
				select_date.append("<option value='"+vo.date+"'>"+ vo.date + "</option>");
			});
			
		});
	});
	
	select_date.change(function(){
		var date = $(this).val();
		$('.date-value').text(date);
		$('.time-value').text('시간을 선택해주세요.');
		var jsonData = {
			"date" : date,
			"cinema_name": cinema_name
		};
		$.get("/getTimeCate",jsonData,function(data){
			
			select_time.empty();
			select_time.append("<option value='0'> 시간 선택 </option>");
			
			$.each(data, function(i,vo){
				
				select_time.append("<option value='"+vo.time_start+"'>"+ vo.time_start + "</option>");
			});
			
		});
	});
	
	
	select_time.change(function(){
		/* 시간을 선택할 때마다 초기화해주고 다시 해당 조건들의 데이터를 전송해주어야합니다.*/
		$('input[type=checkbox]').attr('disabled',false);
		$('table tbody tr td').attr('class','bookable');
		
		
		var time = $(this).val();
		$('.time-value').text(time);
		var movie_title = $('.movie-value').text();
		var movie_cinema = $('.cinema-value').text();
		var movie_date = $('.date-value').text();
		var movie_time = $('.time-value').text();
		var jsonData = {
			"title": movie_title,
			"cinema_name": movie_cinema,
			"date": movie_date,
			"time_start": movie_time
		};
		$.ajax({
			url: '/getSeats',
			type: 'post',
			data: jsonData,
			success: function(data){
				
				$.each(data,function(i,vo){
					// 예매가 되었다는 표시로 더이상 선택되지 못하게 할 것임 
					$('input[name="'+vo.seat+'"]').attr('disabled',true);
					// 예매가 되었다는 표시로 빨간색으로 표현할 것임 
					$('input[name="'+vo.seat+'"]').parents("td").attr('class','booked');
					
				});
				
			}
		});
	});
	
	
	
	$('.btn-danger').click(function(){
		
		var isMovieOk = true;
		var isCinemaOk = true;
	    var isDateOk = true;
	    var isTimeOk = true;
	    var isSeatsOk = true;
	    var movie_title = $('.movie-value').text();
		var movie_cinema = $('.cinema-value').text();
		var movie_date = $('.date-value').text();
		var movie_time = $('.time-value').text();
		var movie_seats = $('.seat-value').text();
	    
	    var movie_price = parseInt($('.price-value').text().replace(/(,|원)/g, ''));
		if(movie_title === '영화를 선택해주세요.'){
			isMovieOk = false;
		}
		if(movie_cinema === "영화관을 선택해주세요."){
			isCinemaOk = false;
		}
		if(movie_date === "날짜를 선택해주세요."){
			isDateOk = false;
		}
		if(movie_time === "시간을 선택해주세요."){
			isTimeOk = false;
		}
		if(movie_seats === "좌석을 선택해주세요."){
			isSeatsOk = false;
		}
		//var movie_price = parseInt($('.price-value').text().replace(/(,|원)/g, ''));
		
		if((isCinemaOk && isMovieOk && isDateOk && isTimeOk && isSeatsOk) === false){
			alert('티켓정보를 모두 입력하셔야 예매가 가능합니다.');
			return false;
		}
		
		var chkArray = new Array();
		$('input[type="checkBox"]:checked').each(function(){
			chkArray.push(this.value);
			
		});
		var jsonData = {
				"movie_title": movie_title,
				"movie_cinema": movie_cinema,
				"movie_date": movie_date,
				"movie_time": movie_time,
				"movie_seats": movie_seats,
				"movie_price": movie_price	
		};
		var jsonData2 = {
				"title": movie_title,
				"cinema_name": movie_cinema,
				"date": movie_date,
				"time_start": movie_time,
				"seat": chkArray
		};
		$.ajax({
			url: '/bookSeat',
			type: 'post',
			data: jsonData2,
			success: function(data){}
		});
		$.ajax({
			url: '/bookTicket',
			type: 'post',
			data: jsonData,
			success: function(data){
				
				alert('예매가 완료되었습니다!');
				location.href='/index';
			}
		});
		
	});
});
function getValue(){
	// 선택된 목록 가져오기 
	const query = 'input[type="checkbox"]:checked';
	const selectedEls = document.querySelectorAll(query);
	let result = '';
	let cnt = 0;
	selectedEls.forEach((el)=>{
		result += el.value + ' ';
		cnt += 1;
	});
	if(cnt ==  0){
		document.getElementById('final-seat').innerText = '좌석을 선택해주세요.';
		document.getElementById('final-price').innerText = '0' + '원';
	}else{
		document.getElementById('final-seat').innerText = result;
		document.getElementById('final-price').innerText = cnt * 12000 + '원';
	}
	
}