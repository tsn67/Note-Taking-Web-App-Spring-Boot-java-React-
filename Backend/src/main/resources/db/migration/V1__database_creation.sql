create table user
(
    id       bigint auto_increment
        primary key,
    name     varchar(100) not null,
    password varchar(100) not null
);

create table note
(
    id           bigint auto_increment
        primary key,
    title        varchar(100) not null,
    content      text         not null,
    date_created date         not null,
    user_id      bigint       not null,
    constraint note_user_id_fk
        foreign key (user_id) references user (id)
);

