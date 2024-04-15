package org.example;

import java.util.Date;
import java.util.List;

public class Event {
    private String name;
    private Date startDate;

    public Date getStartDate() {
        return startDate;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    private Date endDate;
    private List<Task> tasks;

    public Date getEndDate() {
        return endDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }






}
