package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthCredentialsRequest;
import com.example.demo.models.UserModel;
import com.example.demo.utils.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	
	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request){
		
		try {
			
			Authentication authenticate = authenticationManager
				.authenticate(
						new UsernamePasswordAuthenticationToken(
								request.getUsername(), request.getPassword()
									)
							);
			UserModel userModel = (UserModel) authenticate.getPrincipal();
			userModel.setPassword(null);
			
			return ResponseEntity.ok()
					.header(HttpHeaders.AUTHORIZATION, jwtUtils.generateToken(userModel))
					.body(userModel);
			
		} catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
		
	}

}
