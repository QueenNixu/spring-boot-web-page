package com.example.demo.fileWatcher;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;

public class FileWatcher {
	
    public void watcher() {
        try {
            // Obtiene el sistema de archivos y crea el directorio a observar
            WatchService watchService = FileSystems.getDefault().newWatchService();
            Path directory = Path.of("src/main/resources/uploads/images");
            directory.register(watchService, StandardWatchEventKinds.ENTRY_CREATE, StandardWatchEventKinds.ENTRY_MODIFY);
            
            // Loop para vigilar eventos de cambio
            while (true) {
                WatchKey key = watchService.take(); // Espera por eventos
                for (WatchEvent<?> event : key.pollEvents()) {
                    // Maneja el evento
                    if (event.kind() == StandardWatchEventKinds.ENTRY_CREATE || event.kind() == StandardWatchEventKinds.ENTRY_MODIFY) {
                        // Aquí puedes forzar la recarga de imágenes en el directorio de recursos estáticos
                        System.out.println("Se ha creado o modificado el archivo: " + event.context());
                    }
                }
                key.reset(); // Reinicia el WatchKey
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}