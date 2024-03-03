package com.example.demo.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.PostModel;
import com.example.demo.models.UserModel;
import com.example.demo.repository.PostRepository;

import io.jsonwebtoken.io.IOException;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Value("${file.upload-dir}") // Lee la propiedad file.upload-dir del archivo de configuración
    private String uploadDir;
	
	public PostModel save(String title, String text, String hashtags, MultipartFile[] images, UserModel user) {
        PostModel newPost = new PostModel();
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + File.separator + "images" + File.separator + fileName); // Agrega "images" a la ruta
            System.out.println(filePath+"");
            try {
				Files.write(filePath, image.getBytes());
			} catch (java.io.IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            String imageUrl = "/uploads/images/" + fileName; // La URL relativa de la imagen
            System.out.println(imageUrl);
            imageUrls.add(imageUrl);
        }
        newPost.setTitle(title);
        newPost.setText(text);
        newPost.setHashtags(hashtags);
        newPost.setPublishDate(LocalDateTime.now());
        newPost.setUser(user);
        newPost.setImagesUrl(imageUrls);
        return postRepository.save(newPost);
    }
	
	public Set<PostModel> findByUser(UserModel user) {
		return postRepository.findByUser(user);
	}
	
	public Optional<PostModel> findById(Long id) {
		return postRepository.findById(id);
	}

}
