package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.fileWatcher.FileWatcher;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		
		FileWatcher fileWatcher = new FileWatcher();
        fileWatcher.watcher();
	}

}
