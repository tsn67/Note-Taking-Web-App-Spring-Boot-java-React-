package com.dependancy.note_app_backend.controllers;

import com.dependancy.note_app_backend.dtos.NoteTitleDto;
import com.dependancy.note_app_backend.dtos.NoteUploadDto;
import com.dependancy.note_app_backend.entities.Note;
import com.dependancy.note_app_backend.repositories.NoteRepository;
import com.dependancy.note_app_backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/notes")
@RestController
@AllArgsConstructor
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @PostMapping("/add-note/{id}") //id of the user
    public ResponseEntity<?> addNote(@RequestBody NoteUploadDto noteUploadDto, @PathVariable Long id) {
        var existingNote = noteRepository.findByTitleAndUserId(noteUploadDto.getTitle(), id).orElse(null);
        Map<String, Object> response = new HashMap<>();
        if (existingNote != null) {
            response.put("error", "Note already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        var newNote = new Note();
        var user = userRepository.findById(id).orElse(null); //null is not an issue, only valid id is expected
        newNote.setTitle(noteUploadDto.getTitle());
        newNote.setContent(noteUploadDto.getContent());
        newNote.setUser(user);
        newNote.setDateCreated(java.time.LocalDate.now());
        noteRepository.save(newNote);
        response.put("id", newNote.getId());
        response.put("title", newNote.getTitle());
        response.put("date-created", newNote.getDateCreated().format(java.time.format.DateTimeFormatter.ISO_DATE));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-titles/{id}") //id of user assume to be valid
    public ResponseEntity<List<NoteTitleDto>> getTitles(@PathVariable Long id) {
        var notes = noteRepository.findNotesByUserId(id);
        return ResponseEntity.ok(notes);
    }

    @PutMapping("/update-note/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id, @RequestBody NoteUploadDto noteUploadDto) {
        var existingNote = noteRepository.findById(id).orElse(null);
        existingNote.setTitle(noteUploadDto.getTitle());
        existingNote.setContent(noteUploadDto.getContent());
        noteRepository.save(existingNote);
        Map<String, Object> response = new HashMap<>();
        response.put("id", existingNote.getId());
        response.put("title", existingNote.getTitle());
        response.put("date-created", existingNote.getDateCreated().format(java.time.format.DateTimeFormatter.ISO_DATE));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-note/{id}")
    public ResponseEntity<?> getNote(@PathVariable Long id) {
        var note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            return ResponseEntity.notFound().build(); //404 not-found
        }
        Map<String, Object> response = new HashMap<>();
        response.put("id", note.getId());
        response.put("title", note.getTitle());
        response.put("content", note.getContent());
        return ResponseEntity.ok(response);
    }

}
