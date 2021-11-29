package kr.co.thejoenmovie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.thejoenmovie.service.MovieService;
import kr.co.thejoenmovie.vo.CinemaVo;
import kr.co.thejoenmovie.vo.MovieVo;
import kr.co.thejoenmovie.vo.TicketVo;
import kr.co.thejoenmovie.vo.TimeVo;

@Controller
public class MovieController {
	
	@Autowired
	private MovieService service;
	
	
	@ResponseBody
	@GetMapping("/getMovieCate")
	public List<MovieVo> getCate1(){
		List<MovieVo> cate1s = service.selectCate1();
		return cate1s;
	}
	
	@ResponseBody
	@GetMapping("/getCinemaCate")
	public List<CinemaVo> getCate2(String title) {
		List<CinemaVo> cate2s = service.selectCate2(title);
		return cate2s;
	}
	
	@ResponseBody
	@GetMapping("/getTimeCate")
	public List<TimeVo> getCate3(String cinema_name){
		List<TimeVo> cate3s = service.selectCate3(cinema_name);
		return cate3s;
	}
	@ResponseBody
	@PostMapping("/bookTicket")
	public String bookTicket(TicketVo tv) {
//		System.out.println(tv.getMovie_cinema());
//		System.out.println(tv.getMovie_date());
//		System.out.println(tv.getMovie_price());
//		System.out.println(tv.getMovie_seats());
//		System.out.println(tv.getMovie_title());
		service.insertTicket(tv);
		return "result:1";
	}
	
	
	
	
}
