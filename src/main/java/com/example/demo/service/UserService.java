package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserModel;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public Optional<UserModel> getReferenceById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<UserModel> getReferenceByUsername(String username) {
		return userRepository.findByUsername(username);
	}

}
