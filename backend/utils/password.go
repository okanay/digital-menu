package utils

import "golang.org/x/crypto/bcrypt"

// EncryptPassword şifreyi geri döndürülemeyecek şekilde şifreler.
func EncryptPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPassword password ve hash karşılaştırır.
func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
