package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long>{

	Optional<UserModel> findByUsername(String username);
	
	

}
