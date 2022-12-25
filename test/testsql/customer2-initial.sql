INSERT INTO mock_customer (customer_id, login_id, password, email)
VALUES (1, 'sample_user', 'sample_hashed_password', 'sample_user@example.com'),
(2, 'sample_user2', '$2b$10$CPd4ThPZjUwVtywBvP3O0eQ8ju5EH85Avmj7Cw/kVjul1PWfzoQNi', 'sample_user2@example.com')
;


INSERT INTO mock_menu (menu_id, menu_name, menu_type, price, available, customer_id)
VALUES (1, 'wagyu', 'MAIN', 0, true, 2),
(2, 'brownie', 'DESSERT', 0, true, 2),
(3, 'pork rib', 'MAIN', 0, true, 2)
;