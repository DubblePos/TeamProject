package kr.co.thejoenmovie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.thejoenmovie.dao.MainDao;
import kr.co.thejoenmovie.vo.MovieVo;

@Service
public class MainService {
	@Autowired
	private MainDao dao;
	
	public List<MovieVo> selectMovieInfo(){
		return dao.selectMovieInfo();
	}
	
	public MovieVo MovieInfo(MovieVo vo) {
		return dao.MovieInfo(vo);
	}
	
	public List<MovieVo> selectAllMovies(){
		return dao.selectAllMovies();
	}
}