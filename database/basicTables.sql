--- ************************************************************


CREATE TABLE heroku_08ccb0c84959343.users (
	idUser INT auto_increment NOT NULL,
	username varchar(100) NULL,
	password varchar(100) NULL,
	rol varchar(100) NULL,
	nombre varchar(100) NULL,
	apellido_paterno varchar(100) NULL,
	apellido_materno varchar(100) null,
	primary key (idUser)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************

CREATE TABLE heroku_08ccb0c84959343.admin (
	idAdmin BIGINT auto_increment NOT NULL,
	idUser  BIGINT NOT NULL,
	PRIMARY KEY(idAdmin),
	FOREIGN KEY (idUser) REFERENCES users(idUser)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************
CREATE TABLE heroku_08ccb0c84959343.copropietario (
	idCopropietario BIGINT auto_increment NOT NULL,
	idUser BIGINT NOT NULL,
	idDomicilio BIGINT NOT NULL,
	PRIMARY KEY(idCopropietario),
	FOREIGN KEY (idUser) REFERENCES users(idUser),
	FOREIGN KEY (idDomicilio) REFERENCES domicilio(idDomicilio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************
CREATE TABLE heroku_08ccb0c84959343.condominio (
	idCondominio BIGINT auto_increment NOT NULL,
	nombre varchar(100) NULL,
	descripcion varchar(100) null,
	primary key (idCondominio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************
CREATE TABLE heroku_08ccb0c84959343.edificio (
	idEdificio BIGINT auto_increment NOT NULL,
	idCondominio BIGINT NOT NULL,
	nombre varchar(100) NULL,
	descripcion varchar(100) NULL,
	PRIMARY KEY(idEdificio),
	FOREIGN KEY (idCondominio) REFERENCES condominio(idCondominio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************


CREATE TABLE heroku_08ccb0c84959343.domicilio (
	idDomicilio BIGINT auto_increment NOT NULL,
	idEdificio BIGINT NOT NULL,
	nombre varchar(100)  NULL,
	descripcion varchar(100) NULL,
	PRIMARY KEY(idDomicilio),
	FOREIGN KEY (idEdificio) REFERENCES edificio(idEdificio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************
CREATE TABLE heroku_08ccb0c84959343.copropietario (
	idCopropietario BIGINT auto_increment NOT NULL,
	idUser BIGINT NOT NULL,
	idDomicilio BIGINT NOT NULL,
	PRIMARY KEY(idCopropietario),
	FOREIGN KEY (idUser) REFERENCES user(idUser),
	FOREIGN KEY (idDomicilio) REFERENCES domicilio(idDomicilio)
	
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


--- ************************************************************

CREATE TABLE heroku_08ccb0c84959343.areasComunes (
	idAreaComun BIGINT auto_increment NOT NULL,
	idCondominio BIGINT NOT NULL,
	nombre varchar(100) NULL,
	descripcion varchar(100) NULL,
	costo INT  NULL,
	PRIMARY KEY(idAreasComunes),
	FOREIGN KEY (idCondominio) REFERENCES condominio(idCondominio)
	
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--- ************************************************************
CREATE TABLE heroku_08ccb0c84959343.reservaAreasComunes (
	idreservaAreaComun BIGINT auto_increment NOT NULL,
	idCondominio BIGINT NOT NULL,
	idAreaComun  BIGINT NOT NULL,
	nombre varchar(100) NULL,
	descripcion varchar(100) NULL,
	costo INT  NULL,
	PRIMARY KEY(idreservaAreaComun),
	FOREIGN KEY (idCondominio) REFERENCES condominio(idCondominio)
	FOREIGN KEY (idAreaComun) REFERENCES areasComunes(idAreaComun)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



--- ************************************************************

CREATE TABLE administraciondeudascondominio (
	idDeudaCondominio BIGINT auto_increment NOT NULL,
	idUser  BIGINT NOT NULL,
	descripcion varchar(100) NULL,
	monton float NULL,
	fecha date NULL,
	estado varchar(100) NULL,
	tipo varchar(100) NULL,
	PRIMARY KEY(idDeudaCondominio),
	FOREIGN KEY (idUser) REFERENCES users(idUser)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



--- Inserts User

INSERT INTO users (username,password,rol,nombre,apellido_paterno,apellido_materno)
	VALUES ('mauriciob','12345','administrador','mauricio','balderrama','ali');

INSERT INTO heroku_08ccb0c84959343.users (username,password,rol,nombre,apellido_paterno,apellido_materno)
	VALUES ('enriqueV','12345','copropietario','Enrique','Vacaflores','');

INSERT INTO heroku_08ccb0c84959343.users (username,password,rol,nombre,apellido_paterno,apellido_materno)
	VALUES ('terezaA','12345','copropietario','tereza','almanza','');

    INSERT INTO heroku_08ccb0c84959343.users (username,password,rol,nombre,apellido_paterno,apellido_materno)
	VALUES ('noraR','12345','copropietario','nora','rios','');




	