package com.jistim.hows.ci.sp.spring.web.util;

import com.jistim.hows.ci.sp.spring.web.sdo.Credential;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class AuthUtil {

    public static boolean auth(Credential credential) {
        //
        String username = credential.getUsername();
        String password = credential.getPassword();

        return username.equals("admin") && password.equals("rjsemfwlak!2");
    }

    public static boolean isLogin(HttpServletRequest request) {
        //
        HttpSession session = request.getSession();
        if (session == null) return false;
        Object isLogin = session.getAttribute("login");
        if (isLogin == null) return false;
        return (boolean) isLogin;
    }

    public static <T> ResponseEntity<T> unauthorizedResponse() {
        //
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}
