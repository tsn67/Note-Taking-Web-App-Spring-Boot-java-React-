package com.dependancy.note_app_backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class NoteTitleDto {

    private Long id;
    private String title;

    @JsonProperty("date-created")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCreated;
}
