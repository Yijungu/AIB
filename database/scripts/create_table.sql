CREATE TABLE Template (
template_id int not null auto_increment,
textbox_number int not null,
template_size set("1000:200", "600:400", "400:600", "200:1000") not null, 
primary key(template_id)
);

CREATE TABLE TextBox (
template_id int not null,
textbox_x int not null,
textbox_y int not null,
width_sort set("left", "right") not null,
height_sort set("up", "down") not null,
font_size int not null,
line_break int not null,
purpose set("큰 홍보문구", "작은 홍보문구", "상세 설명", "시간&장소")
foreign key (template_id) references Template(template_id) on update CASCADE
);

