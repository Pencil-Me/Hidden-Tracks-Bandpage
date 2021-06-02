CREATE TABLE IF NOT EXISTS `HT_USERS` (
    `id` INT AUTO_INCREMENT
    , `username` VARCHAR(150) NOT NULL
    , `firstname` VARCHAR(150)
    , `lastname` VARCHAR(150)
    , `email` VARCHAR(255)
    , `password` VARCHAR(255) NOT NULL
    , PRIMARY KEY (`id`)
);
