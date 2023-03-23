CREATE TABLE Design (
design_id int not null auto_increment,
text_number int not null,
height int not null,
width int not null,
primary key(design_id)
);

CREATE TABLE Text (
design_id int not null,
letter_nuber int not null,
usage varchar(5) not null,
left_location float not null,
up_location float not null,
width float not null,
letter_color set('black', 'white', 'light', 'thick', 'complementary') not null, 
letter_size int not null,
highlight_size int, 
highlight_color set('black', 'white', 'light', 'thick', 'complementary'),
highlight_font varchar(8),  
foreign key (design_id) references Design(design_id) on update CASCADE
);

