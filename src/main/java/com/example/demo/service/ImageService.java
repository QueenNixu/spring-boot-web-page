package com.example.demo.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ImageModel;
import com.example.demo.models.PostModel;
import com.example.demo.repository.ImageRepository;

@Service
public class ImageService {
	
	@Autowired
    private ImageRepository imageRepository;

	public Set<ImageModel> findByPost(Optional<PostModel> post) {
		
		return imageRepository.findByPost(post);
	}
	
	

}
