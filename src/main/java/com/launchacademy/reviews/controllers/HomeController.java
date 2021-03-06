package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/concert-venues/new", "/concert-venues", "/concert-venues/{id}", "/admin/concert-venues", "/admin/{id}"})
  public String forward() {
    return "forward:/";
  }
}
