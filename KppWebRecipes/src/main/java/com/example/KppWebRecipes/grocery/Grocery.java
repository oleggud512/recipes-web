package com.example.KppWebRecipes.grocery;

import jakarta.persistence.*;

@Entity
@Table
public class Grocery {

    @Id
    // TODO: ЗАЧЕМ МНЕ ВООБЩЕ ЭТО НУЖНО?
    @SequenceGenerator(
            name = "grocery_sequence",
            sequenceName = "grocery_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "grocery_sequence"
    )
    private Long id;
    private String name;
    private String photoUrl;

    // @Transient - тогда этого не будет в бд
    // private Something something

    public Grocery() {
    }

    public Grocery(Long id, String name, String photoUrl) {
        this.id = id;
        this.name = name;
        this.photoUrl = photoUrl;
    }

    public Grocery(String name, String photoUrl) {
        this.name = name;
        this.photoUrl = photoUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Override
    public String toString() {
        return "Grocery{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                '}';
    }
}
