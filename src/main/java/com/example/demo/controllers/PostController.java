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
import com.example.demo.service.UserService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("")
	public ResponseEntity<?> createPost(@RequestPart("title") String title,
										@RequestPart("text") String text,
										@RequestPart("hashtags") String hashtags,
										@RequestPart(value = "images", required = false) MultipartFile[] images, 
	                                    @AuthenticationPrincipal UserModel user) {
		if(images != null) {
			System.out.println(images.toString());
		} else {
			System.out.println("images is null");
		}
		try {
			PostModel newPost = postService.save(title, text, hashtags, images, user);
			return ResponseEntity.ok(newPost);
		} catch (ExpiredJwtException e) {
	        // El token ha expirado
	        return ResponseEntity.ok(false);
	    } catch (JwtException e) {
	        // Error de validación del token
	        return ResponseEntity.ok(false);
	    }
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getPostsFromUser(@AuthenticationPrincipal UserModel user) {
		System.out.print(user.toString());
	    Set<PostModel> postsByUser = postService.findByUser(user);
	    // Invertir la lista de posts
	    List<PostModel> invertedPosts = new ArrayList<>(postsByUser);
	    Collections.reverse(invertedPosts);
	    return ResponseEntity.ok(invertedPosts);
	}
	
	@GetMapping("/user/{username}")
	public ResponseEntity<?> getPostsFromUser(@PathVariable String username, @AuthenticationPrincipal UserModel user) {
		// Obtener el usuario correspondiente al nombre de usuario
	    Optional<UserModel> optionalUser = userService.getReferenceByUsername(username);
	    // Verificar si el usuario existe en la base de datos
	    if (optionalUser.isPresent()) {
	    	UserModel userToFetch = optionalUser.get();
	    	Set<PostModel> postsByUser = postService.findByUser(userToFetch);
	        
	        // Obtener los 3 posts con más likes del usuario
	    	List<PostModel> invertedPosts = new ArrayList<>(postsByUser);
		    Collections.reverse(invertedPosts);
		    return ResponseEntity.ok(invertedPosts);
	    } else {
	        // Manejar el caso en el que el usuario no existe
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@GetMapping("/topPost")
	public ResponseEntity<?> getTopPostsFromUser(@AuthenticationPrincipal UserModel user) {
		//obtener los 3 post con mas likes del user
	    List<PostModel> postsByUser = postService.findTopPostsByUser(user);
	    return ResponseEntity.ok(postsByUser);
	}
	
	@GetMapping("/topPost/{username}")
	public ResponseEntity<?> getTopPostsFromUser(@PathVariable String username) {
	    // Obtener el usuario correspondiente al nombre de usuario
	    Optional<UserModel> optionalUser = userService.getReferenceByUsername(username);
	    
	    // Verificar si el usuario existe en la base de datos
	    if (optionalUser.isPresent()) {
	        UserModel userToFetch = optionalUser.get();
	        
	        // Obtener los 3 posts con más likes del usuario
	        List<PostModel> postsByUser = postService.findTopPostsByUser(userToFetch);
	        return ResponseEntity.ok(postsByUser);
	    } else {
	        // Manejar el caso en el que el usuario no existe
	        return ResponseEntity.notFound().build();
	    }
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
