package com.music.dao;

import com.music.domain.Consumer;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 前端用户Dao
 */
@Repository
public interface ConsumerMapper {
    /**
     *增加
     */
    public int insert(Consumer consumer);

    /**
     *修改
     */
    public int update(Consumer consumer);

    /**
     * 删除
     */
    public int delete(Integer id);

    /**
     * 根据主键查询整个对象
     */
    public Consumer selectByPrimaryKey(Integer id);

    /**
     * 查询所有用户
     */
    public List<Consumer> allConsumer();

    /**
     * 验证密码
     */
    public int verifyPassword(@Param("username")String username, @Param("password")String password);

    /**
     * 根据账号查询
     * @return
     */
    public Consumer getByUsername(String username);
}
















