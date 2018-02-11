package com.jistim.hows.ci.sp.spring.web;

import com.jistim.hows.ci.sp.spring.web.sdo.Credential;
import com.jistim.hows.ci.sp.spring.web.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("credential")
public class CredentialApiResource {

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.POST)
    public boolean login(@RequestBody Credential credential) {
        //
        if (!AuthUtil.auth(credential)) {
            return false;
        }
        HttpSession session = request.getSession(true);
        session.setAttribute("login", true);
        return true;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void logout() {
        //
        HttpSession session = request.getSession();
        session.invalidate();
    }

    @RequestMapping(method = RequestMethod.GET)
    public boolean isLogin() {
        //
        return AuthUtil.isLogin(request);
    }
}
