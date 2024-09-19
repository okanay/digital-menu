package utils

import (
	"regexp"
	"strings"
	"unicode"

	"github.com/mozillazg/go-unidecode"
	"golang.org/x/text/runes"
	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"
)

func GenerateSlug(input string, randomString bool) (string, error) {

	// Küçük harfe çevir
	slug := strings.ToLower(input)

	// Unidecode kullanarak transliteration yap
	slug = unidecode.Unidecode(slug)

	// Unicode normalizasyonu ve diacritics'leri kaldır
	t := transform.Chain(norm.NFD, runes.Remove(runes.In(unicode.Mn)), norm.NFC)
	slug, _, _ = transform.String(t, slug)

	// Alfanümerik olmayan karakterleri tire ile değiştir
	reg := regexp.MustCompile("[^a-z0-9]+")
	slug = reg.ReplaceAllString(slug, "-")

	// Baştaki ve sondaki tireleri kaldır
	slug = strings.Trim(slug, "-")

	// Random string ekle
	if randomString || len(slug) < 3 {
		randomString := GenerateRandomString(6)
		slug = randomString + slug
	}

	return slug, nil
}
