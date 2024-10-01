CREATE DATABASE crowdfunding_db;

USE crowdfunding_db;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL                  
);

CREATE TABLE fundraisers (
    fundraiser_id INT AUTO_INCREMENT PRIMARY KEY,  
    organizer VARCHAR(100) NOT NULL,               
    title VARCHAR(255) NOT NULL,                   
    target_funding DECIMAL(10, 2) NOT NULL,        
    current_funding DECIMAL(10, 2) DEFAULT 0,      
    city VARCHAR(100) NOT NULL,                    
    is_active BOOLEAN DEFAULT TRUE,                
    category_id INT,                               
    FOREIGN KEY (category_id) REFERENCES categories(category_id)  
);

INSERT INTO categories (name) VALUES 
('Medical'),
('Education'),
('Social Impact');

INSERT INTO fundraisers (organizer, title, target_funding, current_funding, city, is_active, category_id) VALUES
('Anderson Family', 'Support Medical Treatment for Anderson', 15000, 9200, 'New York', TRUE, 1),
('Grace Thompson', 'Build New School Library', 12000, 8600, 'Los Angeles', TRUE, 2),
('Robert Lee', 'Social Program for Underprivileged Youth', 18000, 4500, 'San Francisco', TRUE, 3),
('Greenfield Community', 'Emergency Hurricane Relief Fund', 25000, 20000, 'Miami', TRUE, 1),
('Sophia White', 'Fund College Education for Underprivileged Students', 10000, 7200, 'Boston', TRUE, 2),
('David Clark', 'Support for Local Environmental Conservation', 13000, 5400, 'Chicago', TRUE, 3),
('Olivia Parker', 'Cancer Treatment for Olivia Parker', 17000, 11200, 'Houston', TRUE, 1),
('Lucas Brown', 'Social Impact Project for Community Development', 20000, 15500, 'Austin', TRUE, 3),
('Emma Williams', 'Help Rebuild After Earthquake', 22000, 17500, 'Seattle', TRUE, 1),
('Liam Johnson', 'Scholarship Fund for Low-income Students', 8000, 5000, 'Denver', TRUE, 2);
