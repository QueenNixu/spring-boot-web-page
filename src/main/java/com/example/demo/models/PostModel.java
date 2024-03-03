package com.example.demo.models;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PostModel {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(optional = false)
	private UserModel user;
	private String title;
	private String text;
	private List<String> imagesUrl;
    private LocalDateTime publishDate;
    private String hashtags;
	
	
	
	
	
}