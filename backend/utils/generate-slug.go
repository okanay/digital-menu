package utils

import (
	"errors"
	"regexp"
	"strings"
	"unicode"

	"github.com/mozillazg/go-unidecode"
	"github.com/okanay/digital-menu/configs"
	"golang.org/x/text/runes"
	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"
)

func GenerateSlug(input string, randomString bool) (string, error) {
	// Boş girişi kontrol et
	if strings.TrimSpace(input) == "" {
		return "", errors.New("input cannot be empty")
	}

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
	if randomString || len(slug) < 4 {
		randomString := GenerateRandomString(6)
		slug = randomString + slug
	}

	// Slug uzunluğunu kontrol et
	const max = configs.MAX_RESTAURANT_SLUG_LENGTH
	if len(slug) > max {
		slug = slug[:max]
	}

	return slug, nil
}
