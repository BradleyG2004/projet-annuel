package org.example;


import java.util.List;

public class Task {
    private String name;

    public int getParticipantsRequired() {
        return participantsRequired;
    }

    public void setParticipantsRequired(int participantsRequired) {
        this.participantsRequired = participantsRequired;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private int participantsRequired;
    private List<Resource> resources;


 }
