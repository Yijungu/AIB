INSERT INTO Template (textbox_number, template_size)
VALUES (3, "1000:200");

INSERT INTO TextBox (template_id, textbox_x, textbox_y, width_sort, height_sort, font_size, line_break, purpose)
VALUES (1, 568, 41, "left", "up", 24, 1, "큰 홍보문구");

INSERT INTO TextBox (template_id, textbox_x, textbox_y, width_sort, height_sort, font_size, purpose)
VALUES (1, 568, 98, "left", "up", 12, 0, "작은 홍보문구");

INSERT INTO TextBox (template_id, textbox_x, textbox_y, width_sort, height_sort, font_size, purpose)
VALUES (1, 568, 140, "left", "up", 7, 0, "시간&장소");