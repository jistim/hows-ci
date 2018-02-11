package com.jistim.hows.ci.sp.spring.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultResource {

    @RequestMapping("/**")
    public String main(Model model) {
        //
        return "index";
    }
}
