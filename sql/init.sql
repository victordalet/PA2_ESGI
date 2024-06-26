create table USER
(
    email      varchar(100) primary key,
    password   varchar(200) not null,
    name       varchar(100) not null,
    rules      varchar(100) not null,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    address    varchar(100) not null,
    connection varchar(200)
);

create table location
(
    id               int primary key auto_increment,
    created_at       datetime     not null,
    updated_at       datetime     not null,
    deleted_at       datetime,
    created_by       varchar(100) not null references USER (email),
    name             varchar(100) not null,
    description      longtext     not null,
    description_json longtext,
    icons            longtext,
    is_valid         int,
    price            int          not null,
    picture          varchar(100) not null,
    address          varchar(100) not null,
    capacity         int          not null,
    type             varchar(100) not null,
    latitude         float        not null,
    longitude        float        not null,
    is_pay           varchar(100)
);

create table location_occupation
(
    id              int primary key auto_increment,
    from_datetime   datetime     not null,
    to_datetime     datetime     not null,
    location_id     int          not null references location (id),
    user_email      varchar(100) not null references USER (email),
    deleted_at      datetime,
    notation        int,
    `repeat`        varchar(100),
    is_pay          varchar(100),
    description     longtext,
    status          varchar(50),
    state_place     varchar(100),
    nb_new_messages int,
    invotory        longtext
);


create table icon_location
(
    id   int primary key auto_increment,
    name varchar(100) not null
);

create table location_icon_location
(
    id               int primary key auto_increment,
    location_id      int not null references location (id),
    icon_location_id int not null references icon_location (id)
);

create table location_message
(
    id                     int primary key auto_increment,
    created_at             datetime     not null,
    updated_at             datetime     not null,
    deleted_at             datetime,
    location_occupation_id int          not null references location_occupation (id),
    message                varchar(220) not null
);

create table subscription
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    deleted_at datetime,
    price      int          not null,
    user_email varchar(100) not null references USER (email),
    is_pay     varchar(100)
);

create table service
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    deleted_at  datetime,
    created_by  varchar(100) not null references USER (email),
    name        varchar(100) not null,
    description longtext     not null,
    price       int          not null,
    duration    int          not null,
    type        varchar(100),
    siret       varchar(100),
    is_valid    int,
    schedule    longtext,
    city        varchar(100),
    nfc         varchar(100),
    is_vip      int
);


create table service_by_user
(
    id                     int primary key auto_increment,
    created_at             datetime     not null,
    updated_at             datetime     not null,
    service_id             int          not null references service (id),
    user_email             varchar(100) not null references USER (email),
    location_occupation_id int          not null references location_occupation (id),
    notation               int,
    status                 varchar(100),
    from_datetime          datetime,
    to_datetime            datetime
);

create table service_by_location
(
    id          int primary key auto_increment,
    created_at  datetime not null,
    updated_at  datetime not null,
    service_id  int      not null references service (id),
    location_id int      not null references location (id),
    notation    int
);

create table message
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    created_by varchar(100) not null references USER (email),
    to_user    varchar(100) not null references USER (email),
    message    varchar(220) not null
);

create table occupation_request_service
(
    id                     int primary key auto_increment,
    created_at             datetime     not null,
    deleted_at             datetime,
    location_occupation_id int          not null references location_occupation (id),
    service_name           varchar(100) not null,
    user_email             varchar(100) not null references USER (email),
    description            longtext     not null,
    status                 varchar(100) not null,
    city                   varchar(100) not null,
    price                  int,
    from_datetime          datetime,
    to_datetime            datetime,
    service_id             int,
    notation               int,
    uid_payment            varchar(100)
);

create table note_user_to_location
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    note        int          not null,
    user_email  varchar(100) not null references USER (email),
    location_id int          not null references location (id)
);

create table location_by_user_no_client
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    location_id int          not null references location (id),
    user_email  varchar(100) not null references USER (email)
);

create table location_by_user_client
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    location_id int          not null references location (id),
    user_email  varchar(100) not null references USER (email)
);

create table TICKET
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    deleted_at  datetime,
    created_by  varchar(100) not null references USER (email),
    name        varchar(100) not null,
    description varchar(100) not null,
    status      varchar(100) not null,
    occupy_by   varchar(100) references USER (name),
    cat         varchar(100)
);

create table TICKET_MESSAGE
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    created_by varchar(100) not null references USER (email),
    message    varchar(220) not null,
    ticket_id  int references TICKET (id)
);


create table bad_world
(
    id   int primary key auto_increment,
    word varchar(100) not null
);


create table translation
(
    id          int primary key auto_increment,
    language    varchar(100) not null,
    word        varchar(100) not null,
    translation varchar(100) not null
);

create table subscription_utilisation
(
    id                     int primary key auto_increment,
    email                  varchar(100) not null references USER (email),
    last_date_free_service datetime     not null
);

create table job
(
    id   int primary key auto_increment,
    name varchar(100) not null
);

create table price_sub
(
    id     int primary key auto_increment,
    price  int,
    reduce int,
    free   int,
    name   varchar(100)
);



insert into USER (email, password, name, rules, created_at, updated_at, address)
values ("victor.dalet@affluences.com",
        "2af8512a8d99c1e07a2f7968f5cc054cb492bad2523e34f0da4e39e8eda2476ad816f55f6da747e87db83d21bcc55ca6f98415fe44e0bb3d034b3e5ad27e5e66",
        "victor", "ADMIN", NOW(), NOW(), "paris");