package com.jistim.hows.ci.sp.spring.web;

import com.jistim.hows.ci.sp.spring.web.sdo.FileInfo;
import com.jistim.hows.ci.sp.spring.web.util.AuthUtil;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/files")
public class FileApiResource {

    private static final String BASE_DIR_PATH = "/home/hows/hows-repo";

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<FileInfo>> findFiles() {
        //
        if (!AuthUtil.isLogin(request)) {
            return AuthUtil.unauthorizedResponse();
        }

        List<FileInfo> fileInfos = new ArrayList<>();
        File baseDir = new File(BASE_DIR_PATH);
        for (File childFile : baseDir.listFiles()) {
            if (childFile.isDirectory()) continue;
            String fileName = childFile.getName();
            long fileSize = childFile.length();
            fileInfos.add(new FileInfo(fileName, fileSize));
        }
        return ResponseEntity.ok(fileInfos);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeFile(@RequestParam("fileName") String fileName) {
        //
        if (!AuthUtil.isLogin(request)) {
            return AuthUtil.unauthorizedResponse();
        }

        File baseDir = new File(BASE_DIR_PATH);
        File targetFile = null;
        for (File childFile : baseDir.listFiles()) {
            if (childFile.isDirectory()) continue;
            if (childFile.getName().equals(fileName)) {
                targetFile = childFile;
            }
        }
        if (targetFile == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        targetFile.delete();
        return ResponseEntity.ok(null);
    }

    @CrossOrigin(origins = "http://ci.jistim.com")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        //
//        if (!AuthUtil.isLogin(request)) {
//            return AuthUtil.unauthorizedResponse();
//        } // FIXME: CrossOrigin Issue

        String fileName = multipartFile.getOriginalFilename();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        fileName = fileName.replace(".jar", "_" + sdf.format(new Date()) + ".jar");
        InputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            fileInputStream = multipartFile.getInputStream();
            fileOutputStream = new FileOutputStream(new File(BASE_DIR_PATH, fileName));
            IOUtils.copy(fileInputStream, fileOutputStream);
            return ResponseEntity.ok(null);
        } catch (IOException e) {
            System.out.println("file upload fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } finally {
            IOUtils.closeQuietly(fileInputStream);
            IOUtils.closeQuietly(fileOutputStream);
        }

    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> deployFile(@RequestParam("fileName") String fileName) {
        //
        if (!AuthUtil.isLogin(request)) {
            return AuthUtil.unauthorizedResponse();
        }

        File baseDir = new File(BASE_DIR_PATH);
        File targetFile = null;
        for (File childFile : baseDir.listFiles()) {
            if (childFile.isDirectory()) continue;
            if (childFile.getName().equals(fileName)) {
                targetFile = childFile;
            }
        }
        if (targetFile == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

        String command = "sh /home/hows/hows-run-module/run.sh " + fileName.replace(".jar", "");
        try {
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();
            return ResponseEntity.ok(null);
        } catch (IOException | InterruptedException e) {
            System.out.println("shell execute error");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

}
