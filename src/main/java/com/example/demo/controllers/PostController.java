package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.PostModel;
import com.example.demo.models.UserModel;
import com.example.demo.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@PostMapping("")
	public ResponseEntity<?> createPost(@RequestPart("title") String title,
										@RequestPart("text") String text,
										@RequestPart("hashtags") String hashtags,
										@RequestPart(value = "images", required = false) MultipartFile[] images, 
	                                    @AuthenticationPrincipal UserModel user) {
	    PostModel newPost = postService.save(title, text, hashtags, images, user);
	    return ResponseEntity.ok(newPost);
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getPostsFromUser(@AuthenticationPrincipal UserModel user) {
	    Set<PostModel> postsByUser = postService.findByUser(user);
	    // Invertir la lista de posts
	    List<PostModel> invertedPosts = new ArrayList<>(postsByUser);
	    Collections.reverse(invertedPosts);
	    return ResponseEntity.ok(invertedPosts);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllPosts() {
	    List<PostModel> postsByUsers = postService.findAll();
	    // Invertir la lista de posts
	    List<PostModel> invertedPosts = new ArrayList<>(postsByUsers);
	    Collections.reverse(invertedPosts);
	    return ResponseEntity.ok(invertedPosts);
	}
	
	@GetMapping("{postId}")
	public ResponseEntity<?> getPost(@PathVariable Long postId, @AuthenticationPrincipal UserModel user) {
		Optional<PostModel> postByUser = postService.findById(postId);
		return ResponseEntity.ok(postByUser);
	}
	
	@DeleteMapping("{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }


}
