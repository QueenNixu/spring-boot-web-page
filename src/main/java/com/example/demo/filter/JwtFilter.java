package com.example.demo.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.models.UserModel;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtils jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		
		// Get autjentication header and validate
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if(!StringUtils.hasText(header) || (StringUtils.hasText(header) && !header.startsWith("Bearer "))) {
			filterChain.doFilter(request, response);
			return;
		}
		
		// Separates "Bearer " and "the token" and selects the value in the position [1] (the token)
		final String token = header.split(" ")[1].trim();
		
		UserModel userDetail = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);
		
		if(!jwtUtil.validateToken(token, userDetail)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = 
				new UsernamePasswordAuthenticationToken(
						userDetail,
						null,
						(userDetail == null) ? List.of() : userDetail.getAuthorities()
				);
		
		authentication.setDetails(
				new WebAuthenticationDetailsSource().buildDetails(request)
				);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		filterChain.doFilter(request, response);
		
	}
	
}
