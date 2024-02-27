create table USER
(
    email      varchar(100) primary key,
    password   varchar(200) not null,
    name       varchar(100) not null,
    rules       varchar(100) not null,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    address    varchar(100) not null,
    connection varchar(200)
);

create table location
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    deleted_at  datetime,
    created_by  varchar(100) not null references USER (email),
    name        varchar(100) not null,
    description varchar(220) not null,
    price       int          not null,
    picture     varchar(100) not null,
    address     varchar(100) not null,
    capacity    int          not null,
    type        varchar(100) not null,
    latitude    float        not null,
    longitude   float        not null
);

create table location_occupation
(
    id            int primary key auto_increment,
    from_datetime datetime not null,
    to_datetime   datetime not null,
    location_id   int      not null references location (id)
);

create table service_provider
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    type       varchar(100) not null,
    price      int          not null
);


create table service_provider_occupation
(
    id                  int primary key auto_increment,
    from_datetime       datetime not null,
    to_datetime         datetime not null,
    service_provider_id int      not null references service_provider (id)
);

create table facture
(
    id                    int primary key auto_increment,
    created_at            datetime     not null,
    updated_at            datetime     not null,
    deleted_at            datetime,
    created_by            varchar(100) not null references USER (email),
    price                 int          not null,
    type                  varchar(100) not null,
    notification          boolean,
    notification_interval int
);

create table facture_by_user
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    facture_id int          not null references facture (id),
    user_email varchar(100) not null references USER (email)
);

create table facture_by_location
(
    id          int primary key auto_increment,
    created_at  datetime not null,
    updated_at  datetime not null,
    facture_id  int      not null references facture (id),
    location_id int      not null references location (id)
);

create table facture_by_subscription
(
    id              int primary key auto_increment,
    created_at      datetime not null,
    updated_at      datetime not null,
    facture_id      int      not null references facture (id),
    subscription_id int      not null references subscription (id)
);

create table subscription
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    deleted_at datetime,
    price      int          not null,
    user_email varchar(100) not null references USER (email)
);

create table service
(
    id          int primary key auto_increment,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    deleted_at  datetime,
    created_by  varchar(100) not null references USER (email),
    name        varchar(100) not null,
    description varchar(220) not null,
    price       int          not null,
    duration    int          not null
);

create table service_by_provider
(
    id          int primary key auto_increment,
    created_at  datetime not null,
    updated_at  datetime not null,
    service_id  int      not null references service (id),
    provider_id int      not null references service_provider (id)
);


create table service_by_user
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    service_id int          not null references service (id),
    user_email varchar(100) not null references USER (email)
);

create table service_by_location
(
    id          int primary key auto_increment,
    created_at  datetime not null,
    updated_at  datetime not null,
    service_id  int      not null references service (id),
    location_id int      not null references location (id)
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
    occupy_by   varchar(100) not null references USER (name)
);

create table TICKET_MESSAGE
(
    id         int primary key auto_increment,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime,
    created_by varchar(100) not null references USER (email),
    message    varchar(220) not null
);