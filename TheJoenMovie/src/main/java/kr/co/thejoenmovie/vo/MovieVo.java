package kr.co.thejoenmovie.vo;

import lombok.Data;

@Data
public class MovieVo {
	public int movie_num;
	public String title;
	public float score;
	public String genre;
	public String grade;
	public String director;
	public String actor;
	public String rtime;
	public String rdate;
	public String poster;
	public String cinema_name;
	

	// 추가필드
	public String story;
	public String cinema_code;
	public String review_title;
	public String review_id;
	public String review_date;
	public String review_text;
}
