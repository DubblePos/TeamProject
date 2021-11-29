package kr.co.thejoenmovie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.thejoenmovie.service.MainService;
import kr.co.thejoenmovie.vo.MovieVo;

@Controller
public class MainController {

	@Autowired
	private MainService service;
	
	@GetMapping(value = {"/", "/index"})
	public String index(Model model) {
		
		List<MovieVo> movieinfo = service.selectMovieInfo();
		
		model.addAttribute("movieinfo", movieinfo);
		
		return "/index";
	}
	
	@GetMapping("/view_event")
	public String event(){
		return "/view_event";
	}
	
	@GetMapping("/view_movie")
	public String view(Model model, MovieVo vo){
		
		MovieVo movie =  service.MovieInfo(vo);
		
		
		model.addAttribute("movie", movie);
		
		return "/view_movie";
	}
	
	@GetMapping("/view_total_movie")
	public String total_movie(Model model){
		List<MovieVo> allmovie = service.selectAllMovies();
		model.addAttribute("allmovie", allmovie);
		return "/view_total_movie";
	}
	
	@GetMapping("/book_ticket")
	public String book_ticket(){
		return "/book_ticket";
	}
}