CREATE DATABASE IF NOT EXISTS blog_db;

USE blog_db;


CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL
);


CREATE TABLE BlogPosts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE Comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (post_id) REFERENCES BlogPosts(id)
);