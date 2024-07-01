package com.example.companion.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class ProjetUpdateRequest {
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date starting;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date ending;

    // Constructeur par défaut
    public ProjetUpdateRequest() {
    }

    // Constructeur avec paramètres
    public ProjetUpdateRequest(String description, Date starting, Date ending) {
        this.description = description;
        this.starting = starting;
        this.ending = ending;
    }

    // Getters et setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStarting() {
        return starting;
    }

    public void setStarting(Date starting) {
        this.starting = starting;
    }

    public Date getEnding() {
        return ending;
    }

    public void setEnding(Date ending) {
        this.ending = ending;
    }
}