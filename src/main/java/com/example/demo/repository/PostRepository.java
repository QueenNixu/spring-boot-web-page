package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.PostModel;
import com.example.demo.models.UserModel;


public interface PostRepository extends JpaRepository<PostModel, Long> {
	
	Set<PostModel> findByUser(UserModel user);

}
