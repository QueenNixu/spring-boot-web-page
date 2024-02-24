package com.example.demo.models;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@SuppressWarnings("serial")
@Entity
@Data
public class Authority implements GrantedAuthority {
	
	public Authority() {}

	public Authority(String authority) {
		this.authority=authority;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String authority;
	private Long user_id;

}
