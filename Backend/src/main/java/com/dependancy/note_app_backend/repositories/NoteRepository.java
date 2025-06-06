package com.dependancy.note_app_backend.repositories;

import com.dependancy.note_app_backend.dtos.NoteTitleDto;
import com.dependancy.note_app_backend.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findByTitleAndUserId(String title, Long userId);

    List<NoteTitleDto> findNotesByUserId(Long userId);
}