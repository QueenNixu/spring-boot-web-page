package com.example.demo.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.ImageModel;
import com.example.demo.models.PostModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
	
	Set<ImageModel> findByPost(Optional<PostModel> post);
	
	void deleteAllByPostId(Long id);

}
