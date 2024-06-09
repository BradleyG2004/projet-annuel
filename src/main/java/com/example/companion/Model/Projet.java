package com.example.companion.Model;

import java.util.Date;

public class Projet {
    private int id;
    private String description;
    private Date starting;
    private Date ending;
    private Admin user;

    // Constructeurs, getters et setters
    public Projet() {
    }

    public Projet(String description, Date starting, Date ending) {
        this.description = description;
        this.starting = starting;
        this.ending = ending;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public Admin getUser() {
        return user;
    }

    public void setUser(Admin user) {
        this.user = user;
    }
}
