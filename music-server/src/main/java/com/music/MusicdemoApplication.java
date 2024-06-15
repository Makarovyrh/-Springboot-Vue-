package com.music;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.music.dao")
public class MusicdemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusicdemoApplication.class, args);
    }

}
