package com.example.demo.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.ImageModel;
import com.example.demo.models.PostModel;
import com.example.demo.models.UserModel;
import com.example.demo.service.ImageService;
import com.example.demo.service.PostService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	
	@Autowired
	private ImageService imageService;
	
	@Autowired
	private PostService postService;
	
	//no postmapping
	
	@GetMapping("{postId}")
	public ResponseEntity<?> getImages(@PathVariable Long postId, @AuthenticationPrincipal UserModel user) {
		
		Optional<PostModel> post = postService.findById(postId);
		
	    Set<ImageModel> imagesFromPost = imageService.findByPost(post);
	    return ResponseEntity.ok(imagesFromPost);
	}
	
	@GetMapping("/firstImageFromTopPosts")
	public ResponseEntity<?> getFirstImageFromPosts(
	    @RequestParam Long postId1,
	    @RequestParam Long postId2,
	    @RequestParam Long postId3) {
	    List<ImageModel> firstImages = imageService.findFirstImagesFromPosts(postId1, postId2, postId3);
	    
	    return ResponseEntity.ok(firstImages);
	}




}
