package kr.co.thejoenmovie.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import kr.co.thejoenmovie.vo.CinemaVo;
import kr.co.thejoenmovie.vo.MovieVo;
import kr.co.thejoenmovie.vo.TicketVo;
import kr.co.thejoenmovie.vo.TimeVo;

@Repository
public interface MovieDao {
	public List<MovieVo> selectCate1();
	public List<CinemaVo> selectCate2(String title);
	public List<TimeVo> selectCate3(String cinema_name);
	public void insertTicket(TicketVo tv);
}
