package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthCredentialsRequest;
import com.example.demo.models.UserModel;
import com.example.demo.utils.JwtUtils;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

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
	
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal UserModel user) {
		
		try {
	        // Validar si el token es válido y si corresponde al usuario autenticado
	        Boolean isValidToken = jwtUtils.validateToken(token, user);
	        return ResponseEntity.ok(isValidToken);
	    } catch (ExpiredJwtException e) {
	        // El token ha expirado
	        return ResponseEntity.ok(false);
	    } catch (JwtException e) {
	        // Error de validación del token
	        return ResponseEntity.ok(false);
	    }	
		
	}
	

}
