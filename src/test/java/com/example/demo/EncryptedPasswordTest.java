package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class EncryptedPasswordTest {
	
	@Test
	public void encode_test() {
		
		PasswordEncoder pe = new BCryptPasswordEncoder(); 
		System.out.println(pe.encode("1234"));
	}

}
