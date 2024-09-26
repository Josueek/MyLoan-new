<?php
require_once ('../helpers/validator.php');
require_once ('../models/handler/usuario_handler.php');

class UsuarioData extends UsuarioHandler
{
    private $data_error = null;

    public function setCorreo($value)
    {
        if (Validator::validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            $this->data_error = 'Correo electrónico inválido';
            return false;
        }
    }

    public function setContrasena($value)
    {
        if (Validator::validatePassword($value)) {
            $this->contrasena = $value;
            return true;
        } else {
            $this->data_error = 'Contraseña inválida';
            return false;
        }
    }

    public function checkCredentials()
    {
        $sql = 'SELECT id_usuario, correo_electronico, contraseña, fecha_registro, fecha_ultimo_cambio_clave
                FROM tb_usuarios
                WHERE correo_electronico = ?';
        $params = array($this->correo);
        $data = Database::getRow($sql, $params);
    
        // Verifica si se obtuvo un resultado
        if ($data) {
            // Verifica si la contraseña es correcta
            if (password_verify($this->contrasena, $data['contraseña'])) {
                // Usa la fecha de último cambio si está disponible, de lo contrario, usa la fecha de registro
                $lastPasswordChange = $data['fecha_ultimo_cambio_clave'] ?? $data['fecha_registro'];
                $currentTimestamp = time(); // Hora actual en formato timestamp
                $lastPasswordChangeTimestamp = strtotime($lastPasswordChange); // Hora del último cambio en formato timestamp
                $daysSinceLastChange = ($currentTimestamp - $lastPasswordChangeTimestamp) / (60 * 60 * 24); // Diferencia en días
    
                if ($daysSinceLastChange > 90) {
                    // Si han pasado más de 90 días desde el último cambio, informa que la contraseña debe ser cambiada
                    return array('status' => false, 'message' => 'La contraseña ha expirado. Debe cambiar su contraseña.');
                } else {
                    // Si la contraseña es válida y no ha expirado, devuelve los datos del usuario
                    return array(
                        'status' => true,
                        'id_usuario' => $data['id_usuario'],
                        'correo_electronico' => $data['correo_electronico'],
                    );
                }
            } else {
                // La contraseña es incorrecta
                return array('status' => false, 'message' => 'Correo o contraseña incorrectos.');
            }
        } else {
            // No se encontró al usuario
            return array('status' => false, 'message' => 'Correo o contraseña incorrectos.');
        }
    }

    public function setCargo($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cargo = $value;
            return true;
        } else {
            $this->data_error = 'Cargo inválido';
            return false;
        }
    }

    public function setInstitucion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->institucion = $value;
            return true;
        } else {
            $this->data_error = 'Institución inválida';
            return false;
        }
    }

    public function getLastId()
    {
        $sql = 'SELECT MAX(id_usuario) AS id_usuario FROM tb_usuarios';
        $params = null;
        $data = Database::getRow($sql, $params);
        return $data['id_usuario'];
    }

    public function getDataError()
    {
        return $this->data_error;
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(correo_electronico, contraseña, id_cargo, id_institucion)
                VALUES(?, ?, ?, ?)';
        $params = array($this->correo, password_hash($this->contrasena, PASSWORD_DEFAULT), $this->cargo, $this->institucion);
        return Database::executeRow($sql, $params);
    }


    public function updateProfile()
    {
        // Actualiza solo el correo electrónico
        $sql = 'UPDATE tb_usuarios SET correo_electronico = ? WHERE id_usuario = ?';
        $params = array($this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function updatePassword()
    {
        // Actualiza solo la contraseña
        $sql = 'UPDATE tb_usuarios SET contraseña = ? WHERE id_usuario = ?';
        $params = array($this->contrasena, $this->id);
        return Database::executeRow($sql, $params);
    }
}
?>