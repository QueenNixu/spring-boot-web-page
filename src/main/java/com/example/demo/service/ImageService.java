package com.example.demo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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

	public List<ImageModel> findFirstImagesFromPosts(Long postId1, Long postId2, Long postId3) {
	    List<ImageModel> firstImages = new ArrayList<>();

	    // Obtener las primeras imágenes para cada ID de post en el orden deseado
	    Optional<ImageModel> firstImage1 = imageRepository.findFirstByPostIdOrderById(postId1);
	    firstImages.add(firstImage1.orElse(null));

	    Optional<ImageModel> firstImage2 = imageRepository.findFirstByPostIdOrderById(postId2);
	    firstImages.add(firstImage2.orElse(null));

	    Optional<ImageModel> firstImage3 = imageRepository.findFirstByPostIdOrderById(postId3);
	    firstImages.add(firstImage3.orElse(null));
	    
	    return firstImages;
	}





	
	

}
