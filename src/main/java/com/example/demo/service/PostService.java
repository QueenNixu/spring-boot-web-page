package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
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
        
        PostModel post = postRepository.save(newPost);
        
        if(images != null) {
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
	
}
