package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.ImageModel;
import com.example.demo.models.PostModel;
import com.example.demo.models.UserModel;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
    private ImageRepository imageRepository;
	
	/*
	@Value("${file.upload-dir}") // Lee la propiedad file.upload-dir del archivo de configuración
    private String uploadDir;
	*/
	public PostModel save(String title, String text, String hashtags, MultipartFile[] images, UserModel user) {
        PostModel newPost = new PostModel();
        newPost.setTitle(title);
        newPost.setText(text);
        newPost.setHashtags(hashtags);
        newPost.setPublishDate(LocalDateTime.now());
        newPost.setUser(user);
        newPost.setLikes(0L);
        
        PostModel post = postRepository.save(newPost);
        
        if(images != null) {
        	System.out.print("HAY IMAGENES!");
        	for (MultipartFile image : images) {
                ImageModel imageModel = new ImageModel();
                try {
    				imageModel.setDatos(image.getBytes());
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
                imageModel.setPost(newPost);
                imageRepository.save(imageModel);
            }
        }
        
        return post;
    }
	
	public Set<PostModel> findByUser(UserModel user) {
		return postRepository.findByUser(user);
	}
	
	public Optional<PostModel> findById(Long id) {
		return postRepository.findById(id);
	}
	
	public List<PostModel> findAll() {
		return postRepository.findAll();
	}

	@Transactional
	public void deletePost(Long id) {
		imageRepository.deleteAllByPostId(id);
		postRepository.deleteById(id);
	}

	// Obtener los 3 top posts
	public List<PostModel> findTopPostsByUser(UserModel user) {
	    Set<PostModel> allPosts = postRepository.findByUser(user);
	    List<PostModel> topPosts = new ArrayList<>();

	    // Encontrar los top 3 posts con más likes
	    PostModel maxLikes1 = null;
	    PostModel maxLikes2 = null;
	    PostModel maxLikes3 = null;

	    for (PostModel post : allPosts) {
	        if (maxLikes1 == null || post.getLikes() > maxLikes1.getLikes()) {
	            maxLikes3 = maxLikes2;
	            maxLikes2 = maxLikes1;
	            maxLikes1 = post;
	        } else if (maxLikes2 == null || post.getLikes() > maxLikes2.getLikes()) {
	            maxLikes3 = maxLikes2;
	            maxLikes2 = post;
	        } else if (maxLikes3 == null || post.getLikes() > maxLikes3.getLikes()) {
	            maxLikes3 = post;
	        }
	    }

	    // Agregar los top 3 posts al array en orden de mayor a menor likes
	    if (maxLikes1 != null) {
	        topPosts.add(0, maxLikes1);
	    }
	    if (maxLikes2 != null) {
	        topPosts.add(1, maxLikes2);
	    }
	    if (maxLikes3 != null) {
	        topPosts.add(2, maxLikes3);
	    }

	    return topPosts;
	}


	
}
